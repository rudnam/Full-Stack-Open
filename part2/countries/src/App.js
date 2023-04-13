import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [options, setOptions] = useState([])
  const [toDisplay, setToDisplay] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  },[])

  useEffect(() => {
    if (countries) {
      const newOptions = countries.filter(country => {
        return country.name.common.toLowerCase().includes(query.toLowerCase())
      })
      if (query) {
        setOptions(newOptions)
      }
      if (newOptions.length === 1) {
        setToDisplay(newOptions[0])
      } else {
        setToDisplay(null)
      }
    }
    
    
  },[countries, query])



  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const showCountry = (country) => {
    setToDisplay(country)
  }

  return (
    <div>
      <span>find countries</span> <input onChange={handleChange}></input>
      <Display toDisplay={toDisplay} options={options} showHandler={showCountry} />
    </div>
  );
}

export default App;
