var socket = io('ws://10.1.49.24:8080/');
    var inputEntry= document.getElementById('sendMessage');
    /*
		根据用户的状态显示输入的消息
			entry: 用户在线
			message: 消息发送中
			leave: 用户已离开

    */
    function showMessage(type, str) {
        if (type == 'entry') {
            var div = '<div style="color:green"> ' + str + '</div>'
        } else if (type == 'message') {
            var div = '<div> ' + str + ' </div>'
        } else {
            var div = '<div style="color:red"> ' + str + '</div>'
        }
        inputEntry.insertAdjacentHTML("beforebegin", div);
    }
    var send= document.getElementById('send');

    send.onclick = function() {
    var text = document.getElementById('sendMessage').value;
        sendMessage(text);
    }
    inputEntry.onkeydown=function(event){
    	var e = event || window.event || arguments.callee.caller.arguments[0];
    	if(e.key=='Enter'){
    	var text = document.getElementById('sendMessage').value;
    		sendMessage(text);
    	}
    }
    /*
		向服务端发送用户输入的信息
    */
    function sendMessage(text){
    	if (text) {
            socket.emit("message", text);
            document.getElementById("sendMessage").value = "";
        }
    }
    socket.on('entry', function(data) {
        showMessage("entry", data);
    });
    socket.on('message', function(data) {
        console.log(data);
        showMessage('message', data);
    });
    socket.on("leave", function(data) {
        showMessage(data, "leave");
    })