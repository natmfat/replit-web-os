import "@/css/globals.css";
import "@/css/index.css";

import * as icons from "@/ts/icons";
import { apps, Apps } from "@/ts/apps";
import { choiceApps } from "@/ts/utils";

import gsap, { Expo, Elastic } from "gsap";

const sharedAnimation = {
    duration: 1,
    ease: Expo.easeInOut,
};

// render modal
// TODO: animate modal (move.js)
const renderModal = (apps: Apps, folderName: string) => {
    const modalWrapper = document.createElement("div");
    modalWrapper.className = "modal-wrapper";

    const modal = document.createElement("aside");
    modal.className = "modal";
    modalWrapper.appendChild(modal);

    const title = document.createElement("h1");
    title.textContent = folderName;
    modal.appendChild(title);

    const modalApps = document.createElement("div");
    modalApps.className = "modal__apps";
    modal.appendChild(modalApps);

    renderApps(apps, modalApps);

    document.body.appendChild(modalWrapper);

    const enterTimeline = gsap
        .timeline({
            paused: true,
        })
        .fromTo(
            modalWrapper,
            { opacity: 0 },
            { opacity: 1, ...sharedAnimation, duration: 0.5 }
        )
        .fromTo(
            modal,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, ...sharedAnimation, delay: -0.5 }
        );

    enterTimeline.play();

    modalWrapper.addEventListener("click", (e) => {
        if (e.target === modalWrapper) {
            e.preventDefault();

            enterTimeline.reverse().eventCallback("onReverseComplete", () => {
                modalWrapper.remove();
            });
        }
    });
};

// render apps
const renderApps = (apps: Apps, appsContainer: HTMLElement) => {
    for (const _app of apps) {
        const app = { ..._app };

        // create app
        const appElement = document.createElement("a");
        appElement.className = "app";
        appElement.title = app.name;

        if (app.href) {
            appElement.href = `https://replit.com${app.href}`;
            appElement.target = "_blank";
            appElement.rel = "noopener noreferrer";
        }

        // create app name
        const appTitle = document.createElement("span");
        appTitle.textContent = app.name;
        appTitle.className = "app__title";

        // apply background color
        if (app.bg) {
            appElement.style.background = app.bg;
        }

        // render internal apps for folder (if in main, otherwise render folder icon)
        // in the future start menu should simplify icons into 2 grid
        if (app.apps) {
            if (appsContainer.classList.contains("apps")) {
                appElement.classList.add("apps-folder");
                renderApps(app.apps, appElement);

                appElement.addEventListener("click", () => {
                    renderModal(app.apps!, app.name);
                });
            } else {
                app.icon = icons.folder;
                app.iconColor = "#000";
            }
        }

        // add icon
        if (app.icon) {
            appElement.innerHTML = app.icon;

            if (app.iconColor) {
                appElement.style.color = app.iconColor;
            }
        }

        appElement.appendChild(appTitle);
        appsContainer.appendChild(appElement);
    }

    if (!appsContainer.classList.contains("apps-folder")) {
        gsap.fromTo(
            appsContainer.querySelectorAll(".app"),
            {
                opacity: 0,
                y: "40%",
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 2,
                ease: Elastic.easeOut,
                delay: 0.5,
            }
        );
    }
};

const renderNotification = (title: string, count: number) => {
    const apps = [...document.querySelectorAll<HTMLDivElement>(".app")];

    for (const app of apps) {
        const appTitle = app.querySelector(".app__title")?.textContent;
        if (appTitle && appTitle.toLowerCase() == title.toLowerCase()) {
            const notif = document.createElement("span");
            notif.className = "app__notif";
            notif.textContent = `${count}`;

            app.appendChild(notif);
        }
    }
};

// render apps into main body
renderApps(apps, document.querySelector(".apps")!);

// render top apps into footer
renderApps(choiceApps(apps, 4), document.querySelector(".start__apps")!);
renderNotification("Community", 5);

// animate input & footer
gsap.fromTo(
    ".command",
    {
        y: -100,
        opacity: 0,
    },
    {
        y: 0,
        opacity: 1,
        ...sharedAnimation,
    }
);

gsap.fromTo(
    "footer",
    {
        opacity: 0,
    },
    {
        opacity: 1,
        ...sharedAnimation,
    }
);
