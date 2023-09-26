

 const pokeApi = {}


 function convertPokeApiDetaiToPokemon(pokeDetail) {
  const pokemon = new pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
 }

 pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
      .then((response) => response.json() )
      .then(convertPokeApiDetaiToPokemon) 


 }
 
 pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const offset = 0
    const limit = 10
     const url = `https://pokeapi.co/api/vs/pokemon?offset=${offset}&limit=${limit}`
     fetch(url)
     .then((response) => response.json())
     .then((jsonBody) => jsonBody.results) 
     .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))       
     .then((detailRequests) => Promise.all(detailRequests))
     .then((pokemonsDetails) => pokemonsDetails)  
}

