import * as signalR from "@microsoft/signalr";
import * as Switchboard from '../switchboard.js';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://127.0.0.1:5000/signalr")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("connected");
    } catch (err) {
        console.log(err);
        // setTimeout(() => start(), 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// connection.start()
// .then(() => send('Insight Connected'));

function send(message){

    connection.invoke("SendMessage", message)

}

connection.on("ReceiveMessage", (message) => { 

    Switchboard.receive( message );

    // console.log('ReceiveMessage', message)

});

export { start, send };