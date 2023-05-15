import { gql, useQuery } from '@apollo/client'
import React from 'react'

const QUERY_USERSDATA = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
        }
}
`

function DisplayData() {
    const { data, loading, error } = useQuery(QUERY_USERSDATA);

    if (loading) {
        return <h1> DATA IS LOADING...</h1>
    }

    if (error) {
        console.log(error)
    }

    return (
        <div>
            1.
        </div>
    )
}

export default DisplayData;
