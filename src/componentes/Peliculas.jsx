import React from "react";

function ListaDePeliculas({ pelis }) {
    return (
        <ul className = "peliculas">
            {
                pelis.map(peli => (
                    <li className="peli" key={peli.id}>
                        <h3>{peli.title}</h3>
                        <p>{peli.year}</p>
                        <img src={peli.poster} alt={peli.title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoSeEncuentranPeliculas(){
    return(
        <p>No se han encontrado peliculas para esta busqueda.</p>
    )
}

export function Peliculas({pelis}){
    const hayPeliculas = pelis?.length > 0;
    return(
        hayPeliculas
        ? <ListaDePeliculas pelis={pelis}/>
        : <NoSeEncuentranPeliculas />
    )
}