


 function esconderinicial(){
    $(".caracteristicas2").hide();
 
 }
 





function cliqueNoPokemon(){
    
   $(".pokemon").on( "mouseenter", ()=>{
      document.body.style.cursor = "pointer";
   } ).on( "mouseleave", ()=>{
      document.body.style.cursor = "default";
   } );
   

    $(".pokemon").on("click", ()=>{
    $("#pokemonList").hide();
    $(".paginationtop").hide();
    $("#loadMoreButton").hide();
    $(".pokemonDetail").show();
    var pokemonclicado = event.target.id
    
    
    pokeApi.getPokemonClicado(pokemonclicado)
    
 });
    
}

function cliquenodetail(){
   $(".voltar").on( "mouseenter", ()=>{
      document.body.style.cursor = "pointer";
   } ).on( "mouseleave", ()=>{
      document.body.style.cursor = "default";
   } );
    $(".voltar").on("click", ()=>{
    
    $(".pokemonDetail").hide();
    $(".content #pokemonList").show();
    $("h1").show();
    location.reload(true);
    
    
 })
 $(".menu .basestats").on("click", ()=>{
    $(".menu .basestats").addClass("menuSelect");
    $(".menu .sobre").removeClass("menuSelect");
    $(".menu2 .basestats").addClass("linhadivisor");
    $(".menu2 .sobre").removeClass("linhadivisor");
    $(".caracteristicas").hide();
    $(".caracteristicas2").fadeIn();
    
 })
 $(".menu .sobre").on("click", ()=>{
    $(".menu .basestats").removeClass("menuSelect");
    $(".menu .sobre").addClass("menuSelect");
    $(".menu2 .basestats").removeClass("linhadivisor");
    $(".menu2 .sobre").addClass("linhadivisor");
    $(".caracteristicas").fadeIn();
    $(".caracteristicas2").hide();
    
 });
 
 }


 $(".botao_pesquisanumero").on("click", ()=>{
   $("#pokemonList").html("")
   $(".pokemonDetail").html("")
   $("#loadMoreButton").hide();
   
   pokeApi.getPokemonClicado($(".inputnumero").val())
});
$(".botao_pesquisatexto").on("click", ()=>{
   $("#pokemonList").html("")
   $(".pokemonDetail").html("")
   $("#loadMoreButton").hide();
   var textominusculo = $(".inputtexto").val().toLowerCase()
   console.log(textominusculo)
   pokeApi.getPokemonClicado(textominusculo)
   
});

