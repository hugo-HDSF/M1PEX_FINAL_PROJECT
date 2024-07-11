import { jwtDecode } from "jwt-decode";
import { dev } from "$app/environment";
import { Client, cacheExchange, fetchExchange } from "@urql/svelte";
import { authExchange, type AuthUtilities } from "@urql/exchange-auth";

import { clearAuthTokens, getAccessToken } from "./local-storage.service";
import { goto } from '$app/navigation';

const auth = authExchange(async (utilities: AuthUtilities) => {
	let token = getAccessToken();
	return {
		addAuthToOperation(operation) {
			return token
				? utilities.appendHeaders(operation, {
					Authorization: `Bearer ${token}`,
				})
				: operation;
		},
		didAuthError(error) {
			// Check for "Forbidden" error response, caused when access token has expired.
			return error.response?.status === 403;
		},
		willAuthError() {
			// Sync tokens on every operation
			token = getAccessToken();
			
			if (token) {
				// If JWT has expired then run the refreshAuth func.
				const {exp} = jwtDecode(token);
				if (Date.now() >= exp! * 1000) return true;
			}
			
			return false;
		},
		async refreshAuth() {
			clearAuthTokens();
			await goto("/auth");
		},
	};
});


const gqlClientAuth = new Client({
	requestPolicy: "network-only",
	exchanges: [cacheExchange, auth, fetchExchange],
	url: dev ? "http://localhost:3100/graphql" : "<your_production_url>",
});

const gqlClient = new Client({
	requestPolicy: "network-only",
	exchanges: [cacheExchange, fetchExchange],
	url: dev ? "http://localhost:3100/graphql" : "<your_production_url>",
});

export { gqlClientAuth, gqlClient }
