<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';

	import { s } from './store.js';
	import { fromJson } from './scheme.js';

	let jsonValue = $derived(JSON.stringify($s));

	function handleChange(newValue) {
		try {
			JSON.parse(newValue);
			fromJson(newValue);
		} catch (e) {
			// Invalid JSON, ignore
		}
	}
</script>

<div class="card mt-2 mb-2">
	<div class="card-body">
		<h2 class="card-title">Export or import scenario</h2>

		<p class="text-muted">
			The following field updates automatically when you make changes to your experiment.
			To export your scenario for use with <code>ego</code>, copy the following and paste it into <code>built.json</code> in your current working directory, then execute <code>ego run built</code>. To run it multiple times, do <code>ego run -n 42 built</code>.<br>
			To import a previously created scenario, paste it into the field:
		</p>

		<CodeMirror
			value={jsonValue}
			lang={json()}
			onchange={handleChange}
			lineWrapping={true}
			styles={{
				"&": {
					"font-size": "0.65em",
				},
			}}
		/>

		<p class="text-muted">
			After running your scenario, you can export its data to the file <code>data.csv</code> by running <code>ego data built <i>[experiment ID]</i> &gt; data.csv</code>. The <code><i>[experiment ID]</i></code> is shown after <code>ego run built</code> ran completely.
		</p>
	</div>
</div>
