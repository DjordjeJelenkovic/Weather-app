import { useState, useEffect } from 'react';
import request from '../Requests';

const useFetch = () => {
  const [data5, setData5] = useState(null);
  const [data8, setData8] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const submitRequest = (searchedCity, stateCode) => {
    console.log(searchedCity)
    console.log(stateCode)
    // useEffect(() => {
    setIsPending(true);

    fetch(request.get5DaysData(searchedCity, stateCode))
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('Please check your inputs and try again! :)');
        }
        // console.log(res.json())
        return res.json();
      })
      .then(res => {
        console.log(stateCode)

        console.log(res)
        setIsPending(false);
        setData5(res);
        setError(null);
        fetchWithCoords(res?.city.coord.lat, res?.city.coord.lon)
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })

  }
  const fetchWithCoords = async (lat, lon) => {
    try {
      const response = await fetch(request.get8DaysData(lat, lon))
      if (!response.ok) { // error coming back from api
        throw Error('could not fetch the data for that resource');
      }
      const data = await response.json();
      setData8(data)
      console.log(data)
      setIsPending(false);
      setError(null);
    }
    catch (err) {
      // auto catches network / connection error
      setIsPending(false);
      setError(err.message);
    }
  }
  // console.log(data5)
  // console.log(data8)

  return { submitRequest, data5, data8, isPending, setError, error };
}

export default useFetch;