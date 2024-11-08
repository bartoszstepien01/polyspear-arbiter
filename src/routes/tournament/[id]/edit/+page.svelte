<script lang="ts">
    import Fa from 'svelte-fa';
    import { faList, faPerson, faFont, faCalendar, faHourglass, faTrashCan, faPlus, faDiagramProject } from '@fortawesome/free-solid-svg-icons';
    import PlayerSelector from '$lib/components/tournament/player_selector.svelte';
    import BracketCreator from '$lib/components/tournament/bracket_creator.svelte';
    import { pageTitle } from '$lib/stores';
	import type { Player } from '$lib/models/player.js';
    import type { Match } from '$lib/models/match.js';
	import type { Tournament } from '$lib/models/tournament.js';

    pageTitle.set('Edytuj turniej');

    export let data;
    let tournament: Tournament = data.tournament;
    let allPlayers: Player[] = data.players;
    let playersInTournament: Player[] = tournament.players;
    let tournamentBracket: Match | undefined = tournament.matchHead;
</script>

<form action="?/edit" method="post">
    <input type="hidden" name="id" value={tournament._id}>

    <div>
        <div class="flex items-center gap-2 mb-2">
            <Fa icon={faList} />
            <p class="text-2xl font-semibold">Dane</p>
        </div>
        <div class="flex flex-col gap-2 mt-2 mb-4">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <Fa icon={faFont} />
                    <p class="font-medium">Nazwa turnieju</p>
                </div>
                <input name="name" type="text" placeholder="Aa" value={tournament.name} class="border rounded shadow px-4 py-2">
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <Fa icon={faCalendar} />
                    <p class="font-medium">Data i godzina</p>
                </div>
                <input name="date" type="datetime-local" value={new Date(tournament.date).toISOString().slice(0, 16)} class="border rounded shadow px-4 py-2">
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <Fa icon={faHourglass} />
                    <p class="font-medium">Tempo</p>
                </div>
                <input name="tempo" type="text" placeholder="np. 2'+3&quot;" value={tournament.tempo} class="border rounded shadow px-4 py-2">
            </div>
        </div>
    </div>

    <div class="flex items-center gap-2 mb-2">
        <Fa icon={faPerson} />
        <p class="text-2xl font-semibold">Zawodnicy</p>
    </div>

    <PlayerSelector allPlayers={allPlayers} bind:playersSelected={playersInTournament} />
    <input type="hidden" name="players" value={JSON.stringify(playersInTournament)}>

    <div class="flex items-center gap-2 mb-2 mt-4">
        <Fa icon={faDiagramProject} />
        <p class="text-2xl font-semibold">Drabinka</p>
    </div>

    <BracketCreator playersInTournament={playersInTournament} bind:tournamentBracket={tournamentBracket} />
    <input type="hidden" name="bracket" value={JSON.stringify(tournamentBracket)}>

    <input class="w-full bg-green-600 hover:bg-green-700 text-white rounded shadow mt-2 font-medium py-5 my-2" type="submit" value="Edytuj turniej">
</form>
<form action="?/delete" method="post">
    <input type="hidden" name="id" value={tournament._id}>
    <input class="w-full bg-red-600 hover:bg-red-700 text-white rounded shadow font-medium py-5 mb-5" type="submit" value="Usuń turniej">
</form>