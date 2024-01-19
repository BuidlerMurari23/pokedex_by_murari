import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css"



function Pokedex(){

    const [search, setSearch] = useState("");

    return(
        <div className="Pokedex-wrapper">
           
            <Search search={search} setSearch={setSearch} />
            <PokemonList search={search} />
        </div>
    )

}

export default Pokedex;