// MediaWall Import
import * as MediaWall from '../main.js'

// let socket = new WebSocket("wss://connect.ntt.media/websocket/");
console.log('hi mum')
let socket = new WebSocket("ws://localhost:6969/");

socket.onopen = function (event) {
    send({ nick: 'nick is cool', redigan: 'redigan is cool too'});
};

function send(data){

    socket.send(JSON.stringify(data));

}

function receive(data){

    console.log(data);

    MediaWall.loadPage(data.page, data);

}

socket.onmessage = function (event) {

    receive(JSON.parse(event.data));

}

export { send }