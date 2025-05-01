{ config, pkgs,lib,  ... }:

{
  home.username = "ahmed";
  home.homeDirectory = "/home/ahmed";
  home.stateVersion = "24.11";

  home.packages = [];

  home.file = {
  #  ".config/hypr".source = "${config.home.homeDirectory}/hypr";
    
  };

home.sessionVariables = {
  EDITOR = "codium";
};

home.pointerCursor = {
  gtk.enable = true;
  # x11.enable = true;
  package = pkgs.bibata-cursors;
  name = "Bibata-Modern-Classic";
  size = 24;
};
gtk = {
enable = true;
theme = {
  package = pkgs.flat-remix-gtk;
  name = "Flat-Remix-GTK-Green-Darkest";
};
iconTheme = {
  package = pkgs.morewaita-icon-theme;
  name = "MoreWaita";
};
font = {
  name = "Sans";
  size = 11;
};
};
wayland.windowManager.hyprland = {
    enable = true;
    plugins = [
      pkgs.hyprlandPlugins.csgo-vulkan-fix
      pkgs.hyprlandPlugins.hyprsplit
      pkgs.hyprlandPlugins.hypr-dynamic-cursors
    ];
    extraConfig = let
      hyprDir = "${config.home.homeDirectory}/hypr";

      bindsContent = builtins.readFile "${hyprDir}/binds.conf";
      hyprlandContent = builtins.readFile "${hyprDir}/hyprland.conf";
      colorsContent = builtins.readFile "${hyprDir}/colors.conf";

      # Function to split binds content into a list of strings
      splitBinds = binds:
        if binds == "" then [] else lib.strings.splitString "\n" binds;

      # Split existing binds and new binds into lists
      existingBindsList = splitBinds bindsContent;
      newBindsList = [
        "bind = SUPER, 1, split:workspace, 1"
        "bind = SUPER, 2, split:workspace, 2"
        "bind = SUPER, 3, split:workspace, 3"
        "bind = SUPER, 4, split:workspace, 4"
        "bind = SUPER, 5, split:workspace, 5"
        "bind = SUPER, 6, split:workspace, 6"

        "bind = SUPER SHIFT, 1, split:movetoworkspacesilent, 1"
        "bind = SUPER SHIFT, 2, split:movetoworkspacesilent, 2"
        "bind = SUPER SHIFT, 3, split:movetoworkspacesilent, 3"
        "bind = SUPER SHIFT, 4, split:movetoworkspacesilent, 4"
        "bind = SUPER SHIFT, 5, split:movetoworkspacesilent, 5"
        "bind = SUPER SHIFT, 6, split:movetoworkspacesilent, 6"
        "bind = SUPER, Z, movefocus, l"
        "bind = SUPER, X, movefocus, r"

        "bind = $mainMod SHIFT, j , movewindow, l"
        "bind = $mainMod SHIFT, k , movewindow, r"
        "bind = SUPER SHIFT , X, split:swapactiveworkspaces, current +1"
        "bind = SUPER SHIFT , X, split:swapactiveworkspaces, current +1"
        "bind = SUPER, G, split:grabroguewindows"
      ];

      # Combine the lists
      combinedBinds = builtins.concatStringsSep "\n" (existingBindsList ++ newBindsList);
    in ''
      # Hyprland Configuration
      ${hyprlandContent}

      # Colors
      ${colorsContent}

      # Plugin Configuration
      plugin {
        hyprsplit {
          num_workspaces = 6
        }
        dynamic-cursors {
          enabled = true
          mode = none
          shake {

        enabled = true

        nearest = true

        threshold = 5.0

        base = 4.0
        speed = 4.0
        influence = 0.0

        limit = 0.0

        timeout = 2000

      
        effects = false

        ipc = false
        }
         hyprcursor {
           nearest = 0
           enabled = true
          resolution = 0
          fallback = clientside
}
        }

      }

      # Binds
      ${combinedBinds}
    '';
}; 

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;
}