import * as Docs from './docs.js'
import * as Objs from './objs.js'

const FIRE_POWER = [60, 100, 60, 100, 250, 100, 100, 250, 100, 60, 100, 60];
const COOK_TIME = 10000;
const RGB = [255, 240, 220];
const RGB_just_started = `rgb(255, 240, 220)`;
const RGB_empty_slot = `rgb(111, 128, 144)`;

let fish_cnt = 0;

function init_slot(i) {
    Objs.set_slot(i, {
        "is_cooking": false,
        "work_left": COOK_TIME,
        "FIRE_POWER": FIRE_POWER[i],
        "rgd": RGB,
    });
}

function reset_slot(i) {

    init_slot(i);
    Docs.slots[i].style.background = RGB_empty_slot;
    Docs.slots[i].innerText = `🐡`;
}

function cooking() {
    for (let i = 0; i < Docs.slots.length; i++) {
        if (Objs.slots[i].is_cooking == false)
            continue;
        Objs.slots[i].work_left -= Objs.slots[i].FIRE_POWER;
        Objs.slots[i].rgb = [
            255,
            RGB[1] - (90 - Objs.slots[i].work_left / 100),
            RGB[2] / 100 * Objs.slots[i].work_left / 100
        ];
        if (Objs.slots[i].work_left < -2000) {
            Objs.slots[i].rgb = [80, 50, 50];
        }
    }
}

function move_to_tray(slot) {

    let quality = 0;
    if (Math.abs(slot.work_left) < 100)
        quality = 2;
    else if (Math.abs(slot.work_left) < 1000)
        quality = 1;

    Objs.add_tray({
        "id": fish_cnt++,
        "quality": quality,
        "price": 100 * quality,
        "rgb": slot.rgb,
        "rendered": false
    });
}

function active_slots() {
    // to util func
    let i = this.getAttribute("id").split('_')[1];

    if (Objs.slots[i].is_cooking == true) {
        move_to_tray(Objs.slots[i]);
        reset_slot(i);
        return;
    }

    if (Objs.money < 50) {
        Docs.money.classList.add('blink');
        setTimeout(() => {
            Docs.money.classList.remove('blink');
        }, 1000);
        return;
    }

    Objs.add_money(-50);
    Objs.slots[i].is_cooking = true;
    this.style.background = RGB_just_started;
    Objs.slots[i].work_left = COOK_TIME;
}

function get_slot_rgb(i) {
    return `rgb(${Objs.slots[i].rgb[0]}, ${Objs.slots[i].rgb[1]}, ${Objs.slots[i].rgb[2]})`;
}

function render() {
    for (let i = 0; i < Docs.slots.length; i++) {
        if (Objs.slots[i].is_cooking == false)
            continue;
        Docs.slots[i].innerText = (Objs.slots[i].work_left / 100).toFixed(1);
        Docs.slots[i].style.background = get_slot_rgb(i);
    }
}

export {
    RGB,
    active_slots,
    reset_slot,
    init_slot,
    cooking,
    get_slot_rgb,
    render
}; 