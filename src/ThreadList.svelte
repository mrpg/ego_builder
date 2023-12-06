<script>
    import ThreadListModalContent from "./ThreadListModalContent.svelte";
    import { s } from "./store.js";

    function del_thread(i) {
        let new_threads = [];

        for (const thread of $s.threads) {
            if (thread[0] != i) {
                new_threads.push(thread);
            }
        }

        $s.threads = new_threads;
    }
</script>

<div class="modal fade" id="thread_modal" tabindex="-1" aria-labelledby="thread_modal_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="thread_modal_label">Select a thread</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ThreadListModalContent />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="card mt-2 mb-2">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <h2 class="card-title">Threads <span class="text-muted">(your participants)</span></h2>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#thread_modal">
                Add thread
            </button>
        </div>

        <p class="text-muted">
        A Thread represents a source of text. In the context of experiments with LLMs, each Thread is like a machine participant. Which Threads do you want to combine? You can distinguish Threads by their index, so they can have different “roles.”
        </p>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th width="10%" scope="col">Index&nbsp;(<i>i</i>)</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>
                {#each $s.threads as thread}
                <tr>
                    <th scope="row">{thread[0]}</th>
                    <td>{thread[1]} <button class="btn btn-danger btn-sm" on:click={() => del_thread(thread[0])}>Delete</button></td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
