import { Union, Record } from "./fable_modules/fable-library-js.4.16.0/Types.js";
import { union_type, record_type, int32_type } from "./fable_modules/fable-library-js.4.16.0/Reflection.js";
import { Cmd_map, Cmd_batch, Cmd_none } from "./fable_modules/Fable.Elmish.4.1.0/cmd.fs.js";
import { ofArray } from "./fable_modules/fable-library-js.4.16.0/List.js";
import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.1.0/program.fs.js";
import { printf, toConsole } from "./fable_modules/fable-library-js.4.16.0/String.js";

export class Counter_Model extends Record {
    constructor(count) {
        super();
        this.count = (count | 0);
    }
}

export function Counter_Model_$reflection() {
    return record_type("Browser.Counter.Model", [], Counter_Model, () => [["count", int32_type]]);
}

export function Counter_init() {
    return [new Counter_Model(0), Cmd_none()];
}

export class Counter_Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Increment", "Decrement"];
    }
}

export function Counter_Msg_$reflection() {
    return union_type("Browser.Counter.Msg", [], Counter_Msg, () => [[], []]);
}

export function Counter_update(msg, model) {
    if (msg.tag === 1) {
        return [new Counter_Model(model.count - 1), Cmd_none()];
    }
    else {
        return [new Counter_Model(model.count + 1), Cmd_none()];
    }
}

export class Model extends Record {
    constructor(top, bottom) {
        super();
        this.top = top;
        this.bottom = bottom;
    }
}

export function Model_$reflection() {
    return record_type("Browser.Model", [], Model, () => [["top", Counter_Model_$reflection()], ["bottom", Counter_Model_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Reset", "Top", "Bottom"];
    }
}

export function Msg_$reflection() {
    return union_type("Browser.Msg", [], Msg, () => [[], [["Item", Counter_Msg_$reflection()]], [["Item", Counter_Msg_$reflection()]]]);
}

export function init() {
    const patternInput = Counter_init();
    const topCmd = patternInput[1];
    const top = patternInput[0];
    const patternInput_1 = Counter_init();
    const bottomCmd = patternInput_1[1];
    const bottom = patternInput_1[0];
    return [new Model(top, bottom), Cmd_batch(ofArray([Cmd_map((Item) => (new Msg(1, [Item])), topCmd), Cmd_map((Item_1) => (new Msg(2, [Item_1])), bottomCmd)]))];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const msg$0027 = msg.fields[0];
            const patternInput_2 = Counter_update(msg$0027, model.top);
            const res = patternInput_2[0];
            const cmd = patternInput_2[1];
            return [new Model(res, model.bottom), Cmd_map((Item_2) => (new Msg(1, [Item_2])), cmd)];
        }
        case 2: {
            const msg$0027_1 = msg.fields[0];
            const patternInput_3 = Counter_update(msg$0027_1, model.bottom);
            const res_1 = patternInput_3[0];
            const cmd_1 = patternInput_3[1];
            return [new Model(model.top, res_1), Cmd_map((Item_3) => (new Msg(2, [Item_3])), cmd_1)];
        }
        default: {
            const patternInput = Counter_init();
            const topCmd = patternInput[1];
            const top = patternInput[0];
            const patternInput_1 = Counter_init();
            const bottomCmd = patternInput_1[1];
            const bottom = patternInput_1[0];
            return [new Model(top, bottom), Cmd_batch(ofArray([Cmd_map((Item) => (new Msg(1, [Item])), topCmd), Cmd_map((Item_1) => (new Msg(2, [Item_1])), bottomCmd)]))];
        }
    }
}

export function view(model, dispatch) {
    throw 1;
}

ProgramModule_run(ProgramModule_mkProgram(init, update, (model_1, _arg) => {
    toConsole(printf("%A\n"))(model_1);
}));

