import React from 'react'

function FiveDaysTemp({ data }) {
  let datum = new Date(data.list[0].dt_txt)
  console.log(data)
  let firstDay = new Date(data.list[0].dt_txt).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })
  let fifthDay = new Date(data.list[data.list.length - 1].dt_txt).getUTCDate().toString()
  let year = new Date(data.list[data.list.length - 1].dt_txt).getUTCFullYear().toString()

  let temp = data.list.reduce((sum, object) => {
    let zbir = sum + object.main.temp;
    return zbir;
  }, 0);

  temp /= data.list.length;
  temp = Math.round(temp);

  return (
    <div className="five-days-temp">
      <h5>{firstDay} - {fifthDay} {year}</h5>
      <p className="average-temp">{temp}</p>
    </div>
  )
}

export default FiveDaysTemp