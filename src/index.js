"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@aspnet/signalr");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var username = new Date().getTime();
var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
connection.start().catch(function (err) { return document.write(err); });
connection.on("messageReceived", function (username2, message) {
    var m = document.createElement("div");
    if (username.toString() === username2) {
        m.innerHTML = "<div class=\"message__author\" style=\"color:red\">" + username2 + "</div><div style=\"color:red\">" + message + "</div>";
    }
    else {
        m.innerHTML = "<div class=\"message__author\" style=\"color:blue\">" + username2 + "</div><div style=\"color:blue\">" + message + "</div>";
    }
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});
tbMessage.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    connection.send("newMessage", username, tbMessage.value).then(function () { return tbMessage.value = ""; });
}
