import { writable } from 'svelte/store';

export const discussionStore = writable({
  selected: null,
});

export function setDiscussion(discussionId: string) {
	console.log(discussionId);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
	discussionStore.update(store => ({ ...store, selected: discussionId }));
}

export function getDiscussion() {
	return discussionStore;
}
