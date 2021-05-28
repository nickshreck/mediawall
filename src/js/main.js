// Liquid Import
import * as Liquid from '../../../liquid/src/js/main.js'

// Project Import
import * as Project from '../../../tdf/src/js/project.js'

// Oracle Import
import * as Oracle from '../../../oracle/src/js/main.js'

// Utils
import * as Socket from './utils/socket.js';

// Apps
import { instruct } from '../../../titan/src/js/main'
import { animateToGroup } from '../../../carousel/src/js/main'
import { zoomTo } from '../../../elevation/src/js/main'

let settings = {
    websocket: 'wss://connect.ntt.media/websocket/'
}

// Startup:
Socket.connect();
Liquid.init(Project);
Liquid.loadPage("main");


// MediaWall Functions

function loadPage(page, data){

    // Liquid.loadPage(page, data)
    Liquid.changePage(page, data)

}

// App Functions

function titan(data){

    instruct(data.camera);

}

function elevation(data){

    zoomTo(data);

}

function carousel(data){

    animateToGroup(data.count, data.time);

}

export { loadPage, titan, elevation, carousel, settings }