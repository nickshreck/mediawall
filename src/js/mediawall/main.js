// Liquid Import:
import * as Liquid from '../liquid/main.js'

import * as Socket from './utils/socket.js';


Liquid.loadPage("main");

function loadPage(page, data){

    switch(page){

        case ('title'):
            Liquid.loadPage('title', data)
            break;

        case ('podium'):
            Liquid.loadPage('podium', data)
            break;

        case ('riderprofile'):
            Liquid.loadPage('riderprofile', data)
            break;
    

        default:
            break;
            
    }


}

export { loadPage }