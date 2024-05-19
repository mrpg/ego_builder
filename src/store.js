import { writable } from "svelte/store";

export const s = writable({
    threads: [[1, "CLIThread"], [2, "CLIThread"]],
    treatments: ["give", "take", "split"],
    rounds: 1,
    variables: {proposer_instruction: {
        give: "Today, you can give money to the responder.",
        take: "Today, you can take money from the responder.",
        split: "Today, you can split money with the responder.",
    }},
    prompts: {
    system: `You are participating in a decision-making experiment that includes two people: A proposer and a responder.
{% if i == 1 %}
You are the proposer. This means that you will move first.
{% else %}
You are the responder. This means that you will move second.
{% endif %}
Always follow the instructions. Do not apologize. Do not return anything except that which is expected.`,
    user: `This is round {{round}}.

{% if i == 1 %}
You are endowed with $10.
{{ proposer_instruction }}
After you make your offer, the responder will decide whether to accept or reject it. If they reject it, you and they both get $0 each.
How much do you propose to keep? Respond with JSON like this: {"keep": /*amount*/}
{% else %}
The proposer was endowed with $10. Here is their offer:

{% if treatment.name == "give" %}
The proposer decided to give you \${{ 10 - other.choices[-1].keep }}.
{% elif treatment.name == "take" %}
The proposer decided to take \${{ other.choices[-1].keep }}, leaving you with \${{ 10 - other.choices[-1].keep }}.
{% else %}
The proposer decided to split the endowment so that they get \${{ other.choices[-1].keep }} and you get \${{ 10 - other.choices[-1].keep }}.
{% endif %}

If you ACCEPT this offer, the offer is effectuated. If you REJECT the offer, you and they get $0 each.
Respond with either "ACCEPT" or "REJECT".
{% endif %}`,
    },
    filters: [["JSON"], ["exclusive_response", "ACCEPT;REJECT"]],
});

export var change_filter = writable(null);
