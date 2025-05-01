

const Capatilize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const distroName = () => {
  try {
    const osRelease = Utils.exec("cat /etc/os-release");
    const nameLine = osRelease.split("\n").find((line) => line.startsWith("NAME="));
    if (nameLine) {
      const name = nameLine.split("=")[1].replace(/"/g, "");
      return name;
    }
    return "Unknown";
  } catch (e) {
    return "Unknown";
  }
};

const hostName = Utils.exec("hostname");
const kernelRelease = Utils.exec("uname -r");

const uptime = Variable(0, {
  poll: [
    60000,
    () => {
      try {
        const uptimeSeconds = parseFloat(Utils.exec("awk '{print $1}' /proc/uptime"));
        const uptimeHours = (uptimeSeconds / 3600).toFixed(2);
        return uptimeHours;
      } catch (error) {
        console.error("Error getting uptime:", error);
        return 0;
      }
    },
  ],
});

const IconLabel = ({ icon, label, className }) => {
  return Widget.Box({
    children: [
      Widget.Label({
        class_name: "icon",
        label: icon,
      }),
      Widget.Label({
        class_name: "value",
        label: label,
      }),
    ],
    class_name: className,
  });
};

const userName = Utils.exec("whoami");

const css = `
    background-image: url("/home/ahmed/.profile.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100px;
    min-width: 100px;
    margin-right: 14px;
    border-radius: 4px;
  `;

const fetch = [
  { icon: " ", value: `User:   ${Capatilize(userName)}`, cn: "user" },
  { icon: ": ", value: `Host:   ${hostName}`, cn: "host" },
  { icon: "󰻀: ", value: `Distro: ${distroName()}`, cn: "distro" },
  { icon: "󰌢: ", value: `Kernel: ${kernelRelease}`, cn: "kernel" },
];

export default () =>
  Widget.Box({
    class_name: "sysfetch",
    children: [
      Widget.Box({
        css: css,
      }),
      Widget.Box({
        vpack: "start",
        hpack: "start",
        spacing: 2,
        vertical: true,
        setup: (self) => {
          fetch.map((item) =>
            self.add(
              IconLabel({
                icon: item.icon,
                label: item.value,
                className: item.cn,
              }),
            ),
          );
          self.add(
            Widget.Box({
              class_name: "uptime",
              children: [
                Widget.Label({
                  class_name: "icon",
                  label: ": ",
                }),
                Widget.Label().hook(uptime, (self) => {
                  self.class_name = "value";
                  self.label = `Uptime: ${uptime.value} Hours`;
                }),
              ],
            }),
          );
        },
      }),
    ],
  });