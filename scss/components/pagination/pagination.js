"use strict";

// pagination Controller
let paginationController = (function () {

    let paginationObj = {
        itemsPerPage: null,
        currenPage: null,
        numOfItems: null,
        itemsRangeStart: 1,
        numberOfPages: null
    };

    return {
        setPaginationObj: function (obj) {
            paginationObj.itemsPerPage = obj.itemsPerPage;
            paginationObj.currenPage = obj.currenPage;
            paginationObj.numOfItems = obj.numOfItems;
            // paginationObj.itemsRangeStart = 1;
            paginationObj.numberOfPages = obj.numOfItems % obj.itemsPerPage === 0 ? obj.numOfItems % obj.itemsPerPage : obj.numOfItems % obj.itemsPerPage + 1;

        },

        getPaginationObj: function () {
            return paginationObj;
        },
    };

})();


// UI Controller
let UIController = (function () {

    let DOMstrings = {
        itemsPerPageSelect: '.hcl-pagination__selectInput',

        // data-attributes
        itemRange: '[data-displayed-item-range]',
        totalItems: '[data-total-items]',

        // id
        rightSelect: 'hcl-pagination-right-select',
        letSelect: 'hcl-pagination-right-select',
        rightLabel: 'hcl-pagination-right-label',

    };

    String.prototype.replaceAll = function (search, replacement) {
        let target = this;
        return target.split(search).join(replacement);
    };

    const initItemsPerPageSelect = function (paginationObj) {
        let tempHtml = '<option class="hcl-pagination-option" value="%items%">%items%</option>';
        let element = DOMstrings.itemsPerPageSelect;

        for (let i = paginationObj.itemsPerPage; i <= paginationObj.numOfItems; i += paginationObj.itemsPerPage) {
            let itemsPerPageSelectHTML = tempHtml.replaceAll('%items%', i);
            document.querySelector(element).insertAdjacentHTML('beforeend', itemsPerPageSelectHTML);

        }

    };

    const initSelItemsOftotalItems = function (paginationObj) {
        let element = DOMstrings.totalItems;
        document.querySelectorAll(element)[0].innerText = paginationObj.numOfItems;


        element = DOMstrings.itemRange;
        let range = `${paginationObj.itemsRangeStart}-${paginationObj.itemsPerPage}`
        document.querySelectorAll(element)[0].innerText = range;

    };



    const initPaginationRight = function (paginationObj) {
        let tempHtml = '<option class="hcl-pagination-option" value="%items%">%items%</option>';
        let element = DOMstrings.rightSelect;

        for (let i = 1; i <= paginationObj.numberOfPages; i++) {
            let selectOptionHTML = tempHtml.replaceAll('%items%', i);
            document.getElementById(element).insertAdjacentHTML('beforeend', selectOptionHTML);

        }

        element = DOMstrings.rightLabel;
        let str = `of ${paginationObj.numberOfPages} pages`
        document.getElementById(element).innerText = str;

    }

    return {
        initPagination: function (paginationObj) {
            initItemsPerPageSelect(paginationObj);
            initSelItemsOftotalItems(paginationObj);
            initPaginationRight(paginationObj);
        },
        getDOMstrings: function () {
            return DOMstrings;
        },
    };
})();


// Main controller
let controller = (function (pageCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();


    };


    return {
        init: function () {
            // here we initilize paginationObj
            pageCtrl.setPaginationObj({
                itemsPerPage: 12,
                currenPage: 1,
                numOfItems: 52,

            });
            UICtrl.initPagination(pageCtrl.getPaginationObj());
            setupEventListeners();
        }
    };

})(paginationController, UIController);

controller.init();