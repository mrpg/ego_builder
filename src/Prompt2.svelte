<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { StreamLanguage } from '@codemirror/language';
	import { jinja2 } from '@codemirror/legacy-modes/mode/jinja2';

	import { s } from './store.js';

	const jinja2_syntax = StreamLanguage.define(jinja2);

	function handleChange(newValue) {
		s.update(state => ({
			...state,
			prompts: { ...state.prompts, user: newValue }
		}));
	}
</script>

<CodeMirror value={$s.prompts.user} lang={jinja2_syntax} onchange={handleChange} lineWrapping={true} />
