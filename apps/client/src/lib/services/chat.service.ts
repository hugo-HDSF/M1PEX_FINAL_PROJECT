import { gqlClientAuth } from "./base.service";
import {
	MESSAGES_BY_DISCUSSION_ASC_QUERY
} from '$lib/graphql/queries/data';

const messagesByDiscussionAsc = async (discussionId: string) => {
	const result = await gqlClientAuth.query(MESSAGES_BY_DISCUSSION_ASC_QUERY, {
		discussionId
	}).toPromise();
	console.log(result);
	if (result.error) throw result.error;
	console.log("result", result);
	return result.data!.messagesByDiscussionAsc;
	
}

const chatService = {
	messagesByDiscussionAsc
}

export default chatService;