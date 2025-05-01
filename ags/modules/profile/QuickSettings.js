
import SysFetch from "./SysFetch.js";
import ButtonsGrid from "./ButtonsGrid.js";
//import Sliders from "./Sliders.js";


const ControlPannel = () => {
  return Widget.Box({
    spacing: 10,
    class_name: "control-pannel",
    css: "margin: 6px 6px;",
    vpack: "start",
    vertical: true,
    children: [
      SysFetch(),
      ButtonsGrid()
      
    ],
  });
};

export default () =>
  Widget.Window({
    visible: false,
    name: "profile",
    anchor: ["top"],
    css: "background: transparent;",
    child: ControlPannel(),
  });
