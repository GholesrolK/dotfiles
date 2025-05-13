export PATH=$HOME/.local/scripts/barscripts:$PATH
export PATH=$HOME/.local/scripts:$PATH

PS1='\[\e[32m\]\u@\h\[\e[0m\] > \[\e[34m\]\w\[\e[0m\] '
(cat ~/.cache/wal/sequences &)
alias wallpaper='$HOME/.local/scripts/newlook'
alias ls='ls --color=auto'
alias src='cd .local/src'
alias scrp='cd .local/scripts'
alias pullupg='cd /home/ahmed/Projects/Personal/Ghole/  && nix develop --command bash -c  "python gholeMain.py"'
alias conf='cd .config/'
alias craft='cd /home/ahmed/winGames/minecraft && steam-run java -jar SKlauncher-3.2.10.jar'
alias vpn='sudo openvpn --config /home/ahmed/gholeLaptop.ovpn '
alias zzz='heroic --enable-features=UseOzonePlatform --ozone-platform=x11'
alias update='cd ~/ginx && sudo nixos-rebuild switch --flake . '
alias cs2='function _foo(){ cd /home/Steam/cs2-ds/game/bin/linuxsteamrt64/ && ./cs2 -dedicated -usercon -console -secure -dev +map $1 +game_alias competitive ; };_foo'