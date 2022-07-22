import { Apps } from "./apps";
import { Expo } from "gsap";

// select random start apps
export const choiceApps = (apps: Apps, count: number): Apps => {
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

export const sharedAnimation = {
    duration: 1,
    ease: Expo.easeInOut,
};
