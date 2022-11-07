const slots = document.querySelectorAll(".slot");
const trays = document.querySelector(".tray_panel");
const money = document.querySelector(".money span");

// Menu
const menu_panel = document.querySelector("#menu_panel");
const btn_start = document.querySelector(".btn_start");

// tick
const tick_txt = document.querySelector(".tick span");
const time_gauge = document.querySelector(".tick .gauge");

// visitor
function visitor_char(i) {
    return document.querySelector(`#visitor_${i} char`);
}
function visitor_demand(i) {
    return document.querySelector(`#visitor_${i} demand`);
}

export {
    menu_panel,
    btn_start,
    money,
    slots,
    tick_txt,
    trays,
    time_gauge,
    visitor_char,
    visitor_demand
}