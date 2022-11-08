import * as Tick from './js/tick.js'
import * as Docs from './js/docs.js'
import * as Objs from './js/objs.js'

function init_game() {
    Tick.increase_time_limit(30);
    Objs.add_money(500);
    Tick.get_scores();

    Docs.nick_name.addEventListener("input", () => {
        if (Docs.nick_name.value.length > 2)
            Docs.btn_start.classList.remove('invisible');
        else
            Docs.btn_start.classList.add('invisible');
    });

}

window.onload = () => {
    init_game();
    Docs.btn_start.addEventListener("click", Tick.game_start);
}
