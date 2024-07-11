import { gql } from "@urql/svelte"


export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            access_token
            id
            email
            username
            phoneNumber
        }
    }
`

export const REGISTER_MUTATION = gql`
    mutation Register($registerUserInput: CreateUserInput!) {
        register(registerUserInput: $registerUserInput) {
            id
            username
            email
            phoneNumber
        }
    }
`