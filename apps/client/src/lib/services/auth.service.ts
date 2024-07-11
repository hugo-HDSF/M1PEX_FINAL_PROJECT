import { gqlClientAuth, gqlClient } from "./base.service";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "$lib/graphql/queries/auth";
import { DISCUSSIONS_BY_USER_QUERY } from '$lib/graphql/queries/data';

const login = async (email: string, password: string) => {
	const result = await gqlClientAuth.mutation(LOGIN_MUTATION, {
		email,
		password
	}).toPromise();
	if (result.error) throw result.error;
	return result.data!.login;
}

const register = async (email: string, password: string, username: string, phoneNumber: string) => {
	const result = await gqlClient.mutation(REGISTER_MUTATION, {
		registerUserInput: {
			email,
			password,
			username,
			phoneNumber,
		}
	}).toPromise();
	if (result.error) throw result.error;
	return result.data!.register;
}

const dicussionsByUser = async (userId: string) => {
	const result = await gqlClientAuth.query(DISCUSSIONS_BY_USER_QUERY, {
		userId
	}).toPromise();
	if (result.error) throw result.error;
	return result.data!.discussionsByUser;
	
}

const authService = {
	login,
	register,
	dicussionsByUser
}

export default authService;