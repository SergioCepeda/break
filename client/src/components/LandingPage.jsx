import React from "react";
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css"




export default function LandingPage () {
  

    
      
    return (
        
        <div className={styles.bg}> 
   

        
           <h1 className={styles.buttonIng}>Bienvenidos a  breaking bad</h1>

           
           <h2 className={styles.author}>Sergio Cepeda</h2>
           <Link to='/Home' >
               <button className={styles.buttonIng}>Ingresar</button>
           </Link>
         
        </div> 
         
         
       )
   }
        
        
       
  
     
         