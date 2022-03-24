const API = () =>{
  const API_URL = "https://restcountries.com/v3.1/all";

  $.get(API_URL, function(response){
    response.forEach((element,index) => {

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
    })
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
$(document).ready(function(){

  API();
  DARKMODE();
  UP();

})
