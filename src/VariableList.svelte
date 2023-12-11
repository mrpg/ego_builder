<script>
    import VariableListModalContent from "./VariableListModalContent.svelte";
    import { s } from "./store.js";

    function del_variable(name) {
        delete $s.variables[name];
        $s.variables = $s.variables;
    }

    function is_valid_number(x) {
        const regex = /^[+-]?\d+(\.\d+)?$/;

        return regex.test(x);
    }

    function try_float(x) {
        if (!is_valid_number(x)) {
            return x;
        }
        else {
            return parseFloat(x);
        }
    }

    function have_all(varname, old_value) {
        for (const t in $s.variables[varname]) {
            const check = (t in $s.variables[varname]) ? $s.variables[varname][t] : null;

            if (check != old_value) {
                return false;
            }
        }

        return true;
    }

    function var_change(event) {
        let source = event.target || event.srcElement;
        let treat = source.dataset.treat;
        let value = try_float(source.value);
        let old_value = (treat in $s.variables[source.dataset.var]) ? $s.variables[source.dataset.var][treat] : null;
        let set_on_all = treat == $s.treatments[0] && have_all(source.dataset.var, old_value);

        if (set_on_all) {
            for (let i = 0; i < $s.treatments.length; i++) {
                const t = $s.treatments[i];

                $s.variables[source.dataset.var][t] = value;
            }
        }
        else {
            $s.variables[source.dataset.var][treat] = value;
        }
    }
</script>

<div class="modal fade" id="variable_modal" tabindex="-1" aria-labelledby="variable_modal_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="variable_modal_label">Add a new variable</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <VariableListModalContent />
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
            <h2 class="card-title">Variables</h2>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#variable_modal">
                Add variable
            </button>
        </div>

        <p class="text-muted">
        You can have custom variables vary between your treatments. This can be useful to store payoff information or to implement an experiment on framing. Currently, strings and numbers are supported. (Their type is automatically ascertained.) Your variables will be injected into the Thread, depending on the assigned treatment.
        </p>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th width="10%" scope="col">Variable</th>
                    <th scope="col">Value per treatment</th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries($s.variables) as variable}
                <tr>
                    <th scope="row">{variable[0]} <button class="btn btn-danger btn-sm" on:click={() => del_variable(variable[0])}>Delete</button></th>
                    <td>
                        {#each $s.treatments as treatment}
                        <p>
                        <b>{treatment}</b>
                        <input type="text" class="form-control mb-1" on:input={var_change} data-var={variable[0]} data-treat={treatment} value={variable[1][treatment] || ""}>
                        </p>
                        {#if !(treatment in variable[1])}
                        <p class="alert alert-danger" role="alert">unset</p>
                        {/if}
                        {/each}
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
