<script>
    import { s } from "./store.js";
    import { valid_name } from "./scheme.js";

    let input_value = "";

    function add_treatment(treatment) {
        $s.treatments = [...$s.treatments, treatment];
    }

    function handle_add() {
        if (valid_name(input_value)) {
            add_treatment(input_value);
            alert(`Treatment ${input_value} was added.`);
        } else {
            alert("The identifier you entered is invalid. Valid names are, for example: my_treatment, abc, treat1.");
        }
    }
</script>

<input type="text" class="form-control mb-1" bind:value={input_value} placeholder="Enter identifier">

<button type="button" class="btn btn-primary" on:click={handle_add}>Add</button>
