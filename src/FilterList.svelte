<script>
	import FilterListModalContent from './FilterListModalContent.svelte';
	import { s, changeFilter } from './store.js';

	function handleMetaChange(event) {
		const threadIdx = parseInt(event.target.dataset.threadix);

		s.update(state => {
			const newFilters = [...state.filters];
			newFilters[threadIdx] = [newFilters[threadIdx][0], event.target.value];
			return { ...state, filters: newFilters };
		});
	}

	function getFilterDescription(filter) {
		return filter[0];
	}
</script>

<div class="modal fade" id="filter_modal" tabindex="-1" aria-labelledby="filter_modal_label" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="filter_modal_label">Change filter</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<FilterListModalContent />
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="card mt-2 mb-2">
	<div class="card-body">
		<h2 class="card-title">Filters <span class="text-muted">(extracts data from the LLM's response)</span></h2>

		<p class="text-muted">
			A filter turns the LLM's textual response into a usable format. The filter's output is saved into <code>choices</code> on the Thread.
		</p>

		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th width="10%" scope="col">Thread</th>
					<th width="10%" scope="col">Type</th>
					<th scope="col">Filter</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.entries($s.threads) as [idx, thread]}
				<tr>
					<th scope="row">{thread[0]}</th>
					<th scope="row">{thread[1]}</th>
					<th scope="row">
						{getFilterDescription($s.filters[idx])}
						{#if $s.filters[idx].length > 1}
						<input type="text" class="form-control mb-1" oninput={handleMetaChange} data-threadix={idx} value={$s.filters[idx][1] || ""} style="display:inline;width:50%">
						{/if}
						<button type="button" class="btn btn-primary btn-sm" onclick={() => $changeFilter = idx} data-threadix={idx} data-bs-toggle="modal" data-bs-target="#filter_modal">
							Change
						</button>
					</th>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
