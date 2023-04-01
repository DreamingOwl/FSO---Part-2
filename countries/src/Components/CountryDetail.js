const WeatherDetail = ({weatherData}) => {

    if(weatherData === null){
        return null
    }

    return (
        
        <div>
        <h1><p>Weather in {weatherData.name}</p></h1>
        temperature {weatherData.main.temp} Celsius <br />
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='Weather Icon'/><br />
        wind {weatherData.wind.speed} m/s <br />
        </div>
    )
}
  
const CountryDetail = ({country, weatherData}) => {
if(country === null) {
    return null
}

return (
    <div>
        <h1><p>{country.name.common}</p></h1>
        capital {country.capital.map(capital => `${capital}\t`)} <br/>
        area {country.area} <br/>

        <h2><p>languages:</p></h2>
        <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt='Flag Icon'/>
        
        <WeatherDetail weatherData={weatherData}/>
    </div>
)
}


export default CountryDetail;