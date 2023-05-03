import React, { useState } from "react";
// import results from '../mokcs/result.json';
// import noresults from '../mokcs/no-result.json';
import { buscarPeliculas } from "../servicios/peliculas";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
// El useRef es una referencia mutable que persiste
// El useMemo memoiza un valor para no tener que volverlo a calcular
// El useCallback lo mismo que el usememo pero para funciones.

export function usePeliculas({buscar, sort}){
    
    const [peliculas, setPeliculas] = useState([]);
    const [carga, setCarga] = useState(false);
    const [error, setError] = useState(false);
    const busquedaAnterior = useRef(buscar);

  

    const getPeliculas = useCallback(async ({buscar}) =>{
        if(buscar === busquedaAnterior.current) return
        try{
            setCarga(true);
            setError(null);
            // Hace que la api no haga la llamada la pagina nuevamente si esta buscando la misma pelicula de antes.
            busquedaAnterior.current = buscar;
            const nuevaPelicula = await buscarPeliculas({buscar})
            setPeliculas(nuevaPelicula);

        }catch(e){
            setError(e.message);
        }finally{
            setCarga(false);
        }
    },[]);

    // const sortPeliculas = sort 
    // ? [...peliculas].sort((a,b) => a.title.localeCompare(b.title))
    // : peliculas

    const sortPeliculas = useMemo(() =>  {
        return sort
        ? [...peliculas].sort((a,b) => a.title.localeCompare(b.title))
        : peliculas
    },[sort,peliculas])

    return {peliculas : sortPeliculas, getPeliculas, carga};
  }