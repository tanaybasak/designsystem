"use strict";

// pagination Controller
const paginationController = (function () {

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
            paginationObj.numberOfPages = obj.numOfItems % obj.itemsPerPage === 0 ? obj.numOfItems / obj.itemsPerPage : Math.floor(obj.numOfItems / obj.itemsPerPage) + 1;

        },

        getPaginationObj: function () {
            return paginationObj;
        },

        setItemsPerPage: function (itemsPerPage) {
            paginationObj.itemsPerPage = itemsPerPage;
            paginationObj.numberOfPages = paginationObj.numOfItems % itemsPerPage === 0 ? paginationObj.numOfItems / itemsPerPage : Math.floor(paginationObj.numOfItems / itemsPerPage) + 1;
            paginationObj.itemsRangeStart = 1;
            paginationObj.currenPage = 1;
        },

        setCurrentPage: function (currenPage) {
            paginationObj.currenPage = currenPage;
            paginationObj.itemsRangeStart = paginationObj.itemsPerPage * (currenPage - 1) + 1;

        },

        decreaseCurrentPage: function () {
            paginationObj.currenPage--;
        },

        increaseCurrentPage: function () {
            paginationObj.currenPage++;
        }
    };

})();


// UI Controller
const UIController = (function () {

    const DOMstrings = {
        // css classes
        itemsPerPageSelect: '.hcl-pagination-selectInput',
        disbleButtonClass: 'hcl-pagination-button-disable',

        // data-attributes
        itemRange: '[data-displayed-item-range]',
        totalItems: '[data-total-items]',

        // id
        rightSelect: 'hcl-pagination-right-select',
        leftSelect: 'hcl-pagination-left-select',
        rightLabel: 'hcl-pagination-right-label',
        prevPage: 'hcl-pagination-prevPage',
        nextPage: 'hcl-pagination-nextPage',
    };

    String.prototype.replaceAll = function (search, replacement) {
        let target = this;
        return target.split(search).join(replacement);
    };

    const initPaginationLeft = function (paginationObj) {
        let tempHtml = '<option class="hcl-pagination-option" value="%items%">%items%</option>';
        let element = DOMstrings.leftSelect;
        document.getElementById(element).innerHTML = "";
        for (let i = paginationObj.itemsPerPage; i <= paginationObj.numOfItems; i += paginationObj.itemsPerPage) {
            let itemsPerPageSelectHTML = tempHtml.replaceAll('%items%', i);
            document.getElementById(element).insertAdjacentHTML('beforeend', itemsPerPageSelectHTML);
        }
    };

    const initSelItemsOftotalItems = function (paginationObj) {
        let element = DOMstrings.totalItems;
        document.querySelectorAll(element)[0].innerText = paginationObj.numOfItems;
        element = DOMstrings.itemRange;
        let range = `${paginationObj.itemsRangeStart}-${paginationObj.itemsPerPage * paginationObj.currenPage > paginationObj.numOfItems ? paginationObj.numOfItems : paginationObj.itemsPerPage * paginationObj.currenPage}`
        document.querySelectorAll(element)[0].innerText = range;
    };

    const initPaginationRight = function (paginationObj) {
        let tempHtml = '<option class="hcl-pagination-option" value="%items%">%items%</option>';
        let element = DOMstrings.rightSelect;

        document.getElementById(element).innerHTML = "";

        for (let i = 1; i <= paginationObj.numberOfPages; i++) {
            let selectOptionHTML = tempHtml.replaceAll('%items%', i);
            document.getElementById(element).insertAdjacentHTML('beforeend', selectOptionHTML);
        }
    };

    const initOutOfPages = function (paginationObj) {
        let element = DOMstrings.rightLabel;
        let str = `of ${paginationObj.numberOfPages} pages`
        document.getElementById(element).innerText = str;
    };

    const setRightSelection = function (paginationObj) {
        let element = DOMstrings.rightSelect;
        document.getElementById(element).value = paginationObj.currenPage;
    };

    const disableOrEnableNextOtPrevButton = function (paginationObj) {
        let prevPageElm = document.getElementById(DOMstrings.prevPage);
        let nextPageElm = document.getElementById(DOMstrings.nextPage);

        if (paginationObj.currenPage === paginationObj.numberOfPages) {
            //disable next button
            nextPageElm.classList.add(DOMstrings.disbleButtonClass);
            nextPageElm.disabled = true; 
        } else if (nextPageElm.classList.contains(DOMstrings.disbleButtonClass)) {
            nextPageElm.classList.remove(DOMstrings.disbleButtonClass)
            nextPageElm.disabled = false; 
        }

        if (paginationObj.currenPage === 1) {
            //disable prev button
            prevPageElm.classList.add(DOMstrings.disbleButtonClass);
            prevPageElm.disabled = true;
        } else if (prevPageElm.classList.contains(DOMstrings.disbleButtonClass)) {
            prevPageElm.classList.remove(DOMstrings.disbleButtonClass);
            prevPageElm.disabled = false;
        }
    };

    return {
        initPagination: function (paginationObj) {
            initPaginationLeft(paginationObj);
            initSelItemsOftotalItems(paginationObj);
            initPaginationRight(paginationObj);
            initOutOfPages(paginationObj);
            disableOrEnableNextOtPrevButton(paginationObj);
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        onChangeLeftSelect: function (paginationObj) {
            initSelItemsOftotalItems(paginationObj);
            initPaginationRight(paginationObj);
            initOutOfPages(paginationObj);
            disableOrEnableNextOtPrevButton(paginationObj);
        },

        onChangeRightSelect: function (paginationObj) {
            initSelItemsOftotalItems(paginationObj);
            initOutOfPages(paginationObj);
            disableOrEnableNextOtPrevButton(paginationObj);
        },

        onClickPrevPage: function (paginationObj) {
            initSelItemsOftotalItems(paginationObj);
            setRightSelection(paginationObj);
            disableOrEnableNextOtPrevButton(paginationObj);
        },

        onClickNextPage: function (paginationObj) {
            initSelItemsOftotalItems(paginationObj);
            setRightSelection(paginationObj);
            disableOrEnableNextOtPrevButton(paginationObj);
        }
    };
})();


// Main controller
const controller = (function (pageCtrl, UICtrl) {

    const setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();
        document.getElementById(DOM.leftSelect).addEventListener('change', leftSelectOnChange);
        document.getElementById(DOM.rightSelect).addEventListener('change', rightSelectOnChange);
        document.getElementById(DOM.prevPage).addEventListener('click', prevPage);
        document.getElementById(DOM.nextPage).addEventListener('click', nextPage);
    };

    const leftSelectOnChange = function (event) {
        pageCtrl.setItemsPerPage(Number(event.target.value));
        UICtrl.onChangeLeftSelect(pageCtrl.getPaginationObj());
    };

    const rightSelectOnChange = function (event) {
        pageCtrl.setCurrentPage(Number(event.target.value));
        UICtrl.onChangeRightSelect(pageCtrl.getPaginationObj());
    };

    const prevPage = function (event) {
        pageCtrl.decreaseCurrentPage();
        UICtrl.onClickPrevPage(pageCtrl.getPaginationObj());
    };

    const nextPage = function (event) {
        pageCtrl.increaseCurrentPage();
        UICtrl.onClickNextPage(pageCtrl.getPaginationObj());
    };

    return {
        init: function () {
            // here we initilize paginationObj
            pageCtrl.setPaginationObj({
                itemsPerPage: 10,
                currenPage: 1,
                numOfItems: 59,

            });
            UICtrl.initPagination(pageCtrl.getPaginationObj());
            setupEventListeners();
        }
    };

})(paginationController, UIController);

controller.init();