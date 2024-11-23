<script lang="ts">
    import "../app.css";

    import Fa from 'svelte-fa';
    import { faLock, faCalendar, faClock, faHourglass, faPerson, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
    import { navigating } from "$app/stores";
    import { pageTitle, tournamentDate, tournamentTempo, tournamentPlayersCount } from '$lib/stores';
    import { fly } from "svelte/transition";
	import { DoubleBounce } from 'svelte-loading-spinners';
    import { browser } from "$app/environment";

    export let data;
    let darkThemeOn = true;
    if (browser) {
        let userPreference = localStorage.getItem('darkMode');

        if (userPreference === null) {
            darkThemeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            darkThemeOn = userPreference === 'true';
        }
    }

    $: {
        if (browser) {
            document.body.classList.toggle('dark', darkThemeOn);
            localStorage.setItem('darkMode', darkThemeOn.toString());
        }
    }

    $: {
        if ($navigating) {
            tournamentDate.set(undefined);
            tournamentTempo.set(undefined);
            tournamentPlayersCount.set(undefined);
        }
    }
</script>

<svelte:head>
    <title>{$pageTitle} &mdash; Polyspear Arbiter</title>
</svelte:head>
  
<nav class="px-5 sm:px-24 xl:px-48 2xl:px-96 shadow">
    <div class="flex items-center w-full py-2">
        <a href="/">
            <p class="text-white font-bold text-xl">Polyspear Arbiter</p>
        </a>
        <button on:click={() => darkThemeOn = !darkThemeOn} class="flex items-center ml-auto py-2 hover:bg-white hover:bg-opacity-15 rounded">
            <Fa icon={darkThemeOn ? faMoon : faSun} color="#ffffff" class="pl-2"/>
            <p class="text-white text-base px-2">{darkThemeOn ? 'Ciemny' : 'Jasny'}</p>
        </button>
        <a href={data.user !== undefined ? '/logout' : '/login'} data-sveltekit-reload={data.user !== undefined} class="flex items-center py-2 hover:bg-white hover:bg-opacity-15 rounded">
            <Fa icon={faLock} color="#ffffff" class="pl-2"/>
            <p class="text-white text-base px-2">{data.user !== undefined ? 'Wyloguj się' : 'Zaloguj się'}</p>
        </a>
    </div>
    <div class="flex items-center flex-wrap">
        <p class="text-white text-4xl pb-4">{$pageTitle}</p>
        <div class="flex items-center md:ml-auto divide-x pb-4">
            {#if $tournamentDate}
                <div>
                    <p class="text-white text-lg text-center">{String($tournamentDate.getDate()).padStart(2, '0')}.{String($tournamentDate.getMonth()).padStart(2, '0')}</p>
                    <div class="flex items-center justify-center h-full">
                        <Fa icon={faCalendar} color="#ffffff" class="pl-2"/>
                        <p class="text-white font-light text-sm px-2">Data</p>
                    </div>
                </div>
                <div>
                    <p class="text-white text-lg text-center">{String($tournamentDate.getHours()).padStart(2, '0')}:{String($tournamentDate.getMinutes()).padStart(2, '0')}</p>
                    <div class="flex items-center h-full">
                        <Fa icon={faClock} color="#ffffff" class="pl-2"/>
                        <p class="text-white font-light text-sm px-2">Godz.</p>
                    </div>
                </div>
            {/if}
            {#if $tournamentTempo}
                <div>
                    <p class="text-white text-lg text-center">{$tournamentTempo}</p>
                    <div class="flex items-center h-full">
                        <Fa icon={faHourglass} color="#ffffff" class="pl-2"/>
                        <p class="text-white font-light text-sm px-2">Tempo</p>
                    </div>
                </div>
            {/if}
            {#if $tournamentPlayersCount}
                <div>
                    <p class="text-white text-lg text-center">{$tournamentPlayersCount}</p>
                    <div class="flex items-center h-full">
                        <Fa icon={faPerson} color="#ffffff" class="pl-2"/>
                        <p class="text-white font-light text-sm px-2">Zawod.</p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</nav>
{#key data.url}
    <article class="px-5 sm:px-24 xl:px-48 2xl:px-96 pt-6 flex-grow" in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
        {#if $navigating}
            <div class="flex w-full h-full justify-center">
                <DoubleBounce size="40" color="rgba(37,99,235,1)" unit="px" duration="1s" />
            </div>
        {:else}
            <slot />
        {/if}
    </article>
{/key}
<footer class="px-5 sm:px-24 xl:px-48 2xl:px-96 text-white py-2 mt-6">
    🌀 Wir, śmierdzielu! 🌀
</footer>

<style>
    nav, footer {
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,110,255,1) 100%);
    }
</style>