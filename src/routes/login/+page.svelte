<script lang="ts">
	import Fa from 'svelte-fa';
	import { faUser, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
	import { enhance } from '$app/forms';
	import { pageTitle } from '$lib/stores';
	import type { ActionData } from './$types';

	pageTitle.set('Zaloguj się');

	export let form: ActionData;
</script>

<form method="post" use:enhance>
	<div class="flex flex-col gap-2 mt-2 mb-4">
		{#if form?.error}
			<div class="border rounded shadow bg-red-300 px-4 py-2 text-gray-900">
				{form.error}
			</div>
		{/if}
		<div>
			<div class="flex items-center gap-2 mb-1">
				<Fa icon={faUser} />
				<p class="font-medium">Nazwa użytkownika</p>
			</div>
			<input name="username" type="text" placeholder="Aa" class="border rounded shadow px-4 py-2">
		</div>
		<div>
			<div class="flex items-center gap-2 mb-1">
				<Fa icon={faKey} />
				<p class="font-medium">Hasło</p>
			</div>
			<input name="password" type="password" placeholder="••••• •••" class="border rounded shadow px-4 py-2">
		</div>
	</div>
	<button
		class="flex items-center h-full gap-2 mb-1 text-white bg-blue-600 hover:bg-blue-700 rounded shadow px-4 py-2"
	>
		<Fa icon={faLock} />
		<p>Zaloguj się</p>
	</button>
</form>
