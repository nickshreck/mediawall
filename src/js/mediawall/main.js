// Liquid Import:
import * as Liquid from '../liquid/main.js'

import * as Socket from './utils/socket.js';


Liquid.loadPage("main");

function loadPage(page){

    switch(page){

        case ('title'):
            Liquid.loadPage('title')
            break;

        case ('podium'):
            Liquid.loadPage('podium')
            break;

        case ('riderprofile'):
            Liquid.loadPage('riderprofile')
            break;
    

        default:
            break;
            
    }


}

export { loadPage }