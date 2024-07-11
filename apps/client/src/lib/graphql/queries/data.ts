import { gql } from '@urql/svelte';

export const DISCUSSIONS_BY_USER_QUERY = gql`
    query discussionsByUser($userId: String!) {
        discussionsByUser(id: $userId) {
            id
            name
            createdAt
            updatedAt
            users {
                id
                username
            }
        }
    }
`;

export const MESSAGES_BY_DISCUSSION_ASC_QUERY = gql`
    query MessagesByDiscussionAsc($discussionId: String!) {
        messagesByDiscussionAsc(discussionId: $discussionId) {
            id
            content
            createdAt
            updatedAt
            user {
                id
                username
                email
            }
        }
    }
`;