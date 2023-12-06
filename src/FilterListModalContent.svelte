<script>
    import { s, change_filter } from "./store.js";

    const available_filters = [
        ["JSON", "This filter assumes that the LLM's response is JSON. JSON is a text format to exchange data. It is supported by much software, including some LLMs."],
        ["extract_number", "Extract a single number (real or integral) from the response."],
        ["exclusive_response", "Extract a single string from a list of allowed tokens. Separate allowed tokens by semicolon (;). The LLM can return a whole sentence, but it must return exactly one of the allowed tokens."],
        ["As is", "Accept the LLM's response as is."],
    ];

    function use_filter(filter) {
        if (filter == "exclusive_response") {
            $s.filters[$change_filter] = [filter, "Token 1;Token 2;Token 3"];
        }
        else {
            $s.filters[$change_filter] = [filter];
        }
    }
</script>

{#each available_filters as filter}
<div class="card mb-2">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <h5 class="card-title">{filter[0]}</h5>

            <button class="btn btn-primary" on:click={() => use_filter(filter[0])} data-bs-dismiss="modal">Use</button>
        </div>

        <p class="text-muted">{filter[1]}</p>
    </div>
</div>
{/each}
