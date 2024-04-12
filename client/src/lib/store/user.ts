import type { User } from "$lib/types/user";
import { writable } from "svelte/store";

function userdata() {
	const { subscribe, update } = writable<User | null>(null);

	return {
		subscribe,
		setUser: (data: any) =>
			update((n) => {
				n = {
					id: data.id,
					name: data.name,
					email: data.email,
				};
				return n;
			}),
		unsetStore: () =>
			update((n) => {
				n = null;
				return n;
			}),
	};
}

export const userStore = userdata();
