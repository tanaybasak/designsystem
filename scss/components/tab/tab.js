patron.tabs("#tabsjs", {
    selectedIndex: 2,
    disabled: [2],
    onChange: function (e) {
        console.log(e);
    }
});