nohup node ./account_server/app.js ../configs_win.js >> logs/account_server.log &
nohup node ./hall_server/app.js ../configs_win.js >> logs/hall_server.log &
nohup node ./game_server/app.js ../configs_win.js >> logs/game_server.log &