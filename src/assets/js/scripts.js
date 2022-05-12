const CARDS = element =>{
  let card = `
    <div class="card">
      <img class="card-img-top" src="${element.flags.svg}" alt="bandera" />
      <div class="card-body">
        <h5 class="card-title">${element.name.official}</h5>
        <p class="card-text">Population: <span>${element.population}</span></p>
        <p class="card-text">Region: <span>${element.region}</span></p>
       <p class="card-text">Capital: <span>${element.capital}</span></p>
      </div>
    </div>
  `

  $("#cardComponent").append(card)
  $(".buttonUpContainer").show()

  PAGINATION(element);

}

const API = () => {

  const API_URL = "https://restcountries.com/v3.1/all";

  $.get(API_URL, function(response){
    searchCountry(response)
    response.forEach((item, i) => {
      CARDS(item)
    });
  })
}

const DARKMODE = () =>{
  let theme = $("#theme")
  let linkDarkTheme = "./assets/css/stylesDark.css"
  let linkWhiteTheme = "./assets/css/styles.css"

  $('#changeMode').click(function() {
    theme.attr('href',theme.attr('href') == linkDarkTheme ? linkWhiteTheme : linkDarkTheme);
  });
}

const UP = () =>{
  $(".buttonUpContainer").click(function(){
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  })
}

const searchCountry = element =>{
  $('#dataFilterCountry').on('keyup', function(){
    let entryUser = $("#dataFilterCountry").val().toLowerCase();
    const arrayFiltrado = element.filter(item =>{
      let nameCountry = item.name.common.toLowerCase();
      if(nameCountry.indexOf(entryUser) !== -1){
        return item
      }
    })
    FilterCountry(arrayFiltrado)
  })
}

const FilterCountry = element =>{
  $("#cardComponent").empty()
  for(let i = 0; i<element.length; i++){
    let card = `
      <div class="card">
        <img class="card-img-top" src="${element[i].flags.svg}" alt="bandera" />
        <div class="card-body">
          <h5 class="card-title">${element[i].name.official}</h5>
          <p class="card-text">Population: <span>${element[i].population}</span></p>
          <p class="card-text">Region: <span>${element[i].region}</span></p>
         <p class="card-text">Capital: <span>${element[i].capital}</span></p>
        </div>
      </div>
    `

    $("#cardComponent").append(card)
  }

  if(element.length<10){
    $(".buttonUpContainer").remove()
  }

}

const PAGINATION = (i) =>{
  let card = $(".card")
  console.log(card)
}

$(document).ready(function(){
  API();
  DARKMODE();
  UP();

})
