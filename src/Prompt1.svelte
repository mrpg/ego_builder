<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { StreamLanguage } from "@codemirror/language";
    import { jinja2 } from "@codemirror/legacy-modes/mode/jinja2";

    import { s } from "./store.js";

    const jinja2_syntax = StreamLanguage.define(jinja2);

    let value = $s.prompts.system;

    function system_prompt_change(event) {
        $s.prompts.system = event.detail;
    }

    $: if ($s.prompts.system) {
        value = $s.prompts.system;
    }
</script>

<CodeMirror bind:value on:change={system_prompt_change} lang={jinja2_syntax} lineWrapping=1 />
