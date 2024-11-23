<script lang="ts">
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import TournamentBracket from '$lib/components/tournament_bracket.svelte';
	import BracketPathsList from './bracket_paths_list.svelte';
	import type Choices from 'choices.js';
	import type { Player } from '$lib/models/player';
	import type { Match } from '$lib/models/match';

	onMount(async () => {
		const Choices = await import('choices.js');
		playersMatchChoice = new Choices.default(playersMatchSelect);

		// TODO: Fix choice: any
		playersMatchChoice.passedElement.element.addEventListener('change', (choice: any) => {
			let id: string = choice.detail.value;

			if (matchPlayers.find((p) => p._id.toString() === id)) {
				matchPlayers = matchPlayers.filter((x) => x._id.toString() !== id);
			} else {
				let player = playersInTournament.find((p) => p._id.toString() === id);
				if (player) matchPlayers.push(player);
			}

			matchPlayers = matchPlayers;
		});
	});

	let playersMatchSelect: HTMLSelectElement;
	let playersMatchChoice: Choices;

	export let tournamentBracket: Match[] = [];
	export let playersInTournament: Player[] = [];

	$: {
		if (playersMatchChoice !== undefined) {
			playersMatchChoice.clearChoices();
			playersMatchChoice.setChoices(
				playersInTournament.map((p) => {
					return {
						value: p._id.toString(),
						label: p.name
					};
				})
			);
		}
	}

	let matchName: string;
	let matchPlayers: Player[] = [];
	let matchResults: string;
	let matchParent: string;

	let createMatch = async () => {
		if (matchPlayers.length === 0 || matchName === '') return;

		let node: Match = {
			_id: undefined,
			name: matchName,
			players: matchPlayers,
			results: matchResults.split(',').map((e) => parseFloat(e)),
			children: []
		};

		if (matchParent === '-1') {
			tournamentBracket = [...tournamentBracket, node];
		} else {
			// TODO: It will break if two matches have the same name or 
			// any of them contains '>'
			let path = matchParent.split('>');
			let currentNode = tournamentBracket.find((e) => e.name == path[0]);
			path.shift();

			for (const node of path) {
				currentNode = currentNode?.children?.find((e) => e.name == node);
			}

			currentNode?.children?.push(node);
			tournamentBracket = tournamentBracket;
		}
	};
	
	$: {
		tournamentBracket = tournamentBracket.filter((e) => e);
	}
</script>

<div class="flex-col">
	<div class="flex gap-2 flex-wrap">
		<input
			type="text"
			placeholder="Nazwa meczu"
			class="border rounded shadow px-4 py-2 mb-2 dark:bg-slate-800"
			bind:value={matchName}
		/>
		<select multiple bind:this={playersMatchSelect} placeholder="Zawodnicy"> </select>
		<input
			type="text"
			placeholder="Wyniki"
			class="border rounded shadow px-4 py-2 mb-2 dark:bg-slate-800"
			bind:value={matchResults}
		/>
		<select class="border rounded shadow px-4 py-2 bg-white mb-2 w-72 dark:bg-slate-800" bind:value={matchParent}>
			<option value="-1" selected>Brak rodzica</option>
			<BracketPathsList node={tournamentBracket} />
		</select>
	</div>
	<button
		class="flex items-center justify-center w-full text-white bg-blue-600 hover:bg-blue-700 rounded shadow py-2 gap-2"
		on:click|preventDefault={() => createMatch()}
	>
		<Fa icon={faPlus} />
		<p class="font-medium">Dodaj nowy mecz</p>
	</button>
</div>

<div class="overflow-scroll mt-2">
	{#each tournamentBracket as bracket}
		<TournamentBracket bind:node={bracket} edit={true} {playersInTournament} />
	{/each}
</div>
