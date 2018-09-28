import "./css/main.css";
import * as signalR from "@aspnet/signalr";
import { connect } from "tls";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime();


const connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();

connection.start().catch(err => document.write(err));
connection.on("messageReceived", (username2: string, message: string) => {

	let m = document.createElement("div");

	if (username.toString() === username2) {
		m.innerHTML = `<div class="message__author" style="color:red">${username2}</div><div style="color:red">${message}</div>`;
	}
	else {
		m.innerHTML = `<div class="message__author" style="color:blue">${username2}</div><div style="color:blue">${message}</div>`;
	}

	divMessages.appendChild(m);
	divMessages.scrollTop = divMessages.scrollHeight;
});

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
	if (e.keyCode === 13) {
		send();
	}
});

btnSend.addEventListener("click", send);

function send() {
	connection.send("newMessage", username, tbMessage.value).then(() => tbMessage.value = "");
}