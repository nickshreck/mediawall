// MediaWall Import
import * as MediaWall from '../main.js'

let socket = new WebSocket("ws://localhost:443");

socket.onopen = function (event) {
    send({ nick: 'nick is cool', redigan: 'redigan is cool too'});
};

function send(data){

    socket.send(JSON.stringify(data));

}

function receive(data){

    console.log(data);

    MediaWall.loadPage(data.page);

}

socket.onmessage = function (event) {

    receive(JSON.parse(event.data));

}

export { send }