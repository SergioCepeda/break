import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {postCharacter,getOccupations} from '../actions/index';
import { useDispatch,useSelector } from "react-redux";
import styles from "./CharacterCreate.module.css";

function validate(input) {
    let errors = {} ;
    if (!input.name) {
        errors.name = 'Se requiere un Nombre'
    }else if (!input.nickname) {
        errors.nickname = 'Nickname debe ser completado'
    }
    return errors;
}

export default function CharacterCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const occupations = useSelector((state) => state.occupations)
    
    const [errors,setErrors] = useState({});
    const [input,setInput] = useState({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        image: "",
        occupation: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value 
        }))
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status : e.target.value 
            })
        }   
    }

    function handleSelect(e){
            setInput({
                ...input,
                occupation : [...input.occupation,e.target.value] 
            })
        } 
        
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postCharacter(input))
        alert("Personaje creado")
        setInput({
            name: "",
            nickname: "",
            birthday: "",
            status: "",
            image: "",
            occupation: []
        })
        history('/home')
    }
    function handleDelete(el){
        setInput({
            ...input,
            occupation : input.occupation.filter(occ => occ !== el)
        })
    }
    

    useEffect(() => {
        dispatch(getOccupations());
    },[dispatch]);

    return(
        <div className={styles.mainContainerCreation} >
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu personaje!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Nickname:</label>
                    <input
                    type= "text"
                    value= {input.nickname}
                    name= "nickname"
                    onChange={handleChange}
                    />
                    {errors.nickname && (
                        <p className="error">{errors.nickname}</p>
                    )}    
                </div>
                <div>
                    <label>Cumpleaños:</label>
                    <input
                    type= "text"
                    value= {input.birthday}
                    name= "birthday"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type= "text"
                    value= {input.image}
                    name= "image"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <label><input
                    type= "checkbox"
                    value= "Alive"
                    name= "Alive"
                    onChange={handleCheck}
                    />Alive</label>
                    <label><input
                    type= "checkbox"
                    value= "Deceased"
                    name= "Deceased"
                    onChange={handleCheck}
                    />Deceased</label>
                    <label><input
                    type= "checkbox"
                    value= "Unknown"
                    name= "Unknown"
                    onChange={handleCheck}
                    />Unknown</label>
                    <label><input
                    type= "checkbox"
                    value= "Presumed dead"
                    name= "Presumed dead"
                    onChange={handleCheck}
                    />Presumed dead</label>
                    
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {occupations.map((el) =>(
                        <option value={el.name}>{el.name}</option>
                    ))}
                </select>
                <ul><li>{input.occupation.map(el => el + ",")}</li></ul>
                <button type='submit'>Crear Personaje</button>

            </form>
            {input.occupation.map(el => 
                <div className="">
                    <p>{el}</p>
                    <button className="" onClick={() => handleDelete(el)}>x</button>
                </div>
            )}
        </div>
    )

}