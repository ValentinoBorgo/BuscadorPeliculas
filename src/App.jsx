import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Peliculas } from './componentes/Peliculas';
import { usePeliculas } from './hooks/usePeliculas';
import { useRef } from 'react';
import debounce from 'just-debounce-it';



function useBuscar(){
  const [buscar, actualizarBusqueda] = useState('');
  const [error,setError] = useState(null);
  const primerRender = useRef(true);

  useEffect(() =>{
    if(primerRender.current){
      primerRender.current = buscar === ''
      return
    }

    if(buscar === ''){
      setError('No se puede buscar una pelicula vacia');
      return
    }

    if(buscar.match(/^\d+$/)){
      setError('No se pueden buscar peliculas con un numero');
      return
    }

    if(buscar.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres');
      return
    }

    setError(null);
  },[buscar])

  return {buscar , actualizarBusqueda, error}
}



function App() {

  const [sort, setSort] = useState(false);

  const {buscar , actualizarBusqueda, error} = useBuscar();

  const {peliculas, getPeliculas, carga} = usePeliculas({buscar, sort});
  // const inputRef = useRef();

  const debouncePeliculas = useCallback(
    debounce(buscar =>{
    getPeliculas({buscar})
  },500)
  ,[]);


  const handleSort = () =>{
    setSort(!sort);
  }


  const handleSubmit = (event) =>{
    event.preventDefault();
    getPeliculas({buscar});
  }

  const handleChangue = (event) =>{
    const nuevaBusqueda = event.target.value;
    actualizarBusqueda(nuevaBusqueda);
    debouncePeliculas(nuevaBusqueda);
  }

  
  return (
    <>
      <div id='pagina'>
        <header>
          <h1>Buscador de Peliculas</h1>
          <form action="" className='form' onSubmit={handleSubmit}>
            <input onChange={handleChangue} value={buscar} name='query' type="text" placeholder='Hulk, Furia de Titanes, Psicopata Americano...' />
            <input type="checkbox" checked={sort} onChange={handleSort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{color : 'red' }}>{error}</p>}
        </header>

        <main>
          {carga ? <p>Cargando...</p> : <Peliculas pelis={peliculas}/>}
        </main>
      </div>
    </>
  )
}

export default App
