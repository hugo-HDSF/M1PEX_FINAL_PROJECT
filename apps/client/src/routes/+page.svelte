<script lang="ts">
	import * as Resizable from '@components/ui/resizable';
	import { Separator } from '@components/ui/separator';
	import * as Tabs from '@components/ui/tabs';
	import { Input } from '@components/ui/input';
	import { Discussions } from '@components/custom/discussions';
	import { Chat } from '@components/custom/chat';
	import { CreateDiscussion } from '@components/custom/create-discussion';

	export let defaultLayout = [265, 1095];
	export let navCollapsedSize: number;

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { setContextClient } from '@urql/svelte';

	import { gqlClientAuth } from '$lib/services/base.service';
	import { getAccessToken } from '$lib/services/local-storage.service';

	onMount(() => {
		const accessToken = getAccessToken();

		if (!accessToken) return goto(`/auth`);
	});

	setContextClient(gqlClientAuth);

</script>

<Resizable.PaneGroup
        direction="horizontal"
        class="h-full max-h-[800px] items-stretch">
    <Resizable.Pane
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible
            minSize={15}
            maxSize={20}>
        <div class="relative">
            <h1 class="text-xl font-bold px-4 py-2 pl-8">
                Discussions
            </h1>
        </div>
        <Separator/>
        <CreateDiscussion/>
        <Discussions/>
    </Resizable.Pane>
    <Resizable.Handle withHandle/>
    <Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
        <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">Chat</h1>
        </div>
        <Separator/>
        <div
                class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        </div>
        <Chat/>
    </Resizable.Pane>
</Resizable.PaneGroup>
