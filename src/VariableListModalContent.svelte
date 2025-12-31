<script>
	import { s } from './store.js';
	import { validName } from './scheme.js';

	let inputValue = $state('');

	function addVariable(variable) {
		s.update(state => ({
			...state,
			variables: { ...state.variables, [variable]: {} }
		}));
	}

	function handleAdd() {
		if (validName(inputValue)) {
			addVariable(inputValue);
			alert(`Variable ${inputValue} was added.`);
		} else {
			alert("The identifier you entered is invalid. Valid names are, for example: my_var, abc, x1.");
		}
	}
</script>

<input type="text" class="form-control mb-1" bind:value={inputValue} placeholder="Enter identifier">

<button type="button" class="btn btn-primary" onclick={handleAdd}>Add</button>
