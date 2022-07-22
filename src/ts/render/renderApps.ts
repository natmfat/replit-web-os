import * as icons from "@/ts/icons";
import { apps, Apps } from "@/ts/apps";
import { choiceApps } from "@/ts/utils";

import { commands, Command, Commands } from "@/ts/commands";

import gsap, { Expo, Elastic } from "gsap";
import { sharedAnimation } from "@/ts/utils";

// render modal
export const renderModal = (apps: Apps, folderName: string) => {
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
export const renderApps = (apps: Apps, appsContainer: HTMLElement) => {
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
