<script lang="ts">
    import Fa from 'svelte-fa';
    import { faDiagramProject, faTrophy, faRankingStar, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { pageTitle } from '$lib/stores';
	import type { Tournament } from '$lib/models/tournament.js';

	pageTitle.set('Strona główna');

	export let data;
	let tournaments: Tournament[] = data.tournaments;
</script>

<div class="flex items-center gap-2 mb-2">
	<Fa icon={faTrophy} />
	<p class="text-2xl font-semibold">Turnieje</p>

	{#if data.user}
		<a href="tournament/new" class="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded shadow px-4 py-2 text-white">
			<Fa icon={faPlus} />
			Nowy
		</a>
	{/if}
</div>

{#each tournaments as tournament, i}
	<div class="border rounded shadow px-4 py-2 text-lg hover:bg-gray-50 hover:dark:bg-slate-800 mb-2">
		<a href={'/tournament/' + tournament._id}>
			<p class="text-slate-500 text-base">
				#{i + 1}
			</p>
			{tournament.name}
		</a>
	</div>
{/each}