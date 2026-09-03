/* =========================================
   KEDU WORLD — SOCIAL SYSTEM
========================================= */

(function () {

    "use strict";


    /* =====================================
       SOCIAL DATA
    ===================================== */

    const socialPlatforms = [

        {

            id:
                "whatsapp",

            name:
                "WhatsApp Channel",

            description:
                "Join for instant official alerts, safe updates and important KEDU news.",

            button:
                "JOIN US",

            link:
                "https://whatsapp.com/channel/0029Vb8J2YL1yT2GC58Kad19",

            icon:
                "icon-whatsapp"

        },


        {

            id:
                "youtube",

            name:
                "YouTube Channel",

            description:
                "Watch KEDU lectures, educational videos, updates and learning content.",

            button:
                "SUBSCRIBE",

            link:
                "https://www.youtube.com/@Keduworld10",

            icon:
                "icon-youtube"

        },


        {

            id:
                "telegram",

            name:
                "Telegram Channel",

            description:
                "Join the official KEDU Telegram community for updates and discussions.",

            button:
                "JOIN US",

            link:
                "https://t.me/keduworld",

            icon:
                "icon-telegram"

        },


        {

            id:
                "instagram",

            name:
                "Instagram Channel",

            description:
                "Follow KEDU for educational posts, announcements and daily updates.",

            button:
                "FOLLOW",

            link:
                "https://www.instagram.com/keduworld?igsi=YW1wNDhqOGk1eDUz",

            icon:
                "icon-instagram"

        },


        {

            id:
                "pinterest",

            name:
                "Pinterest",

            description:
                "Follow KEDU for educational ideas, visual content and learning inspiration.",

            button:
                "FOLLOW",

            link:
                "https://pin.it/2NVTzXJ7D",

            icon:
                "icon-pinterest"

        }

    ];


    /* =====================================
       CREATE SOCIAL CARD
    ===================================== */

    function createSocialCard(
        platform
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "social-card social-card-" +
            platform.id;


        card.innerHTML =
            `

            <!-- START: SOCIAL ICON -->

            <div class="social-card-icon">

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >

                    <use
                        href="#${platform.icon}"
                    ></use>

                </svg>

            </div>

            <!-- END: SOCIAL ICON -->


            <!-- START: SOCIAL CONTENT -->

            <div class="social-card-content">

                <h3>

                    ${platform.name}

                </h3>


                <p>

                    ${platform.description}

                </p>

            </div>

            <!-- END: SOCIAL CONTENT -->


            <!-- START: SOCIAL BUTTON -->

            <a
                href="${platform.link}"
                class="social-connect-button"
                target="_blank"
                rel="noopener noreferrer"
            >

                <span>

                    ${platform.button}

                </span>


                <span
                    class="social-button-arrow"
                    aria-hidden="true"
                >

                    →

                </span>

            </a>

            <!-- END: SOCIAL BUTTON -->

            `;


        return card;

    }


    /* =====================================
       RENDER SOCIAL CARDS
    ===================================== */

    function renderSocialCards(
        containerId
    ) {

        const container =
            document.getElementById(
                containerId
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML =
            "";


        socialPlatforms.forEach(
            function (
                platform
            ) {

                container.appendChild(
                    createSocialCard(
                        platform
                    )
                );

            }
        );

    }


    /* =====================================
       INITIALIZE
    ===================================== */

    function initializeSocialSystem() {

        renderSocialCards(
            "home-social-grid"
        );


        renderSocialCards(
            "follow-social-grid"
        );

    }


    /* =====================================
       GLOBAL SOCIAL FUNCTIONS
    ===================================== */

    window.initializeKeduSocial =
        initializeSocialSystem;


    /* =====================================
       START
    ===================================== */

    initializeSocialSystem();


})();