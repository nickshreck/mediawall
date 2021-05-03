let socket;

function websocketRegister(callback){

    socket = callback;

    let wsSubscription = {
        topic: 'custom',
        callback: 'websocketReceived' ,
        payload: {
            channel: 'mediawall'
        }
    };

    FOCUS_UTILS.iframe.websocket.subscribe(wsSubscription);

    console.log('subscribing to websocket', wsSubscription, FOCUS_UTILS, callback);

}

function websocketReceived(payload) {

	try{
        setTimeout(socket(payload), 10)
        console.log('websocket received', payload);
    }catch(e){
        console.log('websocket receive failed', e);
    }

}