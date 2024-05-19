<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { StreamLanguage } from "@codemirror/language";
    import { jinja2 } from "@codemirror/legacy-modes/mode/jinja2";

    import { s } from "./store.js";

    const jinja2_syntax = StreamLanguage.define(jinja2);

    let value = $s.prompts.user;

    function user_prompt_change(event) {
        $s.prompts.user = event.detail;
    }

    $: if ($s.prompts.user) {
        value = $s.prompts.user;
    }
</script>

<CodeMirror bind:value on:change={user_prompt_change} lang={jinja2_syntax} lineWrapping=1 />
