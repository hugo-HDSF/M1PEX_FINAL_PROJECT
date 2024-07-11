export const accessTokenKey = "access_token";

export function saveAuthToken(accessToken: string) {
	localStorage.setItem(accessTokenKey, accessToken);
}

export function getAccessToken(): string | null {
	try {
		return localStorage.getItem(accessTokenKey);
	} catch {
		return null;
	}
}

export function getSession() {
	return {
		id: localStorage.getItem("id"),
		email: localStorage.getItem("email"),
		username: localStorage.getItem("username"),
		phoneNumber: localStorage.getItem("phoneNumber"),
		
	}
}

export function setSession(id: string, email: string, username: string, phoneNumber: string) {
	localStorage.setItem("id", id);
	localStorage.setItem("email", email);
	localStorage.setItem("username", username);
	localStorage.setItem("phoneNumber", phoneNumber);
}

export function clearAuthTokens(): void {
	localStorage.clear()
}

export function saveNewAccessToken(newToken: string) {
	localStorage.setItem(accessTokenKey, newToken);
}