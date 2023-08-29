const pokeApi = {}
 
function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
  
    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = buscafotocerta(pokeDetail)

    return pokemon
}

function convertPokeApiDetailToPokemonClicado(pokeDetail){
    const pokemonClicado = new PokemonClicado()
    pokemonClicado.number = pokeDetail.id
    pokemonClicado.name = pokeDetail.name
  
    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types
    pokemonClicado.types = types
    pokemonClicado.type = type

    pokemonClicado.photo = buscafotocerta(pokeDetail);

    pokemonClicado.especie = pokeDetail.species.name;
    pokemonClicado.altura = `${(pokeDetail.height*10).toFixed(2) } cm`;
    pokemonClicado.peso = `${(pokeDetail.weight*0.1).toFixed(2) } Kg`;
    const habilidades = pokeDetail.abilities.map((typeSlot)=> typeSlot.ability.name)
    pokemonClicado.habilidades = habilidades
    
    pokemonClicado.hp = pokeDetail.stats[0].base_stat;
    pokemonClicado.ataque = pokeDetail.stats[1].base_stat;
    pokemonClicado.defesa = pokeDetail.stats[2].base_stat;
    pokemonClicado.velocidade = pokeDetail.stats[5].base_stat;
    pokemonClicado.especialataque = pokeDetail.stats[3].base_stat;
    pokemonClicado.especialdefesa = pokeDetail.stats[4].base_stat;
    
    return pokemonClicado
}
function buscafotocerta(pokeDetail){
    if (pokeDetail.sprites.other.dream_world.front_default === null){
        if(pokeDetail.sprites.other.home.front_default === null){
            return pokeDetail.sprites.other["official-artwork"].front_default
        }
       return pokeDetail.sprites.other.home.front_default
    } else{
        return pokeDetail.sprites.other.dream_world.front_default
    }
}


pokeApi.getPokemonDetail= (pokemon)=> {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)  
} 

pokeApi.getPokemons = (offset = 0 ,limit = 6)=>{
   // dessa forma fica como default 0 pro offset e 10 pro limit caos nao tenha entrada na função:
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=>pokemons.map(pokeApi.getPokemonDetail ))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails)=>pokemonsDetails)
    .catch((error) => console.error(error))
}

