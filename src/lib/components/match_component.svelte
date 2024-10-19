<script lang="ts">
    import { UA } from 'country-flag-icons/string/3x2';
    import { ES } from 'country-flag-icons/string/3x2';

    export let leftBinding: 'up' | 'down' | 'straight' | undefined = undefined;
    export let rightBinding: 'up' | 'down' | 'straight' | undefined = undefined;

    let leftClasses = '';
    if (leftBinding === 'down') leftClasses = 'bottom-0 border-t border-l';
    else if (leftBinding === 'up') leftClasses = 'top-0 border-b border-l'; 
    else if (leftBinding === 'straight') leftClasses = 'bottom-0 border-t';
    
    let rightClasses = '';
    if (rightBinding === 'down') rightClasses = 'bottom-0 border-t border-r';
    else if (rightBinding === 'up') rightClasses = 'top-0 border-b border-r'; 
    else if (rightBinding === 'straight') rightClasses = 'bottom-0 border-t';
</script>


<div class="flex items-center relative h-full py-1">
    {#if leftBinding}
        <div class="w-10" />
        <div class="absolute left-0 w-10 h-1/2 {leftClasses}" />
    {/if}
    <div class="divide-y px-4 py-2 w-72 border rounded shadow">
        <div class="flex gap-2 h-8 items-center">
            <p class="text-slate-500">#4</p>
            <div class="w-6 rounded overflow-hidden">
                {@html UA}
            </div>
            <p>osc</p>
            <div class="flex divide-x ml-auto">
                <p class="w-7 text-center">0</p>
                <p class="w-7 text-center font-bold">9</p>
                <p class="w-10 text-center">9</p>
            </div>
        </div>
        <div class="flex gap-2 h-8 items-center">
            <p class="text-slate-500">#5</p>
            <div class="w-6 rounded overflow-hidden">
                {@html ES}
            </div>
            <p class="font-bold">p1ksel.</p>
            <div class="flex divide-x ml-auto">
                <p class="w-7 text-center font-bold">9</p>
                <p class="w-7 text-center">7</p>
                <p class="w-10 text-center font-bold">16</p>
            </div>
        </div>
    </div>
    {#if rightBinding}
        <div class="w-10"></div>
        <div class="absolute right-0 w-10 h-1/2 {rightClasses}" />
    {/if}
</div>