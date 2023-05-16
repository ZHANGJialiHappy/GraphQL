import { gql, useQuery } from '@apollo/client'
import React from 'react'

const QUERY_USERSDATA = gql`
    query UsersData {
        users {
            id
            name
            age
            username
            nationality
        }
}
`

const QUERY_MOVIESDATA = gql`
    query MoviesData {
        movies {
            name
            yearOfPublication
            isInTheaters
        }
    }
`

function DisplayData() {
    const { data, loading, error } = useQuery(QUERY_USERSDATA);
    const { data: movieData } = useQuery(QUERY_MOVIESDATA);


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
            <h1>List of Users</h1>
            {data &&
                data.users.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>Name:{user.name}</p>
                            <p>Username:{user.username}</p>
                            <p>Age:{user.age}</p>
                            <p>Nationality:{user.nationality}</p>
                        </div>
                    )
                })}
            <h1>List of Movies</h1>
            {movieData &&
                movieData.movies.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <p>Movie Name:{movie.name}</p>
                            <p>Publicated in:{movie.yearOfPublication}</p>
                            <p>Is it in theaters:{movie.isInTheaters}</p>
                        </div>
                    )
                })}
        </div>
    )
}

export default DisplayData;
