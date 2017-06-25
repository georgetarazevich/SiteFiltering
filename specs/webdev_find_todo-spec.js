/**
 * 
 */
"use strict";

describe("Find freelansers Suite: ", function() {

  beforeAll(function() {
    console.log("Suite execution started.");

    var useMainPage = false;

    if (useMainPage) {
      var mainPage = new MainPage();
      mainPage.get();
      mainPage.selectFindDropdown();
      mainPage.selectFreelancersOptionToFind();
      mainPage.findFreelancers(browser.params.search.speciality);
    }
    
    var searchFreelancersPage = new SearchFreelancersPage();
    if (!useMainPage) {
      searchFreelancersPage.getPage();
    }

    searchFreelancersPage.openAdvancedFilters();
    searchFreelancersPage.selectLocation(browser.params.search.freelancersFrom)
    searchFreelancersPage.selectSearchLocationResult();
    searchFreelancersPage.updateFilters();
  });

  it("Find Freelansers from - " + browser.params.search.freelancersFrom + " - only", function() {
    element.all(by.xpath("//*[@data-ng-attr-title='{{ fullLocationLabel }}']")).each(function(element, index) {
      element.getText().then(function(text) {
        expect(browser.params.search.freelancersFrom).toEqual(text);
      })
    });
  })
});

var MainPage = function() {

  var findDropdown = element(by.xpath("(//*[@class='button'])[1]"));
  var freelancersOptionToFind = element(by.xpath("(//*[text()='" + browser.params.search.freelancers + "'])[1]"));
  var findFreelancers = element(by.id('q'));

  this.get = function() {
    browser.get(browser.baseUrl);
  };

  this.selectFindDropdown = function(name) {
    findDropdown.click();
  };

  this.selectFreelancersOptionToFind = function(name) {
    freelancersOptionToFind.click()
  };

  this.findFreelancers = function(speciality) {
    findFreelancers.click();
    findFreelancers.sendKeys(speciality);
    findFreelancers.submit();
  };
};
var SearchFreelancersPage = function() {

  var locationSearch = element(by.id('location-search'));
  var searchLocationResult = element(by.xpath("(//*[@data-ng-bind-html='item.title | highlighter:query'])[1]"));
  var updateFilters = element(by.buttonText('Update Filters'));

  this.getPage = function() {
    browser.get('https://www.upwork.com/o/profiles/browse/?q=web%20developers');
  };

  this.openAdvancedFilters = function() {
    element(by.buttonText('Advanced filters')).click();
  };

  this.selectSearchLocationResult = function() {
    searchLocationResult.click();
  };

  this.updateFilters = function() {
    updateFilters.click();
  };

  this.selectLocation = function(location) {
    locationSearch.click();
    locationSearch.sendKeys(location);
  };

  this.findFreelancers = function(speciality) {
    findFreelancers.click();
    findFreelancers.sendKeys(speciality);
    findFreelancers.submit();
  };
};