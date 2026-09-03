/* =========================================
   KEDU — UNIVERSAL LOADING SYSTEM
========================================= */

(function () {

    "use strict";


    /* =====================================
       START LOADING
    ===================================== */

    function startLoading() {


        const loadingScreen =
            document.getElementById(
                "loading-screen"
            );


        const progressBar =
            document.getElementById(
                "loading-progress"
            );


        const progressPercent =
            document.getElementById(
                "loading-percent"
            );


        const loadingText =
            document.querySelector(
                ".loading-text"
            );


        /* =================================
           SAFETY CHECK
        ================================= */

        if (
            !loadingScreen ||
            !progressBar ||
            !progressPercent ||
            !loadingText
        ) {

            console.error(
                "KEDU Loading: Required elements not found."
            );

            return;

        }


        /* =================================
           DETECT APP NAME
        ================================= */

        const appName =
            document.body.dataset.appName ||
            "KEDU WORLD";


        /* =================================
           LOADING MESSAGES
        ================================= */

        const loadingMessages = [

            {
                progress: 0,
                message:
                    "Preparing Your Experience"
            },

            {
                progress: 20,
                message:
                    "Loading " + appName
            },

            {
                progress: 40,
                message:
                    "Setting Up Your Experience"
            },

            {
                progress: 65,
                message:
                    "Almost Ready"
            },

            {
                progress: 85,
                message:
                    "Finalizing Everything"
            },

            {
                progress: 100,
                message:
                    "Welcome To " + appName
            }

        ];


        let progress =
            0;


        let currentMessageIndex =
            0;


        /* =================================
           UPDATE MESSAGE
        ================================= */

        function updateMessage() {


            if (
                currentMessageIndex <
                loadingMessages.length - 1
            ) {

                const nextMessage =
                    loadingMessages[
                        currentMessageIndex + 1
                    ];


                if (
                    progress >=
                    nextMessage.progress
                ) {

                    currentMessageIndex += 1;


                    loadingText.classList.add(
                        "message-changing"
                    );


                    setTimeout(
                        function () {

                            loadingText.textContent =
                                loadingMessages[
                                    currentMessageIndex
                                ].message;


                            loadingText.classList.remove(
                                "message-changing"
                            );

                        },
                        150
                    );

                }

            }

        }


        /* =================================
           START PROGRESS
        ================================= */

        const loadingTimer =
            setInterval(
                function () {


                    progress += 1;


                    if (
                        progress > 100
                    ) {

                        progress = 100;

                    }


                    /* UPDATE PROGRESS BAR */

                    progressBar.style.width =
                        progress + "%";


                    /* UPDATE PERCENTAGE */

                    progressPercent.textContent =
                        progress + "%";


                    /* UPDATE MESSAGE */

                    updateMessage();


                    /* =========================
                       FINISH LOADING
                    ========================= */

                    if (
                        progress === 100
                    ) {

                        clearInterval(
                            loadingTimer
                        );


                        setTimeout(
                            function () {


                                loadingScreen.classList.add(
                                    "loading-hidden"
                                );


                                setTimeout(
                                    function () {

                                        loadingScreen.remove();

                                    },
                                    700
                                );


                            },
                            900
                        );

                    }


                },
                25
            );

    }


    /* =====================================
       START AFTER HTML IS READY
    ===================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startLoading,
            {
                once:
                    true
            }
        );

    } else {

        startLoading();

    }


})();