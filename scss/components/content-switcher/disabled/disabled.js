window.patron.contentswitch("#content-switcher3", {
    selectedIndex: 2,
    disabled: [1],
    onChange: function (e) {
        console.log(e);
    }
});