// Engine Imports:
import * as Liquid from '../../liquid/main.js'

// Project Imports:
import * as Pages from './pages.js'
import * as Data from './data.js'

// Util Imports:
import $ from "jquery";

// Settings & Variables

let locations = {
    templates : "http://localhost:2000/mediawall/projects/tdf/templates/",
    styles : "http://localhost:2000/mediawall/projects/tdf/styles/",
    files : "http://localhost:2000/mediawall/projects/tdf/files/"
}

// Functions

function pageTemplate() {

    if (pageTitleLocked) {
        pageTitleQueued = true;
        return;
    }

    pageTitleLocked = true;
    pageTitleQueued = false;

    var details = Liquid.getPageDetails();

    // Step 0: Take Playing layer and move it to Fade layer
    $(".page-title-text").addClass("switch");
    $(".page-title-text")
        .toggleClass("page-title-load-to-show")
        .toggleClass("page-title-show-to-fade");

    $(".page-title-load-to-show").text(details.pageTitle);

    $(".page-title-shadow").addClass("switch");
    $(".page-title-shadow").text(details.pageTitle);

    setLines(Liquid.pages.current, details);

    pageTitleFade = setTimeout(function () {
        pageTitleLocked = false;
        $(".page-title-show-to-fade").text("");
        // $('.page-title-text').removeClass('switch');
        $(".page-title-shadow").removeClass("switch");
        if (pageTitleQueued) {
            pageTemplate();
        }
    }, 1000);
}

function loadVideo() {
    // console.log('loadVideo', 'video', '--------->', 'videoLocked:', videoLocked, 'videoLoading:', videoLoading, 'Pages.current:', Pages.current, 'Pages.previous:', Pages.previous);
    // console.log('loadVideo', 'video', 'video-playing-to-fade', $('.video-playing-to-fade').css('display'), $('.video-playing-to-fade').css('opacity'), $('.video-playing-to-fade').attr('src'));
    // console.log('loadVideo', 'video', 'video-load-to-playing', $('.video-load-to-playing').css('display'), $('.video-load-to-playing').css('opacity'), $('.video-load-to-playing').attr('src'));

    if (videoLocked || videoLoading) {
        videoQueue = true;
        return;
    }

    var details = Liquid.getPageDetails();
    var videoFile =
        locations.files + details.video + "-background.mp4";

    videoLoading = true;
    videoLocked = true;
    videoQueue = false;

    // Step 0: Take Playing layer and move it to Fade layer
    $(".video-bg").addClass("switch");
    $(".video-bg")
        .toggleClass("video-load-to-playing")
        .toggleClass("video-playing-to-fade");

    // Step 1: Load video into video-load layer
    $(".video-playing-to-fade").attr("id", "");
    $(".video-load-to-playing").attr("id", "video-load");

    video = document.getElementById("video-load");
    video.removeEventListener("loadeddata", arguments.callee);
    video.src = videoFile;
    video.load();

    video.addEventListener(
        "loadeddata",
        function () {
            videoLoading = false;

            // console.log('videoLoaded', 'video', '--------->', 'videoLocked:', videoLocked, 'videoLoading:', videoLoading, 'Pages.current:', Pages.current, 'Pages.previous:', Pages.previous);
            // console.log('videoLoaded', 'video', 'video-playing-to-fade', $('.video-playing-to-fade').css('display'), $('.video-playing-to-fade').css('opacity'), $('.video-playing-to-fade').attr('src'));
            // console.log('videoLoaded', 'video', 'video-load-to-playing', $('.video-load-to-playing').css('display'), $('.video-load-to-playing').css('opacity'), $('.video-load-to-playing').attr('src'));

            // Video is loaded and can be played

            // console.log('video is loaded', video.buffered, video.duration, video.src);
            this.removeEventListener("loadeddata", arguments.callee);

            videoFade = setTimeout(function () {
                switchVideo();
            }, 1000);

            changeBackgrounds();

            video.play();

            $(".video-bg").removeClass("switch");
        },
        false
    );
}

function switchVideo() {
    console.log(
        "switchVideo", "video", "--------->", 
        "videoLocked:",
        videoLocked,
        "videoLoading:",
        videoLoading,
        "Pages.current:",
        Liquid.pages.current,
        "Pages.previous:",
        Liquid.pages.previous
    );
    console.log(
        "switchVideo",
        "video",
        "video-playing-to-fade",
        $(".video-playing-to-fade").css("display"),
        $(".video-playing-to-fade").css("opacity"),
        $(".video-playing-to-fade").attr("src")
    );
    console.log(
        "switchVideo",
        "video",
        "video-load-to-playing",
        $(".video-load-to-playing").css("display"),
        $(".video-load-to-playing").css("opacity"),
        $(".video-load-to-playing").attr("src")
    );

    videoLocked = false;

    clearTimeout(videoFade);

    $(".video-playing-to-fade").attr("id", "video-destroy");

    var videoDestroy = document.getElementById("video-destroy");
    videoDestroy.pause();
    videoDestroy.src = ""; // empty source
    videoDestroy.load();

    if (videoQueue) {
        videoQueue = false;
        loadVideo();
    }
}

function waitForVideo(time) {
    video.ontimeupdate = function () {
        if (this.currentTime >= time) {
            console.log("waitForVideo", this.currentTime);
            getNextTransition();
            this.ontimeupdate = null;
        }
    };
}

function changeBackgrounds() {

    var details = Liquid.getPageDetails();

    console.log("changeBackgrounds", Liquid.pages.current, Liquid.pages.previous);

    $(".background-image").removeClass("active");

    if (details.background == undefined) {
        return;
    }

    if ($("." + details.background).length) {
    } else {
        $(".app-container").append(
            '<div class="' +
            details.background +
                ' background-image"></div>'
        );
    }

    $("." + details.background).addClass("active");

}

function setLines(page, details) {
    console.log("setLines", page, details);

    $(".stats-line-1").clearQueue();
    $(".stats-line-2").clearQueue();
    $(".stats-line-3").clearQueue();
    $(".stats-line-4").clearQueue();

    $(".stats-line-1")
        .css("left", details["line1"])
        .animate({ left: details["line1"] }, "fast");
    $(".stats-line-2")
        .css("left", details["line2"])
        .animate({ left: details["line2"] }, "fast");
    $(".stats-line-3")
        .css("left", details["line3"])
        .animate({ left: details["line3"] }, "fast");
    $(".stats-line-4")
        .css("left", details["line4"])
        .animate({ left: details["line4"] }, "fast");
}

function initPauseButton() {
    $(".play-control").fadeIn(1000);

    $(".play-control").click(function () {
        if (Liquid.Timeline.pause) {
            Liquid.Timeline.pause = false;
            Liquid.Timeline.resumeAnimations("pause");
            $(".play-control").toggleClass("paused");
            video.play();
        } else {
            Liquid.Timeline.pause = true;
            Liquid.Timeline.pauseAnimations();
            $(".play-control").toggleClass("paused");
            video.pause();
        }
    });
}

export { Pages, Data, initPauseButton, pageTemplate, loadVideo, setLines, waitForVideo, locations }