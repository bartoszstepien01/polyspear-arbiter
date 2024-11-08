<script lang="ts">
	import Fa from 'svelte-fa';
	import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { PL } from 'country-flag-icons/string/3x2';
    import type { Player } from '$lib/models/player';
	import type Choices from 'choices.js';

	onMount(async () => {
		const Choices = await import('choices.js');
		playersChoice = new Choices.default(playersSelect, {
			removeItems: true,
			closeDropdownOnSelect: false
		});

		playersChoice.setChoices(
			allPlayers.map((e) => {
				if (playersSelected.find((p) => p._id.toString() === e._id.toString()) !== undefined) {
					return undefined;
				}
				return {
					value: e._id.toString(),
					label: e.name
				};
			}).filter((e) => e !== undefined)
		);
	});

	export let allPlayers: Player[] = [];
	export let playersSelected: Player[] = [];

	let playersSelect: HTMLSelectElement;
	let playersChoice: Choices;

	let createPlayerMenuVisible: boolean = false;
	let createPlayerName: string;
	let createPlayerCountry: string;

	let addPlayerToTournament = () => {
		const addedPlayer = allPlayers.find((player) => player._id.toString() === playersSelect.value);
		if (addedPlayer) playersSelected = [...playersSelected, addedPlayer];
		playersChoice.removeChoice(playersSelect.value);
	};

	let removePlayerFromTournement = (player: Player) => {
		playersSelected = playersSelected.filter((p) => p._id !== player._id);

		playersChoice.setChoices([{
			value: player._id.toString(),
			label: player.name
		}]);

		playersSelected = playersSelected;
	};

	let createPlayer = async () => {
		if (createPlayerName === '') return;

		const response = await fetch('/api/player', {
			method: 'POST',
			body: JSON.stringify({
				name: createPlayerName,
				country: createPlayerCountry
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json: Player = await response.json();

		allPlayers = [...allPlayers, json];
		playersSelected = [...playersSelected, json];

		createPlayerName = '';
		createPlayerCountry = 'PL';
		createPlayerMenuVisible = false;
	};
</script>

<div class="flex w-full gap-2">
	<select bind:this={playersSelect} on:change={addPlayerToTournament}> </select>
	<div class="bg-blue-600 hover:bg-blue-700 rounded shadow px-3 py-1 relative mb-2">
		<button
			class="flex items-center h-full gap-2 mb-1 text-white"
			on:click|preventDefault={() => (createPlayerMenuVisible = !createPlayerMenuVisible)}
		>
			<Fa icon={faPlus} />
			<p class="font-medium">Nowy zawodnik</p>
		</button>
		{#if createPlayerMenuVisible}
			<div
				class="absolute top-full left-0 bg-white border rounded-b shadow px-2 py-2 flex flex-col gap-2 z-10"
			>
				<input
					type="text"
					placeholder="Imię"
					class="border rounded shadow px-4 py-2 text-sm"
					bind:value={createPlayerName}
				/>
				<select
					class="border rounded shadow px-4 py-2 text-sm bg-white"
					bind:value={createPlayerCountry}
				>
					<option value="PL">Polska</option>
				</select>
				<button
					class="bg-blue-600 hover:bg-blue-700 rounded shadow px-3 py-1 text-white"
					on:click|preventDefault={() => createPlayer()}
				>
					Dodaj
				</button>
			</div>
		{/if}
	</div>
</div>
<div class="border rounded shadow px-4 pt-2 pb-4">
	<table>
		<tr class="text-left border-b">
			<th>Lp.</th>
			<th class="w-full">Zawodnik</th>
			<th></th>
		</tr>
		{#each playersSelected as player, i}
			<tr>
				<td class="text-slate-500">#{i + 1}</td>
				<td class="align-middle">
					<div class="flex gap-2 items-center">
						<div class="w-6 rounded overflow-hidden">
							{@html PL}
						</div>
						{player.name}
					</div>
				</td>
				<td>
					<button class="bg-red-600 rounded shadow px-2 py-1 hover:bg-red-700" on:click|preventDefault={() => removePlayerFromTournement(player)}>
						<div class="flex items-center gap-2 mb-1 text-white">
							<Fa icon={faTrashCan} />
							<p class="font-medium">Usuń</p>
						</div>
					</button>
				</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	td {
		@apply px-2 py-2;
	}

	th {
		@apply px-2 py-2;
	}

	table tr:nth-child(even) {
		@apply bg-slate-100;
	}
</style>
