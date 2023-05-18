import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
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

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
        name
        id
        } 
    }
`

const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            id
        }
    }
`

function DisplayData() {
    const [movieSearch, setMovieSearch] = useState("")

    // Create User States
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState("")

    // delete user
    const [id, setId] = useState("")

    const { data, loading, refetch } = useQuery(QUERY_USERSDATA);
    const { data: movieData } = useQuery(QUERY_MOVIESDATA);
    const [fetchMovie, { data: movieSearchData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);
    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);

    if (loading) {
        return <h1> DATA IS LOADING...</h1>
    }

    return (
        <div>
            <h1>List of Movies</h1>
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
            {movieData &&
                movieData.movies.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <p>Movie Name:{movie.name}</p>
                            <p>Publicated in:{movie.yearOfPublication}</p>
                        </div>
                    )
                })}
            <h1>List of Users</h1>
            <div>
                <input type="text" placeholder="Name..." onChange={(event) => { setName(event.target.value) }} />
                <input type="text" placeholder="Username..." onChange={(event) => { setUsername(event.target.value) }} />
                <input type="number" placeholder="Age..." onChange={(event) => { setAge(Number(event.target.value)) }} />
                <input type="text" placeholder="NATIONALITY..." onChange={(event) => { setNationality(event.target.value.toUpperCase()) }} />
                <button
                    onClick={() => {
                        createUser({
                            variables: { input: { name, username, age, nationality } },
                        });
                        refetch();
                    }}>
                    Create User
                </button>
            </div>
            <div>
            <input type="text" placeholder="id..." onChange={(event) => { setId(event.target.value) }} />
                <button
                    onClick={() => {
                        deleteUser({
                            variables: { deleteUserId: id },
                        });
                        refetch();
                    }}>
                    delete User
                </button> 
            </div>
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
        </div>
    )
}

export default DisplayData;
