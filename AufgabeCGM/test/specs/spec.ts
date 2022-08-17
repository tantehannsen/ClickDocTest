const baseUrlValue = 'https://demo.clickdoc.de/cd-de/'
const acceptCookiesButton = '.btn-primary'
const searchButton = '.search-button'
const searchTermInputField = '#search-query-typeahead'
const cardContainer = '.card'
const searchButtonSearchPage = '//*[@id="search"]/div/div[2]/div/div[1]/app-filter/div/div/div/div[7]/div/button'
const card1 = '//*[@id="search"]/div/div[3]/div/div/app-contact-card[1]/div/app-contact-header/div/div/div[2]/h2/a'
const card2 = '//*[@id="search"]/div/div[3]/div/div/app-contact-card[2]/div/app-contact-header/div/div/div[2]/h2/a'
const errorTimeOutMsg = 'expected search result was not there: Dr. Peter Test in first result card'

describe("activate the quest and search for a doctor ", function () {

    beforeAll(async () => {
        // navigate to the url of the application and accept the cookies
        await browser.url(baseUrlValue)
        await $(acceptCookiesButton).click()
    });

    it("should provide two specific results", async function () {
        // click on the "doctor search" button
        await $(searchButton).click()

        // insert the searchterm in the "searchtearm" inputfield
        await $(searchTermInputField).click()
        await $(searchTermInputField).clearValue()
        await $(searchTermInputField).setValue('Peter Test')

        // close the suggestion list to be able to reach the search-button
        await browser.keys('Escape')

        // click on the "search" button
        await $(searchButtonSearchPage).click()
        await browser.waitUntil(
            async () => (await $(card1).getText()) === 'Dr. Peter Test',
            {
                timeout: 10000,
                timeoutMsg: errorTimeOutMsg
            }
        );

        // check the amount of results
        const resultQueryCards = await $$(cardContainer).length
        expect(resultQueryCards).toEqual(2)

        // check the two results to be Dr. Peter Test and Dr. Peter Test ABD
        await expect($(card1)).toHaveText('Dr. Peter Test')
        await expect($(card2)).toHaveText('Dr. Peter Test ABD')
    });

    afterAll(async () => {
        // close the browser window
        await browser.closeWindow()
    });

});