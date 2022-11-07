import * as Objs from './objs.js'
import * as Docs from './docs.js'
import * as Tick from './tick.js'

const VISITOR_CHAR = ['😈', '🤡', '🥱', '😵‍💫', '👨‍🦳', '🙋‍♂️', '🙋🏻‍♀️', '👷', '🤵🏻‍♂️', '👻'];

let _queue = [];
let _cnt = 0;
let last_visit_time = Number((Math.random() * 50).toFixed(0));

function sell_fish() {
    // 벌금? 점수 -?
    if (_queue.length == 0) {
        console.log(`no one to sell`);
        return;
    }
    let tray_id = this.id.split('_')[1];
    let idx = -1;

    // find로 고쳐보기
    for (let i = 0; i < Objs.tray.length; i++)
        if (Objs.tray[i].id == tray_id) {
            idx = i;
            break;
        }

    if (Objs.tray[idx].price == 0) {
        console.log(`price 0 can't be sold`)
        return;
    }

    Objs.add_money(Objs.tray[idx].price);
    Tick.increase_time_limit(Objs.tray[idx].quality)
    update_visitor();
    Objs.increase_sold_cnt();

    Objs.tray.splice(idx, 1);
    this.remove();
}

function set_frequency()
{
    return Number((Math.random() * 150 - Math.min(_cnt * 5, 100)).toFixed(0));
}

function _new_visitor(_tick) {
    if (_queue.length >= 5) {
        last_visit_time = _tick + 30;
        return;
    }

    if (_tick - last_visit_time > 0) {
        _queue.push({
            "_cnt": _cnt++,
            "visit_time": _tick,
            "char": VISITOR_CHAR[Math.floor(Math.random() * 100) % VISITOR_CHAR.length],
            "demand": Math.floor(Math.random() * 100) % 3 + 1,
            "has_update": true
        });
        last_visit_time = _tick + set_frequency();
    }
}

function update_visitor() {
    _queue[0].demand--;
    _queue[0].has_update = true;
    for (let i = 0; i < 5; i++) {
        Docs.visitor_char(i).innerText = ``;
        Docs.visitor_demand(i).innerText = ``;
        if (_queue[i])
            _queue[i].has_update = true;
    }
    if (_queue[0]?.demand < 1) {
        _queue.shift();
        Tick.increase_time_limit(5);
    }

}

function render() {
    for (let i = 0; i < 5; i++) {
        // ?. null check
        if (_queue[i]?.has_update == true) {
            Docs.visitor_char(i).innerText = `${_queue[i].char}`;
            Docs.visitor_demand(i).innerText = `${_queue[i].demand}`;
            _queue[i].has_update = false;
        }
    }
}

export {
    _cnt,
    _queue,
    _new_visitor,
    sell_fish,
    render
};