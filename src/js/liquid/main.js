// Engine Imports:
import * as Timeline from './timeline.js'

// Project Imports:
import * as Project from '../projects/tdf/project.js'

// Util Imports:
import * as Mustache from 'mustache';
import $ from "jquery";

// Settings & Variables

let pages = {
    current : null,
    previous: null
};

let timeline = {};

// Page Functions

function loadPage(page=false, data=false) {

    if(!page){
        return;
    }

    if (pages.current != null) {
        pages.previous = pages.current;
    }

    pages.current = page;

    console.log("loadPage", page, "---", pages.previous, pages.current, this);

    // loadStyle(page);

    Project.Data.setData(data.data);

    timeline = Project.Pages[pages.current].timeline;

    Timeline.getTimelineContent(page);

}

function getPageDetails() {

    let details;

    try {

        details = Project.Pages[pages.current].details;

    } catch (err) {
        console.log("pageTemplate", "no page details found",pages.current);
    }

    return details;
}

// Load Functions

async function loadTemplate(templateFile, div, callback) {

    let template = Project.locations.templates + templateFile;

    let data; // This needs to be populated.. if we want to be able to update the template

    let response = await fetch(template);
    let html = await response.text()

    let rendered = Mustache.render(html, Project.Data.data);

    console.log("loadTemplate", template, div, callback);

    $("." + div).html(rendered);

    if (callback != undefined) {
        try {
            callback();
        } catch (err) {
            console.log("processTemplate", "no callback", err);
        }
    }

    // All template loads will have paused animation timeline:
    console.log("processTemplate", "firing next transition");

    Timeline.getNextTransition();

}

function loadStyle(page) {

    var cssFile = Project.locations.styles + page + ".css";

    // Load CSS files:
    $("<link/>", {
        rel: "stylesheet", type: "text/css",
        href: cssFile,
    }).appendTo("head");

}

export { loadPage, getPageDetails, loadTemplate, Timeline, pages, timeline }