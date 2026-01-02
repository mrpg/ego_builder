<script>
	import { s } from './store.js';

	// Common model suggestions for quick selection
	const suggestedModels = [
		"gpt-4o",
		"gpt-4o-mini",
		"gpt-4-turbo",
		"gpt-4",
		"gpt-3.5-turbo",
		"o1",
		"o1-mini",
		"o1-preview",
		"o3-mini",
	];

	let customModel = $state("");

	function addThread(threadDef) {
		s.update(state => {
			const next = state.threads.length >= 1
				? state.threads[state.threads.length - 1][0] + 1
				: 1;

			return {
				...state,
				filters: [...state.filters, ["JSON"]],
				threads: [...state.threads, [next, threadDef]]
			};
		});
	}

	function addGPTThread(model) {
		addThread(["GPTThread", model]);
	}

	function addCustomGPTThread() {
		if (customModel.trim()) {
			addGPTThread(customModel.trim());
			customModel = "";
		}
	}
</script>

<div class="card mb-3">
	<div class="card-body">
		<div class="d-flex justify-content-between align-items-center mb-2">
			<h5 class="card-title mb-0">CLIThread</h5>
			<button class="btn btn-primary btn-sm" onclick={() => addThread("CLIThread")}>Add</button>
		</div>
		<p class="text-muted small mb-0">A Thread that reads your input on the command line. Useful for testing.</p>
	</div>
</div>

<div class="card mb-2">
	<div class="card-body">
		<h5 class="card-title">GPTThread</h5>
		<p class="text-muted small">OpenAI models. Temperature = 1.0. Select a model or enter a custom model ID.</p>

		<div class="mb-3">
			<div class="d-flex flex-wrap gap-1">
				{#each suggestedModels as model}
					<button class="btn btn-outline-secondary btn-sm" onclick={() => addGPTThread(model)}>{model}</button>
				{/each}
			</div>
		</div>

		<div class="input-group">
			<input
				type="text"
				class="form-control"
				placeholder="Custom model ID (e.g. gpt-4o-2024-08-06)"
				bind:value={customModel}
				onkeydown={(e) => e.key === 'Enter' && addCustomGPTThread()}
			/>
			<button class="btn btn-primary" onclick={addCustomGPTThread}>Add</button>
		</div>
	</div>
</div>
