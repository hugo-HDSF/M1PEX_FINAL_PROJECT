import { gqlClientAuth } from "./base.service";
import { DISCUSSIONS_BY_USER_QUERY } from '$lib/graphql/queries/data';

const dicussionsByUser = async (userId: string) => {
	const result = await gqlClientAuth.query(DISCUSSIONS_BY_USER_QUERY, {
		userId
	}).toPromise();
	if (result.error) throw result.error;
	return result.data!.discussionsByUser;
	
}

const discussionService = {
	dicussionsByUser
}

export default discussionService;