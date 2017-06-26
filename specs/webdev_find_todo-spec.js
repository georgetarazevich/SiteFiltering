/**
 * Represent "Find freelancers suite" with choice of specialty and location
 */
"use strict";
var useMainPage = true;

describe("Find freelansers suite: ", function() {

  beforeAll(function() {
    console.log("Suite execution started.");
    if (useMainPage) {
      var mainPage = new MainPage();
      mainPage.get();
      mainPage.selectFindDropdown();
      mainPage.selectFreelancersOptionToFind();
      mainPage.findFreelancers(browser.params.search.speciality);
    }
  });

  it("Find Freelansers from - " + browser.params.search.expectedLocation + " - only", function() {
    var searchFreelancersPage = new SearchFreelancersPage();
    if (!useMainPage) {
      searchFreelancersPage.getPage();
    }
    searchFreelancersPage.openAdvancedFilters();
    searchFreelancersPage.selectLocation(browser.params.search.expectedLocation)
    searchFreelancersPage.selectSearchLocationResult();
    searchFreelancersPage.updateFilters();

    var locationsFreelancersList = searchFreelancersPage.getFreelancersLocationList();
    locationsFreelancersList.each(function(element, index) {
      element.getText().then(function(actualLocation) {
        expect(browser.params.search.expectedLocation).toEqual(actualLocation);
      })
    });
  });
});

/** Represents  the main page of the site "www.upwork.com". */
var MainPage = function() {
  var findDropdown = element(by.xpath("(//*[@class='button'])[1]"));
  var optionToFind = element(by.xpath("(//*[text()='" + browser.params.search.freelancers + "'])[1]"));
  var findFreelancers = element(by.id('q'));

  /** Opens the main page of the site "www.upwork.com". */
  this.get = function() {
    browser.driver.manage().window().maximize();
    browser.get(browser.baseUrl);
  };

  /**Opens the dropdown to make a choice what to find. */
  this.selectFindDropdown = function() {
    findDropdown.click();
  };

  /** Choosing a search option. */
  this.selectFreelancersOptionToFind = function() {
    optionToFind.click()
  };

  /** Opens the page with  filters and information about freelancers. 
  * @param {string} speciality -  Specialization of freelancers.
  */
  this.findFreelancers = function(speciality) {
    findFreelancers.click();
    findFreelancers.sendKeys(speciality);
    findFreelancers.submit();
  };
};

/** Represents  the page with  filters and information about freelancers. */
var SearchFreelancersPage = function() {
  var locationSearch = element(by.id('location-search'));
  var searchLocationResult = element(by.xpath("(//*[@data-ng-bind-html='item.title | highlighter:query'])[1]"));
  var updateFilters = element(by.buttonText('Update Filters'));
  var freelancersLocationList = element.all(by.xpath("//*[@data-ng-attr-title='{{ fullLocationLabel }}']"));

  /** Opens the page with  filters and information about freelancers. */
  this.getPage = function() {
    browser.driver.manage().window().maximize();
    browser.get('https://www.upwork.com/o/profiles/browse/?q=web%20developers');
  };

  /** Opens advanced filters. */
  this.openAdvancedFilters = function() {
    element(by.buttonText('Advanced filters')).click();
  };

  /** Selects the region location of freelancers. */
  this.selectSearchLocationResult = function() {
    searchLocationResult.click();
  };

  /** Updates advanced filters. */
  this.updateFilters = function() {
    updateFilters.click();
  };

  /**
  * Selects the location of freelancers.
  * @param {string} location -  Location of freelancers.
  */
  this.selectLocation = function(location) {
    locationSearch.click();
    locationSearch.sendKeys(location);
  };

  /** 
  * Returns a list of locations  freelancers.
  * @returns {list} List of web elements.
  */
  this.getFreelancersLocationList = function() {
    return freelancersLocationList;
  };
};