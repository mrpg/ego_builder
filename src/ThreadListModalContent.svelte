<script>
	import { s } from './store.js';

	// Common OpenAI model suggestions
	const openaiModels = [
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

	// Common OpenRouter model suggestions
	const openrouterModels = [
		"anthropic/claude-3.5-sonnet",
		"anthropic/claude-3-opus",
		"google/gemini-pro-1.5",
		"google/gemini-flash-1.5",
		"meta-llama/llama-3.1-405b-instruct",
		"meta-llama/llama-3.1-70b-instruct",
		"mistralai/mistral-large",
		"deepseek/deepseek-chat",
	];

	let customOpenAIModel = $state("");
	let customOpenRouterModel = $state("");

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

	function addOpenRouterThread(model) {
		addThread(["OpenRouterThread", model]);
	}

	function addCustomGPTThread() {
		if (customOpenAIModel.trim()) {
			addGPTThread(customOpenAIModel.trim());
			customOpenAIModel = "";
		}
	}

	function addCustomOpenRouterThread() {
		if (customOpenRouterModel.trim()) {
			addOpenRouterThread(customOpenRouterModel.trim());
			customOpenRouterModel = "";
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

<div class="card mb-3">
	<div class="card-body">
		<h5 class="card-title">GPTThread</h5>
		<p class="text-muted small">OpenAI models. Temperature = 1.0. Requires OPENAI_KEY env var.</p>

		<div class="mb-3">
			<div class="d-flex flex-wrap gap-1">
				{#each openaiModels as model}
					<button class="btn btn-outline-secondary btn-sm" onclick={() => addGPTThread(model)}>{model}</button>
				{/each}
			</div>
		</div>

		<div class="input-group">
			<input
				type="text"
				class="form-control"
				placeholder="Custom model ID (e.g. gpt-4o-2024-08-06)"
				bind:value={customOpenAIModel}
				onkeydown={(e) => e.key === 'Enter' && addCustomGPTThread()}
			/>
			<button class="btn btn-primary" onclick={addCustomGPTThread}>Add</button>
		</div>
	</div>
</div>

<div class="card mb-2">
	<div class="card-body">
		<h5 class="card-title">OpenRouterThread</h5>
		<p class="text-muted small">Access many LLMs via OpenRouter. Temperature = 1.0. Requires OPENROUTER_KEY env var.</p>

		<div class="mb-3">
			<div class="d-flex flex-wrap gap-1">
				{#each openrouterModels as model}
					<button class="btn btn-outline-secondary btn-sm" onclick={() => addOpenRouterThread(model)}>{model}</button>
				{/each}
			</div>
		</div>

		<div class="input-group">
			<input
				type="text"
				class="form-control"
				placeholder="Custom model ID (e.g. anthropic/claude-3.5-haiku)"
				bind:value={customOpenRouterModel}
				onkeydown={(e) => e.key === 'Enter' && addCustomOpenRouterThread()}
			/>
			<button class="btn btn-primary" onclick={addCustomOpenRouterThread}>Add</button>
		</div>
	</div>
</div>
