<script>
    import { s } from "./store.js";

    function set_rounds(new_rounds) {
        $s.rounds = new_rounds;
    }
</script>

<div class="card mt-2 mb-2">
    <div class="card-body">
        <h2 class="card-title">Rounds</h2>

        <p class="text-muted">After treatment assignment, how often should each Thread be invoked to respond within a given Conversation? In this builder, Threads take turns in the order defined above. Simply put, for how many rounds shall the treatment be repeated? In the current version of the builder, only partner designs are implemented. Hence, if you have multiple rounds, the same Threads repeatedly meet in every round.</p>

        <input type="number" min="1" bind:value={$s.rounds}>
    </div>
</div>
