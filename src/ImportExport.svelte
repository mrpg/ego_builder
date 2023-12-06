<script>
    import { s } from "./store.js";
    import { to_json, from_json } from "./scheme.js";

    let textarea_content;

    const unsubscribe = s.subscribe(value => {
        textarea_content = to_json();
    });

    function handle_textarea_change() {
        from_json(textarea_content);
    }
</script>

<div class="card mt-2 mb-2">
    <div class="card-body">
        <h2 class="card-title">Export or import scenario</h2>

        <p class="text-muted">
            The following field updates automatically when you make changes to your experiment.
            To export your scenario for use with <code>ego</code>, copy the following and paste it into <code>built.json</code> in your current working directory, then execute <code>ego run built</code>.<br>
            To import a previously created scenario, paste it into the field:
        </p>

        <textarea rows="10" class="form-control font-monospace small" bind:value={textarea_content} on:input={handle_textarea_change}></textarea>
    </div>
</div>
