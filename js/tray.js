import * as Docs from './docs.js'
import * as Visitor from './visitor.js';
import * as Objs from './objs.js'

function get_tray_rgb(i) {
    return `rgb(${Objs.tray[i].rgb[0]}, ${Objs.tray[i].rgb[1]}, ${Objs.tray[i].rgb[2]})`;
}

function render() {
    for (let i = 0; i < Objs.tray.length; i++) {
        if (Objs.tray[i].rendered == true)
            continue;
        let new_tray = document.createElement('div');
        new_tray.classList.add("tray");
        new_tray.style.background = get_tray_rgb(i);
        new_tray.id = `tray_${Objs.tray[i].id}`;
        new_tray.innerHTML = `🐡 ${Objs.tray[i].price}`;
        new_tray.addEventListener("click", Visitor.sell_fish);
        Docs.trays.appendChild(new_tray);
        Objs.tray[i].rendered = true;
    }
}

export {
    render, 
    get_tray_rgb
};