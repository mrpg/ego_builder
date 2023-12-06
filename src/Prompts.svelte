<script>
    import { s } from "./store.js";

    function system_prompt_change(event) {
        let source = event.target || event.srcElement;
        $s.prompts.system = source.value;
    }

    function user_prompt_change(event) {
        let source = event.target || event.srcElement;
        $s.prompts.user = source.value;
    }
</script>

<div class="card mt-2 mb-2">
    <div class="card-body">
        <h2 class="card-title">Prompts <span class="text-muted">(your instructions)</span></h2>

        <p class="text-muted">
        This field is where you can enter the instructions of your experiment.
        Within each prompt, access Threads' variables like this: <code>&lcub;&lcub;&nbsp;my_variable&nbsp;&rcub;&rcub;</code>. <code>&lcub;&lcub;&nbsp;treatment.name&nbsp;&rcub;&rcub;</code> contains the name of the assigned treatment, so you can vary parts of these instructions by treatment. Your custom variables will be assigned automatically depending on the assigned treatment. <code>choices</code> is a list of choices (filtered responses), so <code>&lcub;&lcub;&nbsp;my_variable[-1]&nbsp;&rcub;&rcub;</code> is the most recent choice. <code>others</code> is a list of the other Threads (and if you are building a two-player experiment, <code>other</code> is simply the other Thread). This means you can use expressions like <code>&lcub;&lcub;&nbsp;other.choices[-1]&nbsp;&rcub;&rcub;</code> to include the other Thread's most recent choice. You can use complex expressions with <code>&lcub;% if %&rcub;</code> and <code>&lcub;% for %&rcub;</code> if necessary. Each Thread's index is accessible using <code>i</code>, allowing you to distinguish Threads to give them distinct roles.
        <a target="_blank" href="https://documentation.bloomreach.com/engagement/docs/jinja-syntax">Here are some examples of Jinja2 syntax.</a>
        </p>
    </div>

    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <h4>System prompt <span class="text-muted">(general instructions)</span></h4>
            <p class="text-muted">
            The system prompt typically sets the stage for the interaction, providing context about what the LLM will be doing or what the experiment is about.
            </p>

            <textarea rows="8" class="form-control font-monospace" on:input={system_prompt_change}>{$s.prompts.system}</textarea>
        </li>
        <li class="list-group-item">
            <h4>User prompt <span class="text-muted">(what the “participant” needs to do now)</span></h4>
            <p class="text-muted">
            The user prompt per round gives specific instructions or information to the LLM for that particular stage or round of the experiment. It often includes feedback or results from previous rounds (if any) and may provide the user with the current status or options for the next action.
            </p>

            <textarea rows="12" class="form-control font-monospace" on:input={user_prompt_change}>{$s.prompts.user}</textarea>
        </li>
    </ul>
</div>
