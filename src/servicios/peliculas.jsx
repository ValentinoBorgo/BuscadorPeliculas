import React from "react";

const API_KEY = '4287ad07';

export const buscarPeliculas = async ({ buscar }) => {

    if (buscar === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${buscar}`)
        const json = await response.json();

        const peliculas = json.Search;

        return peliculas?.map(peli => ({
            id: peli.imdbID,
            title: peli.Title,
            year: peli.Year,
            poster: peli.Poster,
        }))

    } catch (e) {
        throw new Error('Error buscando peliculas')
    }
}