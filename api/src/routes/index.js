const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Occupation , Character} = require('../db');
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo=async () =>{
    const apiUrl = await axios.get(`https://breakingbadapi.com/api/characters/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name:el.name,
            nickname:el.nickname,
            img: el.img,
            status: el.status,
            id: el.char_id,
            occupation: el.occupation.map(el => el),
            birthday: el.birthday,
            appearance: el.appearance.map(el => el),
        };
    });
    return apiInfo;

}

const getDBInfo=async () =>{
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllCharacters=async () =>{
    const apiInfo= await getApiInfo();
    const dbInfo= await getDBInfo();
    const infoTotal= apiInfo.concat(dbInfo);
    return infoTotal

}

router.get('/characters',async (req,res) => {
    const name = req.query.name 
    let charactersTotal = await getAllCharacters();
    if (name){
        let characterName = await charactersTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()));
        characterName.length ?
        res.status(200).send(characterName) :
        res.status(404).send('No esta el personaje, Sorry');
    } else {
        res.status(200).send(charactersTotal);
    }
})
router.get('/occupations',async (req,res) => {
    const occupationsApi = await axios.get(`https://breakingbadapi.com/api/characters/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const occupations = occupationsApi.data.map(el => el.occupation);
    const occEach = occupations.map(el => {
        for (let i = 0; i < el.length; i++) return el[i] })
        //console.log('for',occEach);
    occEach.forEach(el => {
        Occupation.findOrCreate({
            where: {name: el}
        })
    });
        //console.log(occEach);
    const allOccupations = await Occupation.findAll();
    res.send(allOccupations);
})

router.post('/character',async (req,res) =>{
    let {
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb,
        occupation     
    }=req.body

    let characterCreated = await Character.create({
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb  
    })

    let occupationDb = await Occupation.findAll({ where: { name: occupation} })
    characterCreated.addOccupation(occupationDb)
    res.send('Personaje creado con exitos')

});
router.get('/characters/:id',async (req,res) =>{
    const id = req.params.id;
    //const {id} = req.params;
    const charactersTotal = await getAllCharacters()
    if (id){
        let characterId = await charactersTotal.filter(el => el.id == id)
        characterId.length?
        res.status(200).json(characterId) :
        res.status(400).send('No encontre ese personaje')
    }
})

module.exports = router;
