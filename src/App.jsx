import { useEffect, useState } from 'react';
import './App.css';
import { Peliculas } from './componentes/Peliculas';
import { usePeliculas } from './hooks/usePeliculas';
import { useRef } from 'react';



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
  const {buscar , actualizarBusqueda, error} = useBuscar();

  const {peliculas, getPeliculas, carga} = usePeliculas({buscar});
  // const inputRef = useRef();

  const handleSubmit = (event) =>{
    event.preventDefault();
    const data = new window.FormData(event.target);
    const query = data.get('query');
    getPeliculas();
  }

  const handleChangue = (event) =>{
    actualizarBusqueda(event.target.value);
  }

  
  return (
    <>
      <div id='pagina'>
        <header>
          <h1>Buscador de Peliculas</h1>
          <form action="" className='form' onSubmit={handleSubmit}>
            <input onChange={handleChangue} value={buscar} name='query' type="text" placeholder='Hulk, Furia de Titanes, Psicopata Americano...' />
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
