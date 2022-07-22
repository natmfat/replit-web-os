import * as icons from "./icons";

export interface App {
    name: string;
    icon?: string;
    iconColor?: string;
    bg?: string;
    apps?: App[];
    href?: string;
}

export type Apps = App[];

export const apps: Apps = [
    {
        name: "Home",
        bg: "#ffffff",
        icon: icons.home,
        iconColor: "#e49d3a",
        href: "/",
    },
    {
        name: "Languages",
        apps: [
            {
                name: "Python",
                icon: icons.devicon.python,
                bg: "#1a252e",
                href: "/new/python3",
            },
            {
                name: "HTML5",
                icon: icons.devicon.html5,
                bg: "#1a252e",
                href: "/new/html",
            },
            {
                name: "JavaScript",
                icon: icons.devicon.javascript,
                bg: "#1a252e",
                href: "/new/nodejs",
            },
        ],
    },
    {
        name: "Templates",
        bg: "#d3483f",
        icon: icons.templates,
        href: "/templates",
    },
    {
        name: "My Repls",
        bg: "#5782ea",
        icon: icons.folder,
        href: "/@phamn23",
    },
    {
        name: "Learn",
        bg: "#8a4f4d",
        icon: icons.apple,
        href: "/learn",
    },
    {
        name: "Community",
        bg: "#67a3d6",
        icon: icons.web,
        href: "/community/all",
    },
    {
        name: "Teams",
        bg: "#78c84f",
        icon: icons.teams,
        href: "/teams",
    },
    {
        name: "Curriculum",
        bg: "#da7f37",
        icon: icons.book,
        href: "/curriculum",
    },
    {
        name: "Settings",
        bg: "#1d2334",
        icon: icons.pen,
        href: "/account",
    },
    {
        name: "Create Repl",
        bg: "#2b54a8",
        icon: icons.add,
        href: "/new",
    },
    {
        name: "Upgrade",
        bg: "#355f1e",
        icon: icons.rocket,
        href: "/pricing",
    },
    {
        name: "Notifications",
        bg: "#960711",
        icon: icons.bell,
        href: "/notifications",
    },
];
