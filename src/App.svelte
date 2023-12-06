<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap/dist/js/bootstrap.bundle.min.js";

    import ImportExport from "./ImportExport.svelte";
    import ThreadList from "./ThreadList.svelte";
    import TreatmentList from "./TreatmentList.svelte";
    import Rounds from "./Rounds.svelte";
    import VariableList from "./VariableList.svelte";
    import Prompts from "./Prompts.svelte";
    import FilterList from "./FilterList.svelte";
</script>

<header>
    <h1>Scenario builder</h1>
</header>

<main>
    <p>Using this interactive builder, you can build simple own experiments with large language models (LLMs) for use with <code>ego</code>. <a href="#TODO" target="_blank">Read our paper</a> &middot; <a href="https://github.com/mrpg/ego" target="_blank">GitHub</a></p>

    <p>This builder works for turn-based interactive experiments with one or more LLMs and one or more rounds. It allows you to define treatments and to have prompts and variables vary along those treatments. <a href="https://www.youtube.com/watch?v=H0O9rwk8vqg" target="_blank">Here’s a video tutorial.</a></p>

    <p>
    <center>
        <img src="static/fig2.svg" alt="A simple turn-based experiment" width="90%" />
    </center>
    </p>

    <p><small class="text-muted">The example experiment implemented below was inspired by the framed ultimatum game of <a href="https://journals.sagepub.com/doi/10.1177/0146167208318600" target="_blank">Leliveld et al. (2008)</a>.</small></p>

    <ThreadList />
    <TreatmentList />
    <Rounds />
    <VariableList />
    <Prompts />
    <FilterList />
    <hr>
    <ImportExport />
</main>

<footer>
    <p class="text-muted text-center small">
    This is <a target="_blank" href="https://github.com/mrpg/ego_builder"><tt>ego_builder</tt></a>. <a href="https://max.pm/contact/">Contact</a><br>
    Built with <a target="_blank" href="https://svelte.dev/">Svelte</a>.</p>
</footer>
