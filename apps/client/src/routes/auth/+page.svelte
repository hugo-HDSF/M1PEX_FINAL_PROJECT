<script lang="ts">
	import { Button } from "@components/ui/button/index";
	import * as Card from "@components/ui/card/index";
	import { Label } from "@components/ui/label/index";
	import { Input } from "@components/ui/input/index";
	import * as Tabs from '@components/ui/tabs';
	import * as Alert from "@components/ui/alert";
	import { goto } from '$app/navigation';
	import { setContext } from 'svelte';
	import authService from '$lib/services/auth.service';
	import {
		saveAuthToken,
		setSession
	} from '$lib/services/local-storage.service';

	let email = '';
	let password = '';
	let username = '';
	let phoneNumber = '';

	let showAlert = false;


	async function register() {
		try {
			const data = await authService.register(email, password, username, phoneNumber);
			showAlert = true;
		} catch (e) {
			handleError(e);
		}
	}

	async function login(data: never) {
		try {
			const data = await authService.login(email, password);
			console.log(data);
			saveAuthToken(data!.access_token);
			setSession(data!.id, data!.email, data!.username, data!.phoneNumber);
			goto('/');
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
<div class="p-20 items-center gap-6">
    <Tabs.Root value="auth">
        <Card.Root>
            <Card.Header class="space-y-1">
                <div class="flex items-center px-4 py-2">
                    <Tabs.List>
                        <Tabs.Trigger value="register"
                                      class="text-zinc-600 dark:text-zinc-200">
                            Register
                        </Tabs.Trigger>
                        <Tabs.Trigger value="signin"
                                      class="text-zinc-600 dark:text-zinc-200">
                            Sign In
                        </Tabs.Trigger>
                    </Tabs.List>
                </div>
                {#if showAlert}
                    <Alert.Root>
                        <Alert.Title>Congrats!</Alert.Title>
                        <Alert.Description
                        >You can now login using your credentials.
                        </Alert.Description
                        >
                    </Alert.Root>
                {/if}
                <Card.Title class="text-2xl">Sign In</Card.Title>
                <Card.Description>Enter your email below to Sign In
                </Card.Description>
            </Card.Header>
            <Tabs.Content value="register" class="m-0">
                <form on:submit|preventDefault={register}>
                    <Card.Content class="grid gap-4">
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <Label for="email">Email</Label>
                                <Input id="email" type="email"
                                       bind:value={email}
                                       placeholder="user@gmail.com" required/>
                            </div>
                            <div class="grid gap-2">
                                <Label for="password">Password</Label>
                                <Input id="password" type="password"
                                       bind:value={password}
                                       required/>
                            </div>
                            <div class="grid gap-2">
                                <Label for="username">Username</Label>
                                <Input id="username" type="text"
                                       bind:value={username}
                                       placeholder="user" required/>
                            </div>
                            <div class="grid gap-2">
                                <Label for="phone-number">Phone number</Label>
                                <Input id="phone-number" type="tel"
                                       bind:value={phoneNumber}
                                       placeholder="0770809956" required/>
                            </div>
                        </div>
                    </Card.Content>
                    <Card.Footer>
                        <Button type="submit" class="w-full">Login</Button>
                    </Card.Footer>
                </form>
            </Tabs.Content>
            <Tabs.Content value="signin" class="m-0">
                <form on:submit|preventDefault={login}>
                    <Card.Content class="grid gap-4">
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <Label for="email">Email</Label>
                                <Input id="email" type="email"
                                       bind:value={email}
                                       placeholder="user@gmail.com" required/>
                            </div>
                            <div class="grid gap-2">
                                <Label for="password">Password</Label>
                                <Input id="password" type="password"
                                       bind:value={password}
                                       required/>
                            </div>
                        </div>
                    </Card.Content>
                    <Card.Footer>
                        <Button type="submit" class="w-full">Login</Button>
                    </Card.Footer>
                </form>
            </Tabs.Content>
        </Card.Root>
    </Tabs.Root>
</div>