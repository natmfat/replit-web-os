import * as icons from "./icons";

export interface App {
    name: string;
    icon?: string;
    iconColor?: string;
    bg?: string;
    apps?: App[];
}

export type Apps = App[];

export const apps: Apps = [
    {
        name: "Home",
        bg: "#ffffff",
        icon: icons.home,
        iconColor: "#e49d3a",
    },
    {
        name: "Languages",
        apps: [
            {
                name: "Python",
                icon: icons.devicon.python,
                bg: "#1a252e",
            },
            {
                name: "HTML5",
                icon: icons.devicon.html5,
                bg: "#1a252e",
            },
            {
                name: "JavaScript",
                icon: icons.devicon.javascript,
                bg: "#1a252e",
            },
        ],
    },
    {
        name: "Templates",
        bg: "#d3483f",
        icon: icons.templates,
    },
    {
        name: "My Repls",
        bg: "#5782ea",
        icon: icons.folder,
    },
    {
        name: "Learn",
        bg: "#8a4f4d",
        icon: icons.apple,
    },
    {
        name: "Community",
        bg: "#67a3d6",
        icon: icons.web,
    },
    {
        name: "Teams",
        bg: "#78c84f",
        icon: icons.teams,
    },
    {
        name: "Curriculum",
        bg: "#da7f37",
        icon: icons.book,
    },
    {
        name: "Settings",
        bg: "#1d2334",
        icon: icons.pen,
    },
    {
        name: "Create Repl",
        bg: "#2b54a8",
        icon: icons.add,
    },
    {
        name: "Upgrade",
        bg: "#355f1e",
        icon: icons.rocket,
    },
    {
        name: "Notifications",
        bg: "#960711",
        icon: icons.bell,
    },
];
