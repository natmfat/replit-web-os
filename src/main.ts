import "@/css/globals.css";
import "@/css/index.css";

import { apps, Apps } from "@/ts/apps";

// select random start apps
const choiceApps = (apps: Apps, count: number): Apps => {
    const randomApps: Apps = [];

    let i = 0;
    while (i < count) {
        const randomApp = apps[Math.floor(Math.random() * apps.length)];

        if (!randomApps.includes(randomApp)) {
            randomApps.push(randomApp);
            i++;
        }
    }

    return randomApps;
};

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

// render apps into main body
renderApps(apps, document.querySelector(".apps")!);

// render top apps into footer
renderApps(choiceApps(apps, 4), document.querySelector(".start__apps")!);
