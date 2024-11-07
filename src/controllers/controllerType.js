const {TypePoke} = require('../db');
const axios = require('axios');




const getType = async () => {
    try {
        const typosDB = await TypePoke.findAll();
        
        const {data} = await axios('https://pokeapi.co/api/v2/type');
        const {results} = data;
        const nombresPoke = results.map(tipos =>{return {name: tipos.name}}  )
        
        if(typosDB.length < 19){
        await TypePoke.bulkCreate(nombresPoke)};

        return nombresPoke;
        
    } catch (error) {
        return {error:error.message};
    }



}

const getTypes = async () => {
    try {
        const typosDB = await TypePoke.findAll();
        if(typosDB.length === 0) throw Error('La base de dato esta vacia');
        return typosDB;
    }catch (error) {
        return {error:error.message};
        
    }
}

module.exports = {getType,getTypes};