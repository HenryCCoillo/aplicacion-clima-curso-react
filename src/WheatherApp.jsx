import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '605507acf87117e111e54a3ab5238541'
    const difkelvin = 273.15
    
    const [ciudad, setCiudad] = useState('')

    const [dataCLima, setDataCLima] = useState(null)
    
    const handlCambioCiudad=(e)=>{
        setCiudad(e.target.value)
    }

    const onSubmit =(e)=>{
        e.preventDefault()
        if(ciudad.length>0) fetchClima()
    }

    const fetchClima = async()=>{
        try {            
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataCLima(data)
            console.log(data)
        } catch (error) {
            console.error('Ocurrio un Problema',error)
        }
    }

  return (
    <div className="container">
        <h1>Aplicacion de Clima</h1>
        <form onSubmit={onSubmit}>
            <input type="text" name="" value={ciudad} onChange={handlCambioCiudad} />
            <button type="submit">Buscar</button>
        </form>
        {
            dataCLima && (
                <div>
                    <h2>{dataCLima.name}</h2>
                    <p>Temperatura: {parseInt(dataCLima?.main?.temp - difkelvin)}°C</p>
                    <p>Conducion meteorologica: {dataCLima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataCLima.weather[0].icon}@2x.png`} alt="" />
                </div>
            )
        }

    </div>
  )
}
