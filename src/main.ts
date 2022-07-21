import "@/css/globals.css";
import "@/css/index.css";

import { apps } from "@/ts/apps";

const appsContainer = document.querySelector(".apps")!;

// render apps
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
    }

    appElement.appendChild(appTitle);
    appsContainer.appendChild(appElement);
}
