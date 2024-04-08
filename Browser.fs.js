import { int32ToString, createAtom } from "./fable_modules/fable-library-js.4.16.0/Util.js";

export let count = createAtom(0);

export const div = document.createElement("div");

div.innerHTML = (("<div>" + int32ToString(count())) + "</div>");

div.innerHTML = (div.innerHTML + (`<button onclick="${(_arg) => (count() + 1)}">click</button>`));

document.body.appendChild(div);

