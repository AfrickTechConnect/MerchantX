"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageCounter = exports.paginationValues = void 0;

/**
 * @name pageParser
 * @param {Number} page Page number to be returned
 * @param {Number} pageItems Number of items on page
 * @returns {Object} parsed values of arguments
 */
var pageParser = function pageParser(page, pageItems) {
  var defaultPage = 1;
  var defaultPageItems = 10;
  var base = 10;
  var parsedPage = parseInt(page, base);
  var parsedPageItems = parseInt(pageItems, base);

  if (Number.isNaN(parsedPage)) {
    parsedPage = defaultPage;
  }

  if (Number.isNaN(parsedPageItems)) {
    parsedPageItems = defaultPageItems;
  }

  return {
    parsedPage: parsedPage,
    parsedPageItems: parsedPageItems
  };
};
/**
     * @name paginationValues
     * @description function that returns offset and limit for pagination
     * @param {Object} query object with page and pageItems as integers
     * @returns {(offset|limit)} offset and limit to pagenate request
     */


var paginationValues = function paginationValues(_ref) {
  var page = _ref.page,
      pageItems = _ref.pageItems;

  var _pageParser = pageParser(page, pageItems),
      parsedPage = _pageParser.parsedPage,
      parsedPageItems = _pageParser.parsedPageItems;

  var offset = (parsedPage - 1) * parsedPageItems;
  var limit = parsedPageItems;
  return {
    offset: offset,
    limit: limit
  };
};
/**
     * @name pageCounter
     * @param {Number} count Number of items returned from query
     * @param {Number} page Page number to be returned
     * @param {Number} pageItems Number of items on page
     * @returns {(totalPages|itemsOnPage)} object with number of items returned
     */


exports.paginationValues = paginationValues;

var pageCounter = function pageCounter(count, page, pageItems) {
  var _pageParser2 = pageParser(page, pageItems),
      parsedPage = _pageParser2.parsedPage,
      parsedPageItems = _pageParser2.parsedPageItems;

  var itemsOnPage;
  var totalPages = Math.ceil(count / parsedPageItems);
  var lastPage = count - (parsedPage - 1) * parsedPageItems;
  var totalPageCheck = totalPages === parsedPage;

  if (totalPages < parsedPage) {
    itemsOnPage = 0;
  } else {
    itemsOnPage = totalPageCheck ? lastPage : parsedPageItems;
  }

  return {
    totalPages: totalPages,
    itemsOnPage: itemsOnPage,
    parsedPage: parsedPage
  };
};

exports.pageCounter = pageCounter;