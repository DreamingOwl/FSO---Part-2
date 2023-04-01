import {useState, useEffect} from 'react'
import axios from 'axios'
import CountryDetail from './Components/CountryDetail'
import Notification from './Components/Notification'
import Loading from './Components/Loading'

const CountriesList = ({countries, setCountryFunc}) => countries.map(country => <tr key={country.cca3}><td>{country.name.common}</td><td><button onClick={() => setCountryFunc(country)}>show</button></td></tr>)

function App() {

  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [countryDetail, setCountryDetail] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fieldToSelect = 'fields=name,flags,capital,languages,cca2,cca3,area'
    axios
        .get(`https://restcountries.com/v3.1/all?${fieldToSelect}`)
        .then(response => { 
          setAllCountries (response.data)
          setLoading(false)
         } )
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    if(countryDetail){
      axios
          .get(`http://api.openweathermap.org/geo/1.0/direct?q=${countryDetail.capital[0]},${countryDetail.cca2}&limit=5&appid=${api_key}`)
          .then(response => { 
                              axios
                                  .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}&units=metric`)
                                  .then(responseW => { setWeatherData (responseW.data) } ) 
                                  .catch(setWeatherData(null))
                            } 
                )
          .catch(setWeatherData(null))
    }
    else{
      setWeatherData(null)
    }
  }, [countryDetail])

  const setOverallState = (m, c, cd) => {
    setMessage(m)
    setCountries(c)
    setCountryDetail(cd)
  }

  const onCountryChange = (event) => {
    const searchCountry = event.target.value
    const showCountries = allCountries.filter( country => country.name.common.toUpperCase().search(searchCountry.toUpperCase()) === -1 ? false : true )
    setSearchCountry(event.target.value)

    if(searchCountry === ''){
      setOverallState(null,[],null)
    }
    else{

      if(showCountries.length === 0){
        setOverallState(null,[],null)
      }
      else if(showCountries.length > 10){
        setOverallState('too many matches, specify another filter',[],null)
      }
      else if(showCountries.length === 1){
        setOverallState(null,[],showCountries.reduce((prev, curr) => curr, {} ))
      }
      else{
        setOverallState(null,showCountries,null)
      }
    }
    
  }

  const handleSetCountry = (country) => {
    setOverallState(null,[],country)
  }

  if(loading){
    return (
      <Loading />
    )
  }

  return (
    <div>
      find countries <input value={searchCountry} onChange={onCountryChange} /> <br />
      <Notification message={message} />
      <CountryDetail country={countryDetail} weatherData={weatherData} />
      <table>
        <tbody>
          <CountriesList countries={countries} setCountryFunc={handleSetCountry}/>
        </tbody>
      </table>
    </div>
  )
}

export default App;
