<script>
	import { s } from './store.js';

	const availableThreads = [
		["CLIThread", "A Thread that reads your input on the command line. Useful for testing."],
		["GPTThread (GPT-3.5)", "OpenAI's gpt-3.5-turbo model. Temperature = 1.0."],
		["GPTThread (GPT-4)", "OpenAI's gpt-4 model. Temperature = 1.0."],
		["GPTThread (GPT-4 turbo)", "OpenAI's gpt-4-turbo model. Temperature = 1.0."],
		["GPTThread (GPT-4o)", "OpenAI's gpt-4o model. Temperature = 1.0."],
	];

	function addThread(thread) {
		s.update(state => {
			const next = state.threads.length >= 1
				? state.threads[state.threads.length - 1][0] + 1
				: 1;

			return {
				...state,
				filters: [...state.filters, ["JSON"]],
				threads: [...state.threads, [next, thread]]
			};
		});
	}
</script>

{#each availableThreads as thread}
<div class="card mb-2">
	<div class="card-body">
		<div class="d-flex justify-content-between">
			<h5 class="card-title">{thread[0]}</h5>

			<button class="btn btn-primary" onclick={() => addThread(thread[0])}>Add</button>
		</div>

		<p class="text-muted">{thread[1]}</p>
	</div>
</div>
{/each}
