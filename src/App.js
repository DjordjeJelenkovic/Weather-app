import './App.css';
import { useState, useEffect, useRef } from 'react';
import request from './Requests';
import SearchCity from './components/SearchCity';
import FiveDaysTemp from './components//FiveDaysTemp';
import Weekday from './components//Weekday';
import Weekdays from './components/Weekdays';
import Drzave from "./CountryCodes.json"
import useFetch from './hooks/useFetch';

function App() {
  const [search, setSearch] = useState('')
  const searchRef = useRef(null)
  const [emptyFlag, setEmptyFlag] = useState(false);
  const [data5Days, setData5Days] = useState('')
  const [data8Days, setData8Days] = useState('')
  const [threeCities5Days, setThreeCities5Days] = useState([])
  const [threeCities8Days, setThreeCities8Days] = useState([])
  const [countries, setCountries] = useState([])
  const [codes, setCodes] = useState([])
  const [codesString, setCodesStrings] = useState([])

  let searchedCity;
  let stateCode
  console.log(stateCode)

  console.log(search.toLowerCase())

  const selectFlag = (code) => {
    console.log(code)
    stateCode = code;
  }

  console.log(stateCode)

  // let zastaavva = document.getElementById("span_Id").innerText;

  const { error, setError, isPending, data5, data8, submitRequest } = useFetch()

  const submitSearch = () => {
    setData5Days('')
    setData8Days('')
    setEmptyFlag(false)
    selectFlag(stateCode)

    // console.log(searchRef.current.value)
    console.log(search.toLowerCase())
    console.log(threeCities5Days)
    let fiveDaysData = threeCities5Days.find(city => city.city.name.toLowerCase() === search.toLowerCase());
    let cityCode = threeCities5Days.find(city => city.city.country === stateCode);
    console.log(cityCode)
    console.log(fiveDaysData)

    if (fiveDaysData && cityCode) {
      setData5Days(fiveDaysData)
      let weekDaysData = threeCities8Days.find(city => city.lat === fiveDaysData.city.coord.lat);

      setData8Days(weekDaysData)
      console.log("tacno")
      console.log(fiveDaysData)

      console.log(weekDaysData.daily[0].dt)
    }
    else if (stateCode) {
      // useFetch(search)
      setEmptyFlag(false)

      searchedCity = search.toLowerCase();
      console.log(searchedCity)
      console.log(stateCode)

      submitRequest(searchedCity, stateCode)
      console.log("Mora guglamo!")
      setData5Days(data5)
      setData8Days(data8)
    }
    else {

      setEmptyFlag(true)
      setData5Days('')
      setData8Days('')
    }
    // setData5Days(data5)
    // setData8Days(data8)
    console.log(data5Days)
    console.log(data8Days)

  }

  useEffect(() => {
    const countryCodes = [];
    const countryCodesString = [];

    setCountries(Drzave.countries)
    for (let { code } of Drzave.countries) {
      countryCodesString.push(code)
    }
    setCodesStrings(countryCodesString)

    for (let { code } of Drzave.countries) {
      let obj = {};
      obj[code] = code;
      countryCodes.push(obj)
    }
    setCodes(countryCodes);

    // fetch('http://api.openweathermap.org/data/2.5/forecast?q=London,&appid=f62164933459c1a70c65eff2331ba657')
    //   .then(res => res.json())
    //   .then(res => console.log(res));

    const fetch5London = fetch(request.get5DaysData('London', 'uk'));
    const fetch5Paris = fetch(request.get5DaysData('Paris', 'fra'));
    const fetch5Madrid = fetch(request.get5DaysData('Madrid', 'spa'));

    Promise.all([fetch5London, fetch5Paris, fetch5Madrid]).then(values => {
      return Promise.all(values.map(results => results.json()));
    }).then(([london, paris, madrid]) => {
      // console.log(london)
      // console.log(paris)
      // console.log(madrid)
      let threeCities5Days = [];
      threeCities5Days.push(london, paris, madrid);
      setThreeCities5Days(threeCities5Days)

      const fetch8London = fetch(request.get8DaysData(london.city.coord.lat, london.city.coord.lon));
      const fetch8Paris = fetch(request.get8DaysData(paris.city.coord.lat, paris.city.coord.lon));
      const fetch8Madrid = fetch(request.get8DaysData(madrid.city.coord.lat, madrid.city.coord.lon));

      Promise.all([fetch8London, fetch8Paris, fetch8Madrid]).then(values => {
        return Promise.all(values.map(results => results.json()));
      }).then(([london8, paris8, madrid8]) => {
        // console.log(london8)
        // console.log(paris)
        // console.log(madrid)
        let threeCities8Days = [];
        threeCities8Days.push(london8, paris8, madrid8);
        setThreeCities8Days(threeCities8Days)
        // console.log(threeCities8Days)

      });
    });

    let datum = new Date(1652958000 * 1000)
    // console.log(datum)

    // console.log(datum.getDay())
    const timestamp = new Date().getTime();
    // console.log(timestamp);
    // console.log(data8Days.daily[0]);

    console.log(data5Days)
    console.log(data8Days)
  }, []);

  return (
    <div className="app">
      <div className="container">
        <SearchCity
          setSearch={setSearch}
          search={search}
          searchRef={searchRef}
          submit={submitSearch}
          countries={countries}
          codes={codes}
          codesString={codesString}
          selectFlag={selectFlag}
          setEmptyFlag={setEmptyFlag}
        />
        {emptyFlag && <div>Please select country and type city!</div>}
        {error && !emptyFlag && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {data5Days && !error && !emptyFlag && < FiveDaysTemp data={data5Days} />}
        {/* {data5Days && data8Days && !error && !emptyFlag && < FiveDaysTemp data={data5Days} /> && <Weekdays data={data8Days} />} */}
        {data8Days && !error && <div>
          <Weekdays data={data8Days} />
        </div>}

      </div>
    </div >
  );
}

export default App;
