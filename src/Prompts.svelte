<script>
    import { s } from "./store.js";
    import Prompt1 from "./Prompt1.svelte";
    import Prompt2 from "./Prompt2.svelte";
</script>

<div class="card mt-2 mb-2">
    <div class="card-body">
        <h2 class="card-title">Prompts <span class="text-muted">(your instructions)</span></h2>

        <p class="text-muted">
        This field is where you can enter the instructions of your experiment.
        Within each prompt, access Threads' variables like this: <code>&lcub;&lcub;&nbsp;my_variable&nbsp;&rcub;&rcub;</code>. <code>&lcub;&lcub;&nbsp;treatment.name&nbsp;&rcub;&rcub;</code> contains the name of the assigned treatment, so you can vary parts of these instructions by treatment. Your custom variables will be assigned automatically depending on the assigned treatment. <code>choices</code> is a list of choices (filtered responses), so <code>&lcub;&lcub;&nbsp;my_variable[-1]&nbsp;&rcub;&rcub;</code> is the most recent choice. <code>others</code> is a list of the other Threads (and if you are building a two-player experiment, <code>other</code> is simply the other Thread). This means you can use expressions like <code>&lcub;&lcub;&nbsp;other.choices[-1]&nbsp;&rcub;&rcub;</code> to include the other Thread's most recent choice. You can use complex expressions with <code>&lcub;% if %&rcub;</code> and <code>&lcub;% for %&rcub;</code> if necessary. Each Thread's index is accessible using <code>i</code>, allowing you to distinguish Threads to give them distinct roles.
        <a target="_blank" href="https://documentation.bloomreach.com/engagement/docs/jinja-syntax">Here are some examples of Jinja2 syntax.</a>
        </p>

        <p class="text-muted">
        Beyond your own variables, you can access these: <code>i</code> (Thread index), <code>round</code> (current round number), <code>treatment.name</code> (treatment name), <code>other</code> (other Thread if 2 Threads in total), <code>others</code> (list of other Threads).
        </p>
    </div>

    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <h4>System prompt <span class="text-muted">(general instructions)</span></h4>
            <p class="text-muted">
            The system prompt typically sets the stage for the interaction, providing context about what the LLM will be doing or what the experiment is about.
            </p>

            <Prompt1 />
        </li>
        <li class="list-group-item">
            <h4>User prompt <span class="text-muted">(what the “participant” needs to do now)</span></h4>
            <p class="text-muted">
            The user prompt per round gives specific instructions or information to the LLM for that particular stage or round of the experiment. It often includes feedback or results from previous rounds (if any) and may provide the user with the current status or options for the next action.
            </p>

            <Prompt2 />
        </li>
    </ul>
</div>
