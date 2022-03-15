import React from "react";
import {useEffect } from "react";
import {NavLink } from 'react-router-dom';
import {getDetail} from '../actions/index';
import { useDispatch,useSelector } from "react-redux";
import styles from "./Detail.module.css";
import Loading from "./Loading"
export default function Detail (props){
 console.log(props)  
 
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));

    },[dispatch])

    // const {id } = useParams();
    // useEffect(() => {
    //     dispatch(getDetail(id));
    // }, [dispatch,(id)]);
  

    const myCharacter = useSelector ((state) => state.detail)

    return(
        <div className={styles.component}>
        <Loading/>
         <NavLink to = '/home'>
                <button className={styles.createButton}>Volver</button>
            </NavLink>


            {
               myCharacter.length > 0 ?
               <div  className={styles.CardRed}>
                   <h1 className={styles.title}>Soy {myCharacter[0].name}</h1>
                   <img src= {myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image} alt="" width="500px" height="700px" className={styles.img} />
                   <h2 className={styles.title2} >Status: {myCharacter[0].status}</h2>  
                   <p className={styles.title2} >Cumpleaños: {myCharacter[0].birthday}</p>
                   <h4 className={styles.title2}>Ocupaciones: {!myCharacter[0].createdInDb? myCharacter[0].occupation + " " : myCharacter[0].occupations.map(el => el.name + (' '))}</h4>
               </div> : 
                <h4><Loading /></h4>
            }
            

        </div> 
    )
}