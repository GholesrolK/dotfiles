
const bash = (command) => {
  return Utils.exec(`bash -c "${command}"`);
};

const icons = {
  screenshot: "",
  nightlightOn: "",
  nightlightOff: "󰃟",
  power: "󰐥",
  reboot: "󰜜",
};

const CustomButton = ({ icon, label, hexpand = false, on_primary_click }) => {
  return Widget.Button({
    hexpand: hexpand,
    child: Widget.Box({
      children: [
        Widget.Label({ label: icon }),
        Widget.Label({ label: label }),
      ],
      spacing: 5,
    }),
    on_primary_click: on_primary_click,
  });
};

const nightlightEnabled = Variable(false);

const toggleNightlight = () => {
  nightlightEnabled.value = !nightlightEnabled.value;
  bash(`gammastep -${nightlightEnabled.value ? "o" : "x"}`);
};

export default () =>
  Widget.Box({
    class_name: "buttons-grid",
    children: [
      Widget.Box({
        class_name: "container",
        vertical: true,
        spacing: 10,
        children: [
          Widget.Box({
            spacing: 10,
            children: [
              CustomButton({
                icon: icons.screenshot,
                label: "Screenshot",
                hexpand: true,
                on_primary_click: () => bash("hyprshot -m region"),
              }),
              CustomButton({
                icon: nightlightEnabled.value ? icons.nightlightOn : icons.nightlightOff,
                label: "Nightlight",
                hexpand: true,
                on_primary_click: toggleNightlight,
              }).hook(nightlightEnabled, (self) => {
                self.child.children[0].label = nightlightEnabled.value ? icons.nightlightOn : icons.nightlightOff;
              }),
            ],
          }),
          Widget.Box({
            spacing: 10,
            children: [
              CustomButton({
                icon: icons.power,
                label: "Shutdown",
                hexpand: true,
                on_primary_click: () => bash("shutdown now"),
              }),
              CustomButton({
                icon: icons.reboot,
                label: "Reboot",
                hexpand: true,
                on_primary_click: () => bash("reboot"),
              }),
            ],
          }),
        ],
      }),
    ],
  });