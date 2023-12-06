<script>
    import TreatmentListModalContent from "./TreatmentListModalContent.svelte";
    import { s } from "./store.js";

    function del_treatment(name) {
        let new_treatments = [];

        for (const treatment of $s.treatments) {
            if (treatment != name) {
                new_treatments.push(treatment);
            }
        }

        $s.treatments = new_treatments;
    }
</script>

<div class="modal fade" id="treatment_modal" tabindex="-1" aria-labelledby="treatment_modal_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="treatment_modal_label">Add a new treatment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <TreatmentListModalContent />
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
            <h2 class="card-title">Treatments</h2>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#treatment_modal">
                Add treatment
            </button>
        </div>

        <p class="text-muted">
        This builder allows you to build experiments that randomly assign treatments to a Conversation consisting of all the Threads defined above.
        </p>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Treatment</th>
                </tr>
            </thead>
            <tbody>
                {#each $s.treatments as treatment}
                <tr>
                    <th scope="row">{treatment} <button class="btn btn-danger btn-sm" on:click={() => del_treatment(treatment)}>Delete</button></th>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
