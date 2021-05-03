// Liquid Import
import * as Liquid from '../../../liquid/main.js'

// Project Imports
import * as Project from '../project.js';
import * as Data from '../data.js';

// Pages Import
import * as Pages from '../pages.js'

// Utils Import
import $ from "jquery";

// Timeline

let details = { video: '', pageTitle: '', line1:-1, line2:-1, line3:-1, line4:-1 };

let timeline = {};

timeline.main =[
    {'func': anims, 'obj':'load-main', 'time':10}
];

// Animations

function anims(step, data=null){

    switch(step){

        case 'load-main':
            Liquid.loadTemplate('main.html', 'liquid-container');
            break;

        case 'load-page':
            Liquid.loadTemplate(Liquid.pages.current + '-content.html', 'page-content', Project.pageTemplate);
            break;

    }

}

// Data

export { details, timeline, anims }