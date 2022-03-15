import React from "react";
import styles from './Paginado.module.css'

export default function Paginado ({allCharacters,paginado,charactersPerPage}){
    const pageNumbers = []
    
    for (let i = 0; i <= Math.ceil(allCharacters/charactersPerPage)-1 ; i++) {
        pageNumbers.push(i + 1)    
    }
    // console.log(pageNumbers)
    // console.log(characterPerPage)
    return(
        <nav className={styles.centrado}>
            <ul className={styles.list} >
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li className={styles.items} key={number} >
                        <a className={styles.a} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}