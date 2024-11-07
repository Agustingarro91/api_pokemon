const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const {Pokemon, TypePoke, PokeTipo} = require('../db');
 

const getPoke = async () => {
    try {
        const {data} = await axios(`${URL}?limit=150`);
        const {results} = data;
        const pokeDB = await Pokemon.findAll(/* { offset: 0, limit: 2 } */);
        const tips = await Pokemon.findAll({include: TypePoke});
        const infoPoke = pokeDB.map(data => {
        
                const poke = tips.find(poque => 
                    poque.name == data.name
                )
                const namePoke = poke.TypePokes.map(res => res.name)
           
            return {...data.dataValues, types: namePoke}})
        const pokeInfo = [...infoPoke];


        for(let i = 0; results.length > i;i++){
            const {data} = await axios(results[i].url);
            const {id,name,weight,height,sprites, stats, types} = data;
            pokeInfo.push({
                id,
                name,
                image: sprites.other.dream_world.front_default,
                life: stats[0].base_stat, 
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5].base_stat,
                weight,
                height,
                types: types.map(tipo => tipo.type.name)
            });
        }
        console.log();


        return pokeInfo;
        
    } catch (error) {
        return {error: 'Entro a este maldito erroor'};
    }
}


const getPokeId = async (idPokemon) =>{
    try {

        const pokeDB = await Pokemon.findByPk(idPokemon);       
        
        
        if(pokeDB) {
            const tips = await Pokemon.findAll({include: TypePoke});
    
            const poke = tips.find(poque => 
                poque.id == idPokemon 
            )
            const namePoke = poke.TypePokes.map(res => res.name)
            
            
            return {...pokeDB.dataValues,types:namePoke }};


        const {data} = await axios(`${URL}/${idPokemon}`)
        
        const {id, name,weight,height,sprites, stats, types} = data;

        const detailPoke = {
            id,
            name,
            image: sprites.other.dream_world.front_default,
            life: stats[0].base_stat, 
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            weight,
            height,
            types: types.map(tipo => tipo.type.name)
        }
        return detailPoke;

    } catch (error) {
        return {error: 'No existe el id seleccionado'};
    }

}

const getName = async (nameCamb) => {
    try {
        
        const name = nameCamb.toLowerCase();
        const pokeDB = await Pokemon.findAll();
        const infoPoke = pokeDB.find(data => {
            if(data.dataValues.name === name) return data.dataValues
            })
            if(infoPoke) {
                const tips = await Pokemon.findAll({include: TypePoke});
        
                const poke = tips.find(poque => 
                    poque.name == name
                )
                const namePoke = poke.TypePokes.map(res => res.name)
                
                
                return {...infoPoke.dataValues,types:namePoke }};


        const {data} = await axios(`${URL}/${name}`);
        const {id,weight,height,sprites, stats, types} = data;

        const poke = {
            id,
            name,
            image: sprites.other.dream_world.front_default,
            life: stats[0].base_stat, 
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            weight,
            height,
            types: types.map(tipo => tipo.type.name)
        }

        

        return poke;

    } catch (error) {
        return {error: error.message};
    } 
    
}


const postPoke = async ( pokem ) =>{
    try {
        const {id,name,image,life,attack,defense,speed,weight,height,type} = pokem;


        const existePoke = await getName(name);
        if(existePoke.id) throw Error('El pokemon con ese nombre ya existe');

        const nameb = name.toLowerCase();


        if(!name||!image||!life||!attack||!defense) throw Error( 'Falta informacion obligatoria')

        const newPoke = {
            id,
            name:nameb,image,life,attack,defense,speed,weight,height,type
        }
        const pokeCreado = await Pokemon.create(newPoke);

        await pokeCreado.addTypePoke(type);
        
        return newPoke;

        
    } catch (error) {
        return {error: error.message};
    }
}




module.exports = {getPoke,getPokeId, getName, postPoke};