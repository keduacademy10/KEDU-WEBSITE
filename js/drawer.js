/* =========================================
   KEDU WORLD — DRAWER CONTROLLER
========================================= */

(function () {

    "use strict";


    /* =====================================
       ELEMENTS
    ===================================== */

    const menuButton =
        document.getElementById(
            "menu-button"
        );


    const drawer =
        document.getElementById(
            "kedu-drawer"
        );


    const overlay =
        document.getElementById(
            "drawer-overlay"
        );


    const closeButton =
        document.getElementById(
            "drawer-close-button"
        );


    const settingsButton =
        document.getElementById(
            "settings-button"
        );


    const settingsSubmenu =
        document.getElementById(
            "settings-submenu"
        );


    /* =====================================
       OPEN DRAWER
    ===================================== */

    function openDrawer() {

        if (
            !drawer ||
            !overlay
        ) {

            return;

        }


        drawer.classList.add(
            "active"
        );


        overlay.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================
       CLOSE DRAWER
    ===================================== */

    function closeDrawer() {

        if (
            !drawer ||
            !overlay
        ) {

            return;

        }


        drawer.classList.remove(
            "active"
        );


        overlay.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================
       MENU BUTTON
    ===================================== */

    if (
        menuButton
    ) {

        menuButton.addEventListener(
            "click",
            openDrawer
        );

    }


    /* =====================================
       CLOSE BUTTON
    ===================================== */

    if (
        closeButton
    ) {

        closeButton.addEventListener(
            "click",
            closeDrawer
        );

    }


    /* =====================================
       OVERLAY
    ===================================== */

    if (
        overlay
    ) {

        overlay.addEventListener(
            "click",
            closeDrawer
        );

    }


    /* =====================================
       SETTINGS SUBMENU
    ===================================== */

    if (
        settingsButton &&
        settingsSubmenu
    ) {

        settingsButton.addEventListener(
            "click",
            function () {

                settingsButton.classList.toggle(
                    "open"
                );


                settingsSubmenu.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================
       ESCAPE KEY
    ===================================== */

    document.addEventListener(
        "keydown",
        function (
            event
        ) {

            if (
                event.key ===
                "Escape"
            ) {

                closeDrawer();

            }

        }
    );


    /* =====================================
       GLOBAL CLOSE FUNCTION
    ===================================== */

    window.closeKeduDrawer =
        closeDrawer;


})();