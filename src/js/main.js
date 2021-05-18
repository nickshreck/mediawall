// Liquid Import:
import * as Liquid from '../../../liquid/src/js/main.js'

// Project Import:
import * as Project from '../../../tdf/src/js/project.js'


import * as Oracle from '../../../oracle/src/js/main.js'

import * as Socket from './utils/socket.js';

import { instruct } from '../../../titan/src/js/main'

import { animateToGroup } from '../../../carousel/src/js/main'

import { zoomTo } from '../../../elevation/src/js/main'

Liquid.init(Project);
Liquid.loadPage("main");

function loadPage(page, data){

    Liquid.loadPage(page, data)

}

function titan(data){

    instruct(data.camera);

}

function elevation(data){

    zoomTo(data);

}

function carousel(data){

    animateToGroup(data.count, data.time);

}

export { loadPage, titan, elevation, carousel }