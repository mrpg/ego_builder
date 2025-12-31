<script>
	import { s } from './store.js';
	import { validName } from './scheme.js';

	let inputValue = $state('');

	function addTreatment(treatment) {
		s.update(state => ({
			...state,
			treatments: [...state.treatments, treatment]
		}));
	}

	function handleAdd() {
		if (validName(inputValue)) {
			addTreatment(inputValue);
			alert(`Treatment ${inputValue} was added.`);
		} else {
			alert("The identifier you entered is invalid. Valid names are, for example: my_treatment, abc, treat1.");
		}
	}
</script>

<input type="text" class="form-control mb-1" bind:value={inputValue} placeholder="Enter identifier">

<button type="button" class="btn btn-primary" onclick={handleAdd}>Add</button>
