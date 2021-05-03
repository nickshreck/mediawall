import * as Main from './main.js'

let pause = null;

var currentTransition;
var currentTransitionCount = 0;
var totalTransitionCount = 0;
var animations = [];
var currentBlock = null;

// Timeline Functions

function getTimelineContent(block) {

    // Page content has been loaded already

    // Get the current timeline:
    animations[block]= Main.timeline[block];

    console.log("getTimelineContent", Main.pages.current, Main.timeline, block, animations);

    currentBlock = block;

    currentTransitionCount = 0;

    getNextTransition();

}

function fireTransition(t) {
    console.log(
        "FireTransition",
        "---->",
        t.obj,
        t.func.name,
        "===",
        currentBlock,
        "<--------------------------------",
        // Data.data
    );
    // console.log('Data', data);

    if (Array.isArray(t.obj)) {
        t.func(t.obj[0], t.obj[1]);
    } else {
        t.func(t.obj);
    }
}

function getNextTransition() {
    // console.log('getNextTransition', '1', 'pause:', pause, 'Pages.current', Pages.current, 'currentTransitionCount:', currentTransitionCount, 'type:', type);

    if (pause) {
        return;
    }

    // console.log('getNextTransition', '2', 'pause:', pause, 'Pages.current', Pages.current, 'currentTransitionCount:', currentTransitionCount, 'type:', type);

    if (currentTransitionCount == null) {
        currentTransitionCount = 0;
    }

    var t = animations[currentBlock][currentTransitionCount];

    try {
        if (t.time) {
        }
    } catch (err) {
        console.log("getNextTransition", "no next transition available");
        return;
    }

    // console.log('getNextTransition', t, currentBlock, currentTransitionCount, currentTransition);

    // console.log('getNextTransition', '3', 'pause:', pause, 'Pages.current', Pages.current, 'currentTransitionCount:', currentTransitionCount, 'type:', type, 'object:', t);

    currentTransition = setTimeout(function () {
        currentTransitionCount++;

        clearTimeout(currentTransition);

        if (
            animations[currentBlock] != null &&
            currentTransitionCount < animations[currentBlock].length
        ) {
            // console.log('currentTransition', 'queueing getNextTransition', currentBlock, currentTransitionCount, animations[currentBlock].length)

            var templateLoad;

            try {
                templateLoad = t.obj.slice(0, 4);
            } catch (err) {}

            console.log("templateLoad", templateLoad, t.obj);

            if (templateLoad == "load") {
                // do Nothing;
            } else if (t.func.name == "waitForVideo") {
                // do Nothing;
            } else {
                getNextTransition();
            }
        } else {
            console.log(
                "not queueing getNextTransition",
                currentBlock,
                currentTransitionCount,
                animations[currentBlock].length
            );
        }

        // console.log('Firing Current Transition', currentBlock, currentTransitionCount, t);

        fireTransition(t);

        // console.log('Fired Current Transition', currentBlock, currentTransitionCount, t);
    }, t.time);

    // console.log('new transition', currentTransition, 'firing in', t.time);
}

function resumeAnimations(type) {
    getNextTransition();
}

function pauseAnimations() {
    // pause = true;
    clearTimeout(currentTransition);
}

function stopAnimations() {
    pause = true;
    clearTimeout(currentTransition);
}

document.addEventListener("visibilitychange", function () {
    console.log("Visibility Change", document.visibilityState, Main.pages.current);

    if (document.visibilityState == "hidden") {
        pauseAnimations();
    } else {
        resumeAnimations();
    }
});

export { getTimelineContent, getNextTransition, pause, resumeAnimations, pauseAnimations }