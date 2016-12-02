// ==UserScript==
// @name         ALF Face Hider
// @namespace    http://tampermonkey.net/
// @updateURL    https://github.com/MarkEstefanos/ALF-Face-hider/raw/master/ALF%20face%20hider.user.js
// @downloadURL  https://github.com/MarkEstefanos/ALF-Face-hider/raw/master/ALF%20face%20hider.user.js
// @version      0.1.2
// @description  Hides your face in our favorite learning platform
// @author       Mark Estefanos
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        https://seminar.minerva.kgi.edu/*
// @grant        none
// ==/UserScript==

waitForKeyElements ('a[href*="edit"]', getID);

var userID = 0;

function getID (jNode) {
    userID = $('a[href*="edit"]')[0].href.split('/')[4];
    addGlobalStyle('.video-home-for-user-id-' + userID + ' { opacity: 0; }');
    addGlobalStyle('.hovered-wrapper > .video-home-for-user-id-' + userID + ' { opacity: 1 !important; }');
    waitForKeyElements ('div[data-user-id="'+ userID + '"]', removeFromStage);
}


function removeFromStage (jNode) {
    $('div[data-user-id="' + userID + '"]').children().css("opacity", 0.01);
    $('div[data-user-id="' + userID + '"]').children().hover(function(){
        $(this).css("opacity", 1);
    }, function(){
        $(this).css("opacity", 0.01);
    });
    $('div[data-user-id="' + userID + '"]').css("background-color", '#284169');
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
