import { writable } from 'svelte/store';

export const pageTitle = writable<string>('');
export const tournamentDate = writable<Date | undefined>(undefined);
export const tournamentTempo = writable<string | undefined>(undefined);
export const tournamentPlayersCount = writable<number | undefined>(undefined);