let slots = new Array(12);
let tray = [];
let money = 0;
let fish_sold = 0;

function add_tray(obj) {
    tray.push(obj);
}

function set_slot(i, obj) {
    slots[i] = obj;
}

function add_money(num) {
    money += num;
}

function increase_sold_cnt() {
    fish_sold++;
}

export { 
    set_slot, 
    add_money, 
    add_tray, 
    increase_sold_cnt,
    tray, 
    slots, 
    money, 
    fish_sold,
};