import "@/css/globals.css";
import "@/css/index.css";

import { apps, Apps } from "@/ts/apps";
import { choiceApps } from "@/ts/utils";

// render apps
const renderApps = (apps: Apps, appsContainer: HTMLElement) => {
    for (const app of apps) {
        // create app
        const appElement = document.createElement("div");
        appElement.className = "app";

        // create app name
        const appTitle = document.createElement("span");
        appTitle.textContent = app.name;
        appTitle.className = "app__title";

        // apply background color
        if (app.bg) {
            appElement.style.background = app.bg;
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
};

const renderNotification = (title: string, count: number) => {
    const apps = [...document.querySelectorAll<HTMLDivElement>(".app")];

    for (const app of apps) {
        const appTitle = app.querySelector(".app__title")?.textContent;
        console.log(appTitle);
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
