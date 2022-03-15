import React from "react";
import {Link} from "react-router-dom";
import {useState , useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getCharacters , filterCharactersByStatus , filterCreated , orderByName} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'
import SearchBar from "./SearchBar";






export default function Home(){

    const dispatch = useDispatch()
    const allcharacters = useSelector((state) => state.characters)
    const [orden,setOrden] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const [charactersPerPage,setCharactersPerPage] = useState(6)
    const indexOfLastCharacter = currentPage * charactersPerPage //6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage //0
    const currentCharacters = allcharacters.slice(indexOfFirstCharacter,indexOfLastCharacter)
    // pagina    primer indice    ultimo indice
    //    1           0                 6            6 personajes
    //    2           6                 13           6 personajes y asi hasta terminar paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getCharacters());
    },[])

    function handleClick (e){
        e.preventDefault();
        dispatch(getCharacters());
    }

    function handleFilterStatus(e){
        // e.preventDefault();
        dispatch(filterCharactersByStatus(e.target.value))
    }

    function handleFilterCreated(e){
        // e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }
    
    function handleorderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    
            
    
    return (
        <>

        <div className={styles.home}>
       
        <div>
           <select className={styles.btn} onChange={e => handleorderByName(e)}>
                <option value= 'asc'>Ascendente</option>
                <option value= 'desc'>Descendente</option>
            </select>
            <select className={styles.btn} onChange={e => handleFilterStatus(e)}>
                <option value= 'All'>Todos</option>
                <option value= 'Alive'>Vivo</option>
                <option value= 'Deceased'>Muerto</option>
                <option value= 'Unknown'>Desconocido</option>
                <option value= 'Presumed dead'>Provablemente muerto</option>
            </select>
            <select className={styles.btn} onChange={e => handleFilterCreated(e)}>
                <option value= 'All'>Todos</option>
                <option value= 'created'>Creados</option>
                <option value= 'api'>Existentes</option>
            </select>
        <SearchBar/> 
          
            <Link className={styles.btn3} to='/character' >Crear Personajes</Link>
            {/* <h1 className={styles.author}>Breaking Bad</h1> */}
            {/* <button className={styles.btn2} onClick={ e => {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button> */}
            {
                
                currentCharacters?.map(el => {
                    return(
                        <fragment >
                            <Link to={"/characters/" + el.id} >
                               <Card name={el.name} image={el.img ? el.img : el.image} nickname={el.nickname} key={el.id}/>
                            </Link>
                        </fragment>
                    );
                 })
                 
            }
            <Paginado
            charactersPerPage={charactersPerPage}
            allCharacters={allcharacters.length}
            paginado={paginado}
            />

        </div>
        </div> 
       
        </>
    )

}