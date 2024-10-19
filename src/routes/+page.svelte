<script lang="ts">
	//import Match from '$lib/components/match_component.svelte';
	import TournamentBracket from "$lib/components/tournament_bracket.svelte";
    import Fa from 'svelte-fa';
    import { faDiagramProject, faTrophy, faRankingStar } from '@fortawesome/free-solid-svg-icons';
    import { UA } from 'country-flag-icons/string/3x2';

	/*const tournamentTree = {
		children: [
			{
				children: [
					{children: []},
					{children: []},
				]
			},
			{
				children: [
					{children: []},
					{children: []},
				]
			}
		]
	};*/

	const tournamentTree = {
		children: [
			{
				children: [
					{
						children: [
							{children: []},
							{children: []}
						]
					}, 
					{
						children: [
							{children: []},
							{children: []}
						]
					}
				]
			},
		]
	};
</script>

<div class="flex items-center gap-2 mb-2">
	<Fa icon={faTrophy} />
	<p class="text-2xl font-semibold">Zwycięzcy</p>
</div>

<div class="flex items-center gap-2 mb-2">
	<Fa icon={faDiagramProject} />
	<p class="text-2xl font-semibold">Drabinka</p>
</div>
<div class="overflow-scroll">

<TournamentBracket match={tournamentTree} />
</div>

<div class="flex items-center gap-2 mb-2">
	<Fa icon={faRankingStar} />
	<p class="text-2xl font-semibold">Ranking</p>
</div>
<div class="border rounded shadow px-4 py-2">
	<table>
		<tr class="text-left border-b divide-x">
			<th>Lp.</th>
			<th class="w-full">Zawodnik</th>
			<th>Wygrane</th>
			<th class="whitespace-nowrap">Zdobyte punkty</th>
		</tr>
		<tr>
			<td class="text-slate-500">#1</td>
            <td class="flex gap-2 h-8 items-center">
				<div class="w-6 rounded overflow-hidden">
					{@html UA}
				</div>
				Młody
			</td>
			<td>21</td>
			<td>37</td>
		</tr>
		<tr>
			<td>#2</td>
			<td>carcinizer</td>
			<td>10</td>
			<td>5</td>
		</tr>
	</table>
</div>