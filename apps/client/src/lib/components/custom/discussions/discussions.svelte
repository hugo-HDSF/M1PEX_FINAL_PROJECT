<script lang="ts">
	import discussionService from '$lib/services/discussion.service';
	import { getSession } from '$lib/services/local-storage.service';
	import { ScrollArea } from '@components/ui/scroll-area';
	import { cn } from '$lib/utils';
	import { discussionStore, setDiscussion } from '$lib/stores/discussion';

	//@ts-ignore
	let discussionsList: any[] = [];

	$: fetchDiscussions();

	async function fetchDiscussions() {
		try {
			const user = getSession();
			discussionsList = await discussionService.dicussionsByUser(user.id!);
			console.log(discussionsList);
		} catch (e) {
			handleError(e);
		}
	}

	function handleError(error: any) {
		if (typeof error === 'string') {
			console.log(error);
		} else if (error instanceof Error) {
			console.log(error);
		}
	}

</script>

<ScrollArea class="h-screen">
    <div class="flex flex-col gap-2 p-4">
        {#each discussionsList as discussion}
            <button
                    class={cn(
					"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
					$discussionStore.selected === discussion.id && "bg-muted"
				)}
                    on:click={() => setDiscussion(discussion.id)}
            >
                <div class="flex w-full flex-col gap-1">
                    <div class="flex items-center">
                        <div class="flex items-center gap-2">
                            <div class="font-semibold">{discussion.name}</div>
                        </div>
                        <div
                                class={cn(
								"ml-auto text-xs",
								$discussionStore.selected === discussion.id
									? "text-foreground"
									: "text-muted-foreground")}
                        >
                        </div>
                    </div>
                    {#each discussion.users as user}
                        <div class="text-xs font-medium">{user.username}</div>
                    {/each}
                </div>
                <div class="line-clamp-2 text-xs text-muted-foreground">
                    many messages...
                </div>
            </button>
        {/each}
    </div>
</ScrollArea>
