var select = null; //セレクトボックスの選択肢を格納するもの
var connectionId = 0;
var selctedPort = null;
var reading = false;
var data = "";
var id = 0;
var CORRECTION = 0.5;

var dataBuf  =[];
var stringBuf = [];
var arrayReceived = [];

function convertArrayBufferToString(buf){
	var bufView = new Uint8Array(buf);
	var encodedString = String.fromCharCode.apply(null,bufView);
	return decodeURIComponent(escape(encodedString));
}

function init(){
	select = document.getElementById('ports');

	document.getElementById('open').addEventListener('click',openPort);
	document.getElementById('close').addEventListener('click',closePort);
	document.getElementById('clear').addEventListener('click',function(){
		document.getElementById('textRead').value = '';
	});

	chrome.serial.getDevices(function(devices){
		devices.forEach(function(port){	

		//select menuに追加
			var option = document.createElement('option');
			option.value = port.path;
			option.text = port.displayName ? port.displayName : port.path;
			select.appendChild(option);
		});
	});
	
}

var onConnectCallback = function(connectionInfo){
	connectionId = connectionInfo.connectionId;
}

function openPort(){
	selectedPort = select.childNodes[select.selectedIndex].value;
	var baudRate = parseInt(document.getElementById('baud').value);
	var options = {
		"bitrate":baudRate,
		"receiveTimeout":1000
	};

	chrome.serial.connect(selectedPort,options,onConnectCallback);

}

var onDisconnectionCallback = function(result){
	if(result){
		console.log('disconeccted');
	}else{
		console.log('error');
	}
}


function closePort(){

	var disconnect = chrome.serial.disconnect(connectionId,onDisconnectionCallback);
	console.log(stringBuf);
}


var onReceiveCallback = function(info){
	if(info.connectionId == connectionId && info.data){
		var str = convertArrayBufferToString(info.data);

		console.log(str);
		//シリアル通信はちゃんと数字列でデータが飛んで来るとは限らない（空白とか、数字のみとかの可能性がある）
		for(var i = 0; i < str.length;i++){
			if(str[i] == ','){
				var str2 = dataBuf.join('');
				//stringBuf.push(str2);
				document.getElementById('textRead').value += str2 + '\n';
				chart = $("#graph_area").highcharts();
				if(chart.series[0].data.length > 60){
					chart.series[0].data[0].remove();
				}
				var value = parseInt(str2);


				chart.series[0].addPoint(value);

				dataBuf = [];
			}else{
				dataBuf.push(str[i]);
			}
		}
	}
};
chrome.serial.onReceive.addListener(onReceiveCallback);



var onReceiveErrorCallback = function(info){
	console.log('onReceiveErrorCallback');
}
chrome.serial.onReceiveError.addListener(onReceiveErrorCallback);


window.onload = init;