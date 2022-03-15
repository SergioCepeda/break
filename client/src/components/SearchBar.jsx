import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { getNameCharacters } from '../actions';
import styles from "./SearchBar.module.css";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name,setName]=useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    // function handleSubmit(e){
    //     e.preventDefault()
    //     dispatch(getNameCharacters(name))
    // }
    function handleClick(e) {
        e.preventDefault();
        if (name.length === 0) {
          return alert("Please input a name to start the search");
        } else {
          dispatch(getNameCharacters(name));  
          setName("");
        }
        

      }

    return(
      <div className={styles.search}>
        <h1 className={styles.l}>Breaking Bad</h1>
            <input
            value= {name}
            className={styles.input}
            type='text'
            placeholder='Buscar...'
            onChange={(e) => handleInputChange(e)} 
            />
            <button className={styles.btn} type='submit' onClick={handleClick}>Buscar</button>
            {/* <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button> */}
        </div>
    )
         

}