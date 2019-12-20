var HALL_IP = "112.74.43.192";
//var HALL_IP = "172.17.104.51";
var HALL_CLIENT_PORT = 9001;
var HALL_ROOM_PORT = 9002;

var ACCOUNT_PRI_KEY = "^&*#$%()@";
var ROOM_PRI_KEY = "~!@#$(*&^%$&";

var LOCAL_IP = 'localhost';

exports.mysql = function(){
	return {
		HOST:'127.0.0.1',
		USER:'root',
		PSWD:'cyEllis@129.',
		DB:'db_babykylin',
		PORT:3306,
	}
}

//账号服配置
exports.account_server = function(){
	return {
		CLIENT_PORT:9000,
		HALL_IP:HALL_IP,   // 192.168.0.104
		HALL_CLIENT_PORT:HALL_CLIENT_PORT, //9001
		ACCOUNT_PRI_KEY:ACCOUNT_PRI_KEY,
		
		//
		DEALDER_API_IP:LOCAL_IP,  //localhost
		DEALDER_API_PORT:12581,
		VERSION:'20161227',
		APP_WEB:'http://fir.im/2f17',
	};
};

//大厅服配置
exports.hall_server = function(){
	return {
		HALL_IP:HALL_IP,  //192.168.0.104
		CLEINT_PORT:HALL_CLIENT_PORT, //9001
		FOR_ROOM_IP:LOCAL_IP, //localhost
		ROOM_PORT:HALL_ROOM_PORT,  //9002
		ACCOUNT_PRI_KEY:ACCOUNT_PRI_KEY,
		ROOM_PRI_KEY:ROOM_PRI_KEY
	};
};

//游戏服配置
exports.game_server = function(){
	return {
		SERVER_ID:"001",
		
		//暴露给大厅服的HTTP端口号
		FOR_HALL_HTTP_PORT:9003,

		//HTTP TICK的间隔时间，用于向大厅服汇报情况
		HTTP_TICK_TIME:5000,
		//大厅服IP
		HALL_IP:LOCAL_IP, //localhost
		FOR_HALL_IP:LOCAL_IP, //localhost
		//大厅服端口
		HALL_PORT:HALL_ROOM_PORT,  //9002
		//与大厅服协商好的通信加密KEY
		ROOM_PRI_KEY:ROOM_PRI_KEY,
		
		//暴露给客户端的接口
		CLIENT_IP:HALL_IP,  //192.168.0.104
		CLIENT_PORT:10000,
	};
};