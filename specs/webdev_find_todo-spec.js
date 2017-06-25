/**
 * 
 */
"use strict";

describe("Find freelansers Suite: ", function() {

  beforeAll(function() {
    console.log("Suite execution started.");

    var useMainPage = false;

    if (useMainPage) {
      browser.get('https://www.upwork.com/');

      var findDropdown = element(by.xpath("(//*[@class='button'])[1]"));
      findDropdown.click();

      var freelancersOptionToFind = element(by.xpath("(//*[text()='Freelancers'])[1]"));
      freelancersOptionToFind.click();

      var findFreelancers = element(by.id('q'));
      findFreelancers.click();
      findFreelancers.sendKeys(browser.params.search.speciality);
      findFreelancers.submit();
    }

    if (!useMainPage) {
      browser.get('https://www.upwork.com/o/profiles/browse/?q=web%20developers');
    }

    element(by.buttonText('Advanced filters')).click();

    var locationSearch = element(by.id('location-search'));
    locationSearch.click();
    locationSearch.sendKeys(browser.params.search.freelancersFrom);

    var searchLocationResult = element(by.xpath("(//*[@data-ng-bind-html='item.title | highlighter:query'])[1]"));
    searchLocationResult.click();

    var updateFilters = element(by.buttonText('Update Filters'));
    updateFilters.click();
  });

  it("Find Freelansers from - " + browser.params.search.freelancersFrom + " - only", function() {
    element.all(by.xpath("//*[@data-ng-attr-title='{{ fullLocationLabel }}']")).each(function(element, index) {
      element.getText().then(function(text) {
        expect(browser.params.search.freelancersFrom).toEqual(text);
      })
    });
  })
});