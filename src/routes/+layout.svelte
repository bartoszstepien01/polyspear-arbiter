<script>
    import "../app.css";

    import Fa from 'svelte-fa';
    import { faLock, faCalendar, faClock, faHourglass, faPerson } from '@fortawesome/free-solid-svg-icons';
</script>
  
<nav class="px-96 shadow">
    <div class="flex items-center w-full py-2">
        <p class="text-white font-bold text-xl">Polyspear Arbiter</p>
        <button class="flex items-center ml-auto py-2 hover:bg-white hover:bg-opacity-15 rounded">
            <Fa icon={faLock} color="#ffffff" class="pl-2"/>
            <p class="text-white text-base px-2">Zaloguj się</p>
        </button>
    </div>
    <div class="flex items-center pb-4">
        <p class="text-white text-4xl">IV Turniej Polyspeara</p>
        <div class="flex items-center ml-auto divide-x">
            <div>
                <p class="text-white text-lg text-center">18.10</p>
                <div class="flex items-center justify-center h-full">
                    <Fa icon={faCalendar} color="#ffffff" class="pl-2"/>
                    <p class="text-white font-light text-sm px-2">Data</p>
                </div>
            </div>
            <div>
                <p class="text-white text-lg text-center">19:00</p>
                <div class="flex items-center h-full">
                    <Fa icon={faClock} color="#ffffff" class="pl-2"/>
                    <p class="text-white font-light text-sm px-2">Godz.</p>
                </div>
            </div>
            <div>
                <p class="text-white text-lg text-center">2'+3"</p>
                <div class="flex items-center h-full">
                    <Fa icon={faHourglass} color="#ffffff" class="pl-2"/>
                    <p class="text-white font-light text-sm px-2">Tempo</p>
                </div>
            </div>
            <div>
                <p class="text-white text-lg text-center">6</p>
                <div class="flex items-center h-full">
                    <Fa icon={faPerson} color="#ffffff" class="pl-2"/>
                    <p class="text-white font-light text-sm px-2">Zawod.</p>
                </div>
            </div>
        </div>
    </div>
</nav>
<article class="px-96 pt-6">
    <slot />
</article>

<style>
    nav {
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,110,255,1) 100%);
    }
</style>