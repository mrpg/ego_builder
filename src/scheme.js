import { s } from "./store.js";

export function to_json() {
    let current_state;

    const unsubscribe = s.subscribe(value => {
        current_state = value;
    });

    unsubscribe();

    return JSON.stringify(current_state);
}

export function from_json(str) {
    s.set(JSON.parse(str));
}

export function valid_name(str) {
    return /^[a-zA-Z_$][a-zA-Z\d_$]*$/.test(str);
}
