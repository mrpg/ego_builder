<script>
	import VariableListModalContent from './VariableListModalContent.svelte';
	import { s } from './store.js';

	function deleteVariable(name) {
		s.update(state => {
			const newVariables = { ...state.variables };
			delete newVariables[name];
			return { ...state, variables: newVariables };
		});
	}

	function isValidNumber(x) {
		const regex = /^[+-]?\d+(\.\d+)?$/;
		return regex.test(x);
	}

	function tryFloat(x) {
		return isValidNumber(x) ? parseFloat(x) : x;
	}

	function haveAll(state, varName, oldValue) {
		for (const t of state.treatments) {
			const check = (t in state.variables[varName]) ? state.variables[varName][t] : null;
			if (check !== oldValue) {
				return false;
			}
		}
		return true;
	}

	function handleVariableChange(event) {
		const { treat, var: varName } = event.target.dataset;
		const value = tryFloat(event.target.value);

		s.update(state => {
			const oldValue = (treat in state.variables[varName]) ? state.variables[varName][treat] : null;
			const setOnAll = treat === state.treatments[0] && haveAll(state, varName, oldValue);

			const newVariables = { ...state.variables };
			newVariables[varName] = { ...newVariables[varName] };

			if (setOnAll) {
				for (const t of state.treatments) {
					newVariables[varName][t] = value;
				}
			} else {
				newVariables[varName][treat] = value;
			}

			return { ...state, variables: newVariables };
		});
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
				{#each Object.entries($s.variables) as [varName, varValues]}
				<tr>
					<th scope="row">{varName} <button class="btn btn-danger btn-sm" onclick={() => deleteVariable(varName)}>Delete</button></th>
					<td>
						{#each $s.treatments as treatment}
						<p>
							<b>{treatment}</b>
							<input type="text" class="form-control mb-1" oninput={handleVariableChange} data-var={varName} data-treat={treatment} value={varValues[treatment] || ""}>
						</p>
						{#if !(treatment in varValues)}
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
