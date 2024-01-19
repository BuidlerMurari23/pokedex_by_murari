import "./Search.css"


function Search({search, setSearch}){
    const handelSearchFunction = (e) =>{
        setSearch( () => e.target.value)
    }

    return(
        <div className="search-wrapper">
            <input 
            id="search"
            value={search}
            onChange={(e) => handelSearchFunction(e)}
            type="text"
            placeholder="Pokemon Name"
             />
        </div>
    )


}

export default Search;