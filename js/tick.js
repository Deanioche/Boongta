import * as API from './api.js'
import * as Visitor from './visitor.js';
import * as Slot from './slots.js';
import * as Tray from './tray.js';
import * as Docs from './docs.js'
import * as Objs from './objs.js'

const HEADER = {
    'Authorization': `${API.TOKEN}`,
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

    Docs.nick_name.classList.add('invisible');
    Docs.menu_panel.classList.add('game_over_panel');
    Docs.menu_panel.classList.remove('invisible');
    Docs.btn_start.removeEventListener("click", game_start);
    Docs.btn_start.innerText = `Restart`;
    Docs.btn_start.addEventListener("click", () => {
        location.reload();
    });

    fetch(API.URL, {
        method: 'POST',
        headers: HEADER,
        body: JSON.stringify({
            "records": [
                {
                    "fields": {
                        "Name": Objs.nick_name,
                        "score": Objs.money,
                        "play_time": tick / 10,
                        "visitor_cnt": Visitor._cnt,
                        "fish_sold": Objs.fish_sold,
                        "Date": new Date().toISOString()
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

    Objs.set_nick(Docs.nick_name.value);
    Docs.menu_panel.classList.add('invisible');
    Docs.slots.forEach((v, i) => {
        Slot.init_slot(i);
        v.addEventListener("click", Slot.active_slots);
    })

    interval = setInterval(_tick, 100);
}

function get_scores () {
    fetch(API.URL, {
        method: 'GET',
        headers: {
            'Authorization': `${API.TOKEN}`,
            'Content-type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const list = data.records;
            for (let i = 0; i < list.length && i < 5; i++)
            {
                Docs.score_list.children[i].innerText = `${list[i].fields.Name} ${list[i].fields.score} ${new Date(list[i].fields.Date).toISOString().split('T')[0]}
                `;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export {
    increase_time_limit,
    game_start,
    get_scores
};