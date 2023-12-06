<script>
    import { s } from "./store.js";

    const available_threads = [
            ["CLIThread", "A Thread that reads your input on the command line. Useful for testing."],
            ["GPTThread (GPT 3.5)", "OpenAI's gpt-3.5-turbo model."],
            ["GPTThread (GPT 4)", "OpenAI's gpt-4 model."]
    ];

    function add_thread(thread) {
        let next;

        if ($s.threads.length >= 1) {
            next = $s.threads[$s.threads.length - 1][0] + 1;
        }
        else {
            next = 1;
        }

        $s.filters = [...$s.filters, ["JSON"]];
        $s.threads = [...$s.threads, [next, thread]];
    }
</script>

{#each available_threads as thread}
<div class="card mb-2">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <h5 class="card-title">{thread[0]}</h5>

            <button class="btn btn-primary" on:click={() => add_thread(thread[0])}>Add</button>
        </div>

        <p class="text-muted">{thread[1]}</p>
    </div>
</div>
{/each}
