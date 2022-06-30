const API = () => {
    const API_URL = "https://restcountries.com/v3.1/all";

    $.get(API_URL, function(response){
        const QUERY = new URLSearchParams(window.location.search)
        const PARAMS = QUERY.get('country')
        const FILTRODETALLE = response.filter(item => {
            if(item.name.common.indexOf(PARAMS) !== -1){
              return item
            }
        })
        DETAILS(FILTRODETALLE)
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
  
  const DETAILS = (element) => {
    console.log(element)
    let detailsContainer = `
      <div class="detailsContainerImage"> <img src="${element[0].flags.svg}" alt="imagen de pais" /></div>
      <div class="articleDetails_containerDetailsText" id="articleDetails">
        <h4 class="articleDetails_containerDetailsText--title">${element[0].name.common}</h4>
        <div class="articleDetails_containerDetailsText_feature">
          <div>
            <h6 class="articleDetails_containerDetailsText_feature--title">Native Name: <span class="articleDetails_containerDetailsText_feature--span">${element[0].name.official}</span></h6>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Population: <span class="articleDetails_containerDetailsText_feature--span">${element[0].population}</span></h6>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Region: <span class="articleDetails_containerDetailsText_feature--span">${element[0].region}</span></h6>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Sub Region: <span class="articleDetails_containerDetailsText_feature--span">${element[0].subregion}</span></h6>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Capital: <span class="articleDetails_containerDetailsText_feature--span">${element[0].capital}</span></h6>
          </div>
          <div>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Top Level Domain: <span class="articleDetails_containerDetailsText_feature--span">${element[0].tld}</span></h6>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Currencies: <span class="articleDetails_containerDetailsText_feature--span">${element[0].currencies}</span></h6>
            <h6 class="articleDetails_containerDetailsText_feature--title"> Languages: <span class="articleDetails_containerDetailsText_feature--span">${element[0].languages}</span></h6>
          </div>
        </div>
        <article class="containerBorderCountries">
          <h6>Border Countries: </h6>
          <div>
            <button class="buttonBorderCountries">France </button>
            <button class="buttonBorderCountries">Germany </button>
            <button class="buttonBorderCountries">Netherlands</button>
          </div>
        </article>
      </div>
    `
  
    $("#articleDetails").append(detailsContainer)
  
  }
  
  $(document).ready(function(){
    console.log('ready')
    API();
    DARKMODE();
  })
  
  