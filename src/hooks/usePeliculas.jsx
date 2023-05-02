import React, { useState } from "react";
// import results from '../mokcs/result.json';
// import noresults from '../mokcs/no-result.json';
import { buscarPeliculas } from "../servicios/peliculas";
import { useRef } from "react";
// El useRef es una referencia mutable que persiste


export function usePeliculas({buscar}){
    
    const [peliculas, setPeliculas] = useState([]);
    const [carga, setCarga] = useState(false);
    const [error, setError] = useState(false);
    const busquedaAnterior = useRef(buscar);

  

    const getPeliculas = async () =>{
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
    }

    return {peliculas, getPeliculas, error, carga};
  }