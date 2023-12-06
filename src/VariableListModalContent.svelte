<script>
    import { s } from "./store.js";
    import { valid_name } from "./scheme.js";

    let input_value = "";

    function add_variable(variable) {
        $s.variables[variable] = {};
    }

    function handle_add() {
        if (valid_name(input_value)) {
            add_variable(input_value);
            alert(`Variable ${input_value} was added.`);
        } else {
            alert("The identifier you entered is invalid. Valid names are, for example: my_var, abc, x1.");
        }
    }
</script>

<input type="text" class="form-control mb-1" bind:value={input_value} placeholder="Enter identifier">

<button type="button" class="btn btn-primary" on:click={handle_add}>Add</button>
