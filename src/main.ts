import "@/css/globals.css";
import "@/css/index.css";

import { apps } from "@/ts/apps";
import { choiceApps } from "@/ts/utils";

import { commands, Command, Commands } from "@/ts/commands";

import gsap from "gsap";
import { sharedAnimation } from "@/ts/utils";

import { renderApps } from "@/ts/render/renderApps";
import { renderNotification } from "@/ts/render/renderNotification";

// render apps into main body
renderApps(apps, document.querySelector(".apps")!);

// render top apps into footer
renderApps(choiceApps(apps, 4), document.querySelector(".start__apps")!);
renderNotification("Community", Math.floor(Math.random() * 5) + 1);

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
  },
);

gsap.fromTo(
  "footer",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    ...sharedAnimation,
  },
);

// commands
const commandWrapper = document.querySelector<HTMLDivElement>(".command")!;
const commandInput = commandWrapper.querySelector<HTMLInputElement>("input")!;
const commandAuto =
  commandWrapper.querySelector<HTMLDivElement>(".command__auto")!;
const commandHistory =
  commandWrapper.querySelector<HTMLDivElement>(".command__history")!;

let keys: string[] = [];

/**
 * render a command block to a parent
 * @param command command to render
 * @param parent parent to render to
 * @returns {HTMLDivElement} command block
 */
const renderCommandBlock = (command: Command, parent: HTMLElement) => {
  const commandBlock = document.createElement("div");
  commandBlock.className = "command__block";
  commandBlock.textContent = command.name;
  parent.appendChild(commandBlock);

  return commandBlock;
};

/**
 * render commands
 * @param commands commands to render
 * @param commandAuto parent element
 */
const renderCommands = (commands: Commands, commandAuto: HTMLElement) => {
  commandAuto.innerHTML = "";

  for (let command of commands) {
    const commandCell = document.createElement("div");
    commandCell.className = "command__auto__cell";

    renderCommandBlock(command, commandCell);

    const commandDescription = document.createElement("span");
    commandDescription.textContent = command.description;
    commandCell.appendChild(commandDescription);

    commandAuto.appendChild(commandCell);

    commandCell.onclick = () => {
      if (command.commands) {
        renderCommandBlock(command, commandHistory);
        renderCommands(command.commands, commandAuto);
      } else if (typeof command.onComplete === "function") {
        command.onComplete();
        noResults();
      }

      commandInput.value = "";
    };
  }
};

renderCommands(commands, commandAuto);

const someResults = () => {
  commandAuto.style.display = "block";

  Object.assign(commandWrapper.style, {
    borderBottomColor: "transparent",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  });
};

const noResults = () => {
  commandAuto.style.display = "none";

  commandWrapper.style.removeProperty("border-bottom-color");
  commandWrapper.style.removeProperty("border-bottom-left-radius");
  commandWrapper.style.removeProperty("border-bottom-right-radius");
};

commandInput.addEventListener("focus", someResults);

commandInput.addEventListener("input", () => {
  const input = commandInput.value;
  const filteredCommands = commands.filter((command) =>
    command.name.includes(input),
  );

  if (filteredCommands.length) {
    renderCommands(filteredCommands, commandAuto);
    someResults();
  } else {
    noResults();
  }
});

commandInput.addEventListener("blur", noResults);
commandWrapper.addEventListener("focus", () => {
  commandInput.focus();
});

// keybinds
window.addEventListener("keydown", (e) => {
  if (!keys.includes(e.key)) {
    keys.push(e.key);
  }

  // focus on input when command is triggered
  if (keys.includes("Control") && keys.includes("k")) {
    e.preventDefault();
    commandInput.focus();
  }

  if (e.key == "Backspace") {
    commandHistory.lastElementChild?.remove();
    renderCommands(commands, commandAuto);
  }
});

window.addEventListener("keyup", (e) => {
  keys = keys.filter((key) => key !== e.key);
});
