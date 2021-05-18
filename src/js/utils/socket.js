// MediaWall Import
import * as MediaWall from '../main.js'

// let socket = new WebSocket("wss://connect.ntt.media/websocket/");

let socket = new WebSocket("ws://localhost:6969/");

socket.onopen = function (event) {
    // send({ nick: 'nick is cool', redigan: 'redigan is cool too'});
};

function send(data){

    socket.send(JSON.stringify(data));

}

function receive(data){

    if(data.page)
    MediaWall.loadPage(data.page, data);

    if(data.app == 'titan')
    MediaWall.titan(data);

    if(data.app == 'carousel')
    MediaWall.carousel(data);

    if(data.app == 'elevation')
    MediaWall.elevation(data);

}

socket.onmessage = function (event) {

    receive(JSON.parse(event.data));

}

export { send }