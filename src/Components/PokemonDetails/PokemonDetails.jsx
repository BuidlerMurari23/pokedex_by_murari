import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css"

function PokemonDetails() {

    const { id } = useParams();
    // console.log(id)

    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        const responses = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(responses);

        setPokemon({
            id: responses.data.id,
            name: responses.data.name,
            image: responses.data.sprites.other.dream_world.front_default,
            height: responses.data.height,
            weight: responses.data.weight,
            types: responses.data.types.map((typ) => typ.type.name)
        })

    }
    useEffect(() => {
        downloadPokemon()
    }, [])

    return (
        <div className="pokemonDetails-wrapper">
            <img className="pokemonDetails-image" src={pokemon.image} />
            <div className="details-wrapper">
            <div className="pokemonDetails-name">Name : {pokemon.name} </div>
            <div className="pokemonDetails-name">Height : {pokemon.height}</div>
            <div className="pokemonDetails-name">Weight : {pokemon.weight}</div>
            <div className="pokemonDetails-types">Types :
            { pokemon.types && pokemon.types.map( (tp) => <div key={tp}>{tp}</div> )}
            </div>
            </div>
            {/*  ' ? ' =>  optional chaining which means if it is a valid thing then push the operation  */}
                {/* {pokemon.types?.map((tp) => <div key={tp}>{tp}</div>)} */}
            
        </ div>
    )




}

export default PokemonDetails;