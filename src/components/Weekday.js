import React from 'react'

function Weekday(data) {

  let datum = new Date(data.data.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })
  let temperature = data.data.temp.day

  return (
    <div className="five-days-temp">
      <h5 >{datum}</h5>
      <p>{temperature}</p>
    </div>
  )
}

export default Weekday