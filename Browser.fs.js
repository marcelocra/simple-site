import { Union, Record } from "./fable_modules/fable-library-js.4.16.0/Types.js";
import { union_type, record_type, class_type } from "./fable_modules/fable-library-js.4.16.0/Reflection.js";
import { now, minValue } from "./fable_modules/fable-library-js.4.16.0/Date.js";
import { singleton, empty } from "./fable_modules/fable-library-js.4.16.0/List.js";
import { ProgramModule_mkProgram, ProgramModule_withSubscription, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { printf, toConsole } from "./fable_modules/fable-library-js.4.16.0/String.js";

export class Model extends Record {
    constructor(current) {
        super();
        this.current = current;
    }
}

export function Model_$reflection() {
    return record_type("Browser.BasicTimer.Model", [], Model, () => [["current", class_type("System.DateTime")]]);
}

export class Msg extends Union {
    constructor(Item) {
        super();
        this.tag = 0;
        this.fields = [Item];
    }
    cases() {
        return ["Tick"];
    }
}

export function Msg_$reflection() {
    return union_type("Browser.BasicTimer.Msg", [], Msg, () => [[["Item", class_type("System.DateTime")]]]);
}

export function init() {
    return [new Model(minValue()), empty()];
}

export function update(msg, model) {
    const current = msg.fields[0];
    return [new Model(current), empty()];
}

export function timer(onTick) {
    const start = (dispatch) => {
        const intervalId = setInterval(() => {
            dispatch(onTick(now()));
        }, 1000) | 0;
        return {
            Dispose() {
                clearInterval(intervalId);
            },
        };
    };
    return start;
}

export function subscribe(model) {
    return singleton([singleton("timer"), timer((Item) => (new Msg(Item)))]);
}

ProgramModule_run(ProgramModule_withSubscription(subscribe, ProgramModule_mkProgram(init, update, (model_1, _arg) => {
    toConsole(printf("%A\n"))(model_1);
})));

