import { s } from './store.js';

export function fromJson(str) {
	try {
		s.set(JSON.parse(str));
	} catch (e) {
		// Invalid JSON, ignore
	}
}

export function validName(str) {
	return /^[a-zA-Z_$][a-zA-Z\d_$]*$/.test(str);
}
