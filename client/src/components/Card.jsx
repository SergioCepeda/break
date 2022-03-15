import React from "react";
import styles from './Card.module.css'

export default function Card ({name,image,nickname}) {
    return (
        <div className="child-page-listing">
        <div className={styles.none}>
        <div className={styles.uClearfix}>
            <h3 className={styles.title}>{name}</h3>
            <h5 className={styles.title}>{nickname}</h5>
       
            <img className={styles.img} src={image} alt="img not found" width="200px" height="250px" />
            </div>
        </div>
        </div>
    )
}