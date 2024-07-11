<!-- src/routes/Chat.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getDiscussion } from '$lib/stores/discussion';
	import chatService from '$lib/services/chat.service';
	import { writable } from 'svelte/store';
	import * as Card from "@components/ui/card/index";
	import { getSession } from '$lib/services/local-storage.service';
	import { Input } from '@components/ui/input';

	const discussionStore = getDiscussion();
	let messages = writable([]);
	let discussionId = null;
	const currentUser = '';

	const {id} = getSession()

	//@ts-ignore
	let unsubscribe;

	onMount(() => {
		unsubscribe = discussionStore.subscribe(async store => {
			console.log('Store updated:', store);
			if (store.selected) {
				discussionId = store.selected;
				await fetchMessages(discussionId);
			}
		});
	});

	async function fetchMessages(discussionId: string) {
		try {
			console.log('Fetching messages for discussion ID:', discussionId);
			const data = await chatService.messagesByDiscussionASC(discussionId);
			console.log('Fetched messages:', data);
			messages.set(data);
		} catch (e) {
			console.error('Error fetching messages:', e);
		}
	}

	onDestroy(() => {
		//@ts-ignore
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<style>
    .message-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1rem;
    }

    .message-container.right {
        justify-content: flex-end;
    }

    .message-content {
        max-width: 75%;
    }

    .timestamp {
        font-size: 0.8rem;
        color: gray;
        margin-top: 0.5rem;
    }
</style>

<div class="p-10 items-center">
    {#each $messages as message}
        <div class="message-container {message.user.id === id ? 'right' : ''}">
            <Card.Root>
                <Card.Content>
                    <div class="message-content">
                        <strong>{message.user.username}</strong>: {message.content}
                        <div class="timestamp">{new Date(message.createdAt).toLocaleString()}</div>
                    </div>
                </Card.Content>
            </Card.Root>
        </div>
    {/each}
    <div
            class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
        <form>
            <div class="relative">
                <Input placeholder="message"/>
            </div>
        </form>
    </div>
</div>
