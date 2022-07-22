export const renderNotification = (title: string, count: number) => {
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