pokeApi.getPokemonClicado = (pokemonclicado)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonclicado}`;
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => convertPokeApiDetailToPokemonClicado(jsonBody))
    .then((pokemonClicado)=> {
        let numerodopokemon = pokemonClicado.number
        var reproducao =[]
        
        var somastatus = Number(pokemonClicado.hp) + Number(pokemonClicado.ataque) +Number(pokemonClicado.defesa) +Number(pokemonClicado.especialataque) +Number(pokemonClicado.especialdefesa) +Number(pokemonClicado.velocidade);
        $(".pokemonDetail").append(`<div class="detailheader ${pokemonClicado.type}">
        <div class="voltar"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
        <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
      </svg></div>
        <div class="nameeNumero">
          <span class="nameDetail">${pokemonClicado.name}</span>
            <span class="numberDetail">#${pokemonClicado.number}</span>  
        </div>
        <div class="typesDetaildiv">
            <ol class="typesDetail">
            ${pokemonClicado.types.map((type)=>`<li id="${pokemonClicado.name}" class="typeDetail ${type}">${type}</li>`).join('')}
                
            </ol>
            <img class="pokebolapretoebranco" src="./images/pokebolapretoebranco2.png" alt="pokebolapretoebranco">
            <img class="pokemondesenho" src="${pokemonClicado.photo}" alt="${pokemonClicado.name}">
            
        </div>
        
    </div>
        <div class="descricoes">
            <div class="menu">
                <span class="sobre menuSelect">Sobre</span>
                <span class="basestats">Base Stats</span>
            </div>
            <div class="menu2">
                <span class="sobre linhadivisor" style="margin-top: 0;">Sobre</span>
                <span class="basestats " style="margin-top: 0;">Base Stats</span>
            </div>
            <div class="caracteristicas">
                <ul>
                    <li>Espécie <span>${pokemonClicado.especie}</span></li>
                    <li>Altura <span>${pokemonClicado.altura}</span></li>
                    <li>Peso <span>${pokemonClicado.peso}</span></li>
                    <li>Habilidades <span>${pokemonClicado.habilidades}</span></li>
                </ul>
                <ul  class="reproducao">
                    <li style="color: black;">Reprodução</li>
                </ul>
                <ul>
                    <li class="Genero">Gênero <span class="Masculino">
                        <span class="Feminino"><svg style="color: rgb(168, 18, 18);" xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
                        </svg></span>
                        </span> </li>
                    <li class="GrupodeOvos">Grupos de ovos <span></span></li>
                    
                    
                </ul>
            </div>
            <div class="caracteristicas2">
                <ul>
                    <li>Hp <span>${pokemonClicado.hp}</span> <span><div style="display:flex; align-items: center;width: 6.5rem; height: 1rem;" class="progress-barHp" ><div style="width: ${((Number(pokemonClicado.hp)/somastatus)*3)*6.5}rem; height: .6rem;background-color: ${"blue"};"  class="progress-barHpcolor"></div></div></span></li>
                    <li>Ataque <span>${pokemonClicado.ataque}</span><span><div style="display:flex; align-items: center;width: 6.5rem; height: 1rem;" class="progress-barataque" ><div style="width: ${((Number(pokemonClicado.ataque)/somastatus)*3)*6.5}rem; height: .6rem;background-color: ${"blue"};"  class="progress-barataquecolor"></div></div></span></li>
                    <li>Defesa <span>${pokemonClicado.defesa}</span><span><div style="display:flex; align-items: center;width: 6.5rem; height: 1rem;" class="progress-bardefesa" ><div style="width: ${((Number(pokemonClicado.defesa)/somastatus)*3)*6.5}rem; height: .6rem;background-color: ${"blue"};"  class="progress-bardefesacolor"></div></div></span></li>
                    <li>Esp. Ataque <span>${pokemonClicado.especialataque}</span><span><div style="display:flex; align-items: center;width: 6.5rem; height: 1rem;" class="progress-barespecialataque" ><div style="width: ${((Number(pokemonClicado.especialataque)/somastatus)*3)*6.5}rem; height: .6rem;background-color: ${"blue"};"  class="progress-barespecialataquecolor"></div></div></span></li>
                    <li>Esp. Defesa <span>${pokemonClicado.especialdefesa}</span><span><div style="display:flex; align-items: center;width: 6.5rem; height: 1rem;" class="progress-barespecialdefesa" ><div style="width: ${((Number(pokemonClicado.especialdefesa)/somastatus)*3)*6.5}rem; height: .6rem;background-color: ${"blue"};"  class="progress-barespecialdefesacolor"></div></div></span></li>
                    <li>Velocidade <span>${pokemonClicado.velocidade}</span><span><div style="display:flex; align-items: center;width: 6.5rem; height: 1rem;" class="progress-barvelocidade" ><div style="width: ${((Number(pokemonClicado.velocidade)/somastatus)*3)*6.5}rem; height: .6rem;background-color: ${"blue"};" class="progress-barvelocidadecolor"></div></div></span></li>
                    <li>Total <span>${Number(pokemonClicado.hp) + Number(pokemonClicado.ataque) +Number(pokemonClicado.defesa) +Number(pokemonClicado.especialataque) +Number(pokemonClicado.especialdefesa) +Number(pokemonClicado.velocidade)}</span></li>
                </ul>
                
            </div>
            
        </div>`)
        pokeApi.getPokemonClicado2(numerodopokemon);
        esconderinicial();
        cliquenodetail();
        
    })
    .catch((error) => console.error(error));
}
pokeApi.getPokemonClicado2 = (numerodopokemon) =>{
    const url2= `https://pokeapi.co/api/v2/pokemon-species/${numerodopokemon}`
    return fetch(url2)
    .then((response) => response.json())
    .then((jsonBody)=> {
        var chancefeminino = `${jsonBody.gender_rate * (100/ 8)}%`
        var chancemasculino = `${100-Number(jsonBody.gender_rate * (100/ 8))}%`
        var egggGroup = jsonBody.egg_groups["0"].name
        if (jsonBody.gender_rate ==-1){
            chancefeminino = `No-gender`
            chancemasculino = `No-gender`
        }
        var reproducao = [chancefeminino,chancemasculino,egggGroup]
        $(".Genero .Masculino").prepend(`<svg style="margin-right:.2rem; color: rgb(32, 32, 158);" xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
        </svg>${reproducao[1]}`)
        $(".Genero .Feminino").append(reproducao[0])
        $(".GrupodeOvos span").append(reproducao[2])
        console.log(reproducao)
            
    })
     
    .catch((error) => console.error(error));
}