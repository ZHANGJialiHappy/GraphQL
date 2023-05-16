import { gql, useQuery } from '@apollo/client'
import React from 'react'

const QUERY_USERSDATA = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
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

    if (data) {
        console.log(data)
    }

    return (
        <div>
            {data &&
                data.users.map((user) => {
                    return (
                        <div key = {user.id}>
                            <h1>Name:{user.name}</h1>
                            <h1>Username:{user.username}</h1>
                            <h1>Age:{user.age}</h1>
                            <h1>Nationality:{user.nationality}</h1>
                        </div>
                    )
                })}
        </div>
    )
}

export default DisplayData;
