import { bash } from "lib/utils";

const isRunning = Variable(false, {
  listen: ["hyprshade current", (out) => out === "blue-light-filter"],
});

const runCmd = "hyprshade on blue-light-filter";
const killCmd = "hyprshade off";

export const nightlight = {
  service: isRunning,
  toggle: () => {
    if (!isRunning.value) {
      bash(runCmd).then(() => {
        isRunning.value = true;
      });
    } else {
      bash(killCmd).then(() => {
        isRunning.value = false;
      });
    }
  },
};
