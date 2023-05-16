import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'

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

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`

function DisplayData() {
    const [movieSearch, setMovieSearch] = useState("")
    const { data, loading, error } = useQuery(QUERY_USERSDATA);
    const { data: movieData } = useQuery(QUERY_MOVIESDATA);
    const [fetchMovie, { data: movieSearchData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME)


    if (loading) {
        return <h1> DATA IS LOADING...</h1>
    }

    if (error) {
        console.log(error)
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
                        </div>
                    )
                })}
            <div>
                <input
                    type="text"
                    placeholder="Interstellar..."
                    onChange={(event) => { setMovieSearch(event.target.value) }} />
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            name: movieSearch,
                        }
                    })
                }}>Search Movie</button>
                <div>
                    {movieSearchData && 
                    <div>
                        <p>Movie's Name: {movieSearchData.movie.name}</p>
                        <p>Publicated in: {movieSearchData.movie.yearOfPublication}</p>
                    </div>
                    }
                    {movieError && <p>{movieSearch} can't be found.</p>}
                </div>
            </div>
        </div>
    )
}

export default DisplayData;
