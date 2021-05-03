import * as API from './utils/api.js';
import * as Director from './director.js';

function send(message){
    
    API.send(message);

}

function receive(message){

    console.log('switchboard', 'receive', message);

    Director.display(message.page, message.data);

}

export {send, receive}