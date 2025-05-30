#!/usr/bin/ags -c
import GLib from "gi://GLib";
import {exec, idle, monitorFile} from "resource:///com/github/Aylur/ags/utils.js";
import "./utils.js";
import Bar from "./modules/bar/index.js";
import profile from "./modules/profile/QuickSettings.js";
import {
  CornerTopleft,
  CornerTopright,
  CornerBottomright,
  CornerBottomleft
} from "./modules/roundedCorner/index.js";
import {IndicatorWidget} from "./modules/indicator/index.js";
import Quicksettings from "./modules/quicksettings/index.js";
import Launcher from "./modules/applauncher/index.js";
import PowerMenu from "./modules/powermenu/index.js";
import {PopupNotifications} from "./modules/notifications/index.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Gio from "gi://Gio";
import Gdk from "gi://Gdk";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";

import ConfigService from "./modules/config/index.js";

/**
 * @param {import('types/@girs/gtk-3.0/gtk-3.0').Gtk.Window[]} windows
  */
function addWindows(windows) {
  windows.forEach(win => App.addWindow(win));
}

globalThis.monitorCounter = 0;



globalThis.togglePower = () => {
  App.toggleWindow("session");
};
globalThis.toggleQuick = () => {
  App.toggleWindow("quicksettings");
};
globalThis.profile = () => {
  App.toggleWindow("profile");
};


idle(async () => {
  addWindows([
    IndicatorWidget(),
    Quicksettings(),
    await Launcher(),
    PowerMenu(),
    profile(),
    PopupNotifications(),
  ]);

  

});


//config
Notifications.popupTimeout = 5000;
Notifications.forceTimeout = true;


App.config({
  style: "./style.css",
  icons: "./modules/icons",
  closeWindowDelay: {
    sideright: 350,
    quicksettings: 500,
    launcher: 500,
    session: 350,
    indicator: 200,
    popupNotifications: 200,
  },
});



