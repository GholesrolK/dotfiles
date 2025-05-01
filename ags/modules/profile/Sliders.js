const bash = (command) => {
  return Utils.exec(`bash -c "${command}"`);
};



const brightness = Variable(0, {
  poll: [
    5000,
    () => {
      try {
        const value = Utils.exec("brightnessctl -q p");
        return value;
      } catch (error) {
        console.error("Error getting brightness:", error);
        return 0;
      }
    },
  ],
});

const volume = Variable(0, {
  poll: [
    5000,
    () => {
      try {
        const value = Utils.exec("wpctl get-volume @DEFAULT_AUDIO_SINK@")
        return value;
      } catch (error) {
        console.error("Error getting volume:", error);
        return 0;
      }
    },
  ],
});

const setBrightness = (value) => {
  Utils.exec(`brightnessctl -s ${value * 100}%`);
};

const setVolume = (value) => {
    Utils.exec(`wpctl set-volume @DEFAULT_AUDIO_SINK@ ${value}`);
};

export default () =>
  Widget.Box({
    class_name: "sliders-box",
    vertical: true,
    spacing: 10,
    children: [
      Widget.Box({
        children: [
          Widget.Label({ label: "Brightness: " }),
          Widget.Slider({
            hexpand: true,
            value: brightness.bind(),
            on_change: ({ value }) => setBrightness(value),
          }),
        ],
      }),
      Widget.Box({
        children: [
          Widget.Label({ label: "Volume: " }),
          Widget.Slider({
            hexpand: true,
            value: volume.bind(),
            on_change: ({ value }) => setVolume(value),
          }),
        ],
      }),
    ],
  });