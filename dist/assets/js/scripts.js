

const API = () => {
  const API_URL = "https://restcountries.com/v3.1/all";

  $.get(API_URL, function(response){
    console.log(response)
    SEARCHCOUNTRY(response)
    SEARCHREGION(response)
    
    response.forEach((item, i) => {
      CARDS(item)
    });

  })

}

const CARDS = (element) =>{
  
  let card = `
    <a href="details.html?country=${element.cca3}" class="card cardAncla">
      <img class="card-img-top" src="${element.flags.svg}" alt="bandera" />
      <div class="card-body">
        <h5 class="card-title">${element.name.common}</h5>
        <p class="card-text">Population: <span>${element.population}</span></p>
        <p class="card-text">Region: <span>${element.region}</span></p>
      <p class="card-text">Capital: <span>${element.capital}</span></p>
      </div>
    </a>
  `

  $("#cardComponent").append(card)
  $(".buttonUpContainer").show()

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

const SEARCHCOUNTRY = element =>{
  $('#dataFilterCountry').on('keyup', function(){
    let entryUser = $("#dataFilterCountry").val().toLowerCase();
    const arrayFiltrado = element.filter(item =>{
      let nameCountry = item.name.common.toLowerCase();
      if(nameCountry.indexOf(entryUser) !== -1){
        return item
      }
    })
    FILTERCOUNTRY(arrayFiltrado)
  })
}

const FILTERCOUNTRY = element =>{
  $("#cardComponent").empty()
  for(let i = 0; i<element.length; i++){
    let card = `
      <a href="details.html?country=${element[i].cca3}" class="card cardAncla" >
        <div class="card">
          <img class="card-img-top" src="${element[i].flags.svg}" alt="bandera" />
          <div class="card-body">
            <h5 class="card-title">${element[i].name.common}</h5>
            <p class="card-text">Population: <span>${element[i].population}</span></p>
            <p class="card-text">Region: <span>${element[i].region}</span></p>
          <p class="card-text">Capital: <span>${element[i].capital}</span></p>
          </div>
        </div>
      </a>
    `

    $("#cardComponent").append(card)
  }

  if(element.length<10){
    $(".buttonUpContainer").remove()
  }else{
    $(".buttonUpContainer").show()
  }

}

const SEARCHREGION = (element) => {
  $('#listRegion').click(function(e){
    const t = e.target
    const d = t.dataset
    const country = d.country
    
    const arrayFiltrado = element.filter(item =>{
      let nameRegion = item.region;
      if(nameRegion == country){
        if(country == 'Americas'){
          $('#dropdownMenuButton1').text('America');
        }else{
          $('#dropdownMenuButton1').text(country);
        }
        return item
      }
      else if(country == 'Todos'){
        $('#dropdownMenuButton1').text('Todos los paises');
        return element
      }
      
    })
    $('#dataFilterCountry').val('')
    FILTERCOUNTRY(arrayFiltrado)
    SEARCHCOUNTRY(arrayFiltrado)
    $(".buttonUpContainer").show()
  })


}


$(document).ready(function(){
  API();
  DARKMODE();
  UP();  
})

