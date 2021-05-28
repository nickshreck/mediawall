// MediaWall Import
import * as MediaWall from '../main.js'

let socket;

function connect(){

    socket = new WebSocket(MediaWall.settings.websocket);

    socket.onopen = function (event) {
        send({ mediawall: 'connected' });
    };

    socket.onmessage = function (event) {

        receive(JSON.parse(event.data));
    
    }

}

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

export { connect, send }