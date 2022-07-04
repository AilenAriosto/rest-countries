const API = () => {
    const API_URL = "https://restcountries.com/v3.1/all";

    $.get(API_URL, function(response){
        const QUERY = new URLSearchParams(window.location.search)
        const PARAMS = QUERY.get('country')
        const FILTRODETALLE = response.filter(item => {
            if(item.cca3.indexOf(PARAMS) !== -1){
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
    $("#imageCountry").attr('src',element[0].flags.svg)
    $("#titleCountry").text(element[0].name.common)
    $("#nativeNameCountry").text(element[0].name.official)
    $("#populationCountry").text(element[0].population)
    $("#regionCountry").text(element[0].region)
    $("#subregionCountry").text(element[0].subregion)
    $("#capitalCountry").text(element[0].capital)
    $("#toplevelCountry").text(element[0].tld)
    
    //Currencies
    const CURRENCIES = Object.values(element[0].currencies)
    $("#currenciesCountry").text(CURRENCIES[0].name + ' - ' + CURRENCIES[0].symbol )
    
    //Languages
    const LANGUAGES = Object.values(element[0].languages)
   
    for( let i = 0; i< LANGUAGES.length; i++){
      $("#languagesCountry").append(LANGUAGES[i] + ', ')
    }

    //Buttons Border Countries
    const BORDERSCOUNTRIES = element[0].borders
    
    if(BORDERSCOUNTRIES){
      for( let i = 0; i<BORDERSCOUNTRIES.length; i++ ){
        $("#buttonsBorderCountriesContainer").append("<a href='details.html?country="+ BORDERSCOUNTRIES[i] + "' class='buttonBorderCountries'>" + BORDERSCOUNTRIES[i] + "</a>")
      }
    }else{
      $(".containerBorderCountries").append("<span class='borderCountryUndefined'> Nothing </span>")
    }



  
  }
  
  API()

  $(window).on('load', function(){
    $(".spinnerContainer").fadeOut(2000)
    $(".contentArticleDetails").fadeIn(1000)
    DARKMODE();
  })
  