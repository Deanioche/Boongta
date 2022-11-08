import {AIRTABLE_TOKEN, AIRTABLE_URL} from './api.js'
import * as Visitor from './visitor.js';
import * as Slot from './slots.js';
import * as Tray from './tray.js';
import * as Docs from './docs.js'
import * as Objs from './objs.js'

const HEADER = {
    'Authorization': `${AIRTABLE_TOKEN}`,
    'Content-type': 'application/json'
};

// time 0 ~ 60sec, default = 30000 == 30sec
let time_limit = 0;
let tick = 0;
let interval;

function increase_time_limit(time) {
    time_limit += time * 1000;
}

function game_over() {

    clearInterval(interval);

    Docs.menu_panel.classList.add('game_over_panel');
    Docs.menu_panel.classList.remove('invisible');
    Docs.btn_start.removeEventListener("click", game_start);
    Docs.btn_start.innerText = `Restart`;
    Docs.btn_start.addEventListener("click", () => {
        location.reload();
    });

    console.log(AIRTABLE_TOKEN)
    console.log(AIRTABLE_URL)
    fetch(AIRTABLE_URL, {
        method: 'POST',
        headers: HEADER,
        body: JSON.stringify({
            "records": [
                {
                    "fields": {
                        "Name": "haha",
                        "score": Objs.money,
                        "play_time": tick / 10,
                        "visitor_cnt": Visitor._cnt,
                        "fish_sold": Objs.fish_sold
                    }
                }
            ]
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function time_flow() {

    if (time_limit <= 0)
        game_over();

    increase_time_limit(-0.1);
}


function _tick() {
    Docs.tick_txt.innerText = `⏰ ${Math.floor(time_limit / 1000)}`;
    Docs.time_gauge.style.width = `${(time_limit) / 60000 * 100}%`;
    Docs.money.innerText = `${Objs.money}`;

    Visitor._new_visitor(tick);

    Slot.cooking();
    Slot.render();
    Visitor.render();
    Tray.render();

    time_flow();
    tick++;
}

function game_start() {
    Docs.menu_panel.classList.add('invisible');
    Docs.slots.forEach((v, i) => {
        Slot.init_slot(i);
        v.addEventListener("click", Slot.active_slots);
    })

    interval = setInterval(_tick, 100);
}

export {
    increase_time_limit,
    game_start
};