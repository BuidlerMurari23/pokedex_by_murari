import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

// <PokemonList name="pikachu" trainer="Ash" />


function PokemonList({search}){

    const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [prevUrl, setPrevUrl] = useState("");
    const [nextUrl, setNextUrl] = useState("");
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    

    async function pokemonDownloading(){

        const response = await axios.get(pokedexUrl);
        console.log(response)

        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);
       
        const pokemonResults = response.data.results;
        // console.log(pokemonResults);

        // iterraating the array of data to get the data from the url
        const pokemonPromises = pokemonResults.map( (pokemon) => axios.get(pokemon.url))
        // console.log(pokemonPromises)
        const pokemonResultPromises = await axios.all(pokemonPromises)
        // console.log(pokemonResultPromises)
        
        const results = pokemonResultPromises.map( (pokedata) => {
            const pokemon = pokedata.data;
            return({
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            })
        })

        console.log(results)
        
        setPokemonList(results)
        setIsLoading(false)

    }

    useEffect( () => {
        pokemonDownloading();
    },[pokedexUrl])

    useEffect( () => {
        const searchPokemon = async () => {
            console.log({pokemonList})
            if (search === ""){
                setFilteredPokemonList([...pokemonList])
            }
            else if (search.length >= 3){
            //     // Filtered based on the page data only
            //     let newPokemonList = [...pokemonList];
            //     newPokemonList = newPokemonList.filter( (e) => e.name.includes(search));
            //     setFilteredPokemonList(newPokemonList);
            // }
            // else{
                try{
                    const responses = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
                    console.log({responses});
                    setFilteredPokemonList([
                        {
                            name: responses.data.name,
                            id: responses.data.id,
                            image: responses.data.sprites.other.dream_world.front_default,
                            types: responses.data.types
                        }
                    ])
                }catch(err){
                    setFilteredPokemonList([...pokemonList])
                }
            }
        }
        searchPokemon()
    },[search, pokemonList])

    return (
        <div className="pokemonList-wrapper">
            <div className="pokemon-wrapper">{(isLoading) ? "Data is downLoading" : 
            filteredPokemonList.map( (pokedata) => <Pokemon 
                key={pokedata.id}
                id={pokedata.id}  
                name={pokedata.name} 
                image={pokedata.image} /> )
            }
            </div>
            <div className="button-wrapper">
            <button className="prev" disabled={prevUrl == undefined} onClick={() => setPokedexUrl(prevUrl) }>Prev</button>
            <button className="next" disabled={nextUrl == undefined} onClick={() => setPokedexUrl(nextUrl) }>Next</button>
            </div>

        </div>
    )

}

export default PokemonList;