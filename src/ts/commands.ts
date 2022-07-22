import { radix } from "@/ts/icons";

export interface Command {
    icon: string;
    name: string;
    description: string;
    onComplete?: () => void;
    commands?: Command[];
}

export type Commands = Command[];

export const commands: Commands = [
    {
        icon: radix.arrowTopRight,
        name: "bookmarks",
        description: "Open a saved collection of bookmarks",

        commands: [
            {
                icon: radix.arrowTopRight,
                name: "github",
                description: "Github",

                onComplete: () => {
                    window.open("https://github.com/nathan-pham");
                },
            },
            {
                icon: radix.arrowTopRight,
                name: "twitter",
                description: "Twitter",

                onComplete: () => {
                    window.open("https://twitter.com/phamn23");
                },
            },
            {
                icon: radix.arrowTopRight,
                name: "website",
                description: "Personal Website",

                onComplete: () => {
                    window.open("https://nathanpham.me");
                },
            },
        ],
    },
    {
        icon: radix.github,
        name: "github",
        description: "Open project source code",
        onComplete: () => {
            window.open("https://github.com/nathan-pham/replit-web-os");
        },
    },
];
