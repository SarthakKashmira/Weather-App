import React,{useState} from 'react'
import './Weather.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
function Weather() {
    const [name,setname]=useState("");
    const [humiditi,sethumiditi]=useState("64");
    const [windspeed,setwindspeed]=useState("18");
    const [temperature,settemperature]=useState("24");
    const [location,setlocation]=useState("London");
    const [icon,seticon]=useState(cloud);
    let apikey='183153ffa5471a9af6bb0a2a75029d66';
    const searchplace=async ()=>{
          try{
          if(!name)
          {return 0;}
          let url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apikey}`;
          let res=await fetch(url);
          let data=await res.json();
          sethumiditi(data.main.humidity);
          setwindspeed(Math.floor(data.wind.speed));
          settemperature(Math.floor(data.main.temp));
          setlocation(data.name);
          setname("");
          if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
          {seticon(clear);}
          else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
          {seticon(cloud);}
          else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
          {seticon(drizzle);}
          else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
          {seticon(drizzle);}
          else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
          {seticon(rain);}
          else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
          {seticon(rain);}
          else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
          {seticon(snow);}
          else{
            seticon(clear);
          }

          }
          catch(err)
          {console.log(err);
           settemperature("");
           setlocation("Wrong Place");
           sethumiditi("");
           setwindspeed("");}
    }
  return (
    <div className="container">
        <div className="top-bar">
            
            <input type="text" classname="city-input" placeholder="Search" value={name} onChange={(e)=>setname(e.target.value)}/>
            
            <div className="search-icon" onClick={searchplace}>
                <img src={search} alt="Loading"/>
            </div>
        </div>
        <div className='weather-image'>
            <img src={icon} alt="Loading Clouds"/>
        </div>
        <div className='weather-temp'>{`${temperature}°C`}</div>
        <div className='weather-location'>{`${location}`}</div>
        <div className="element">
        <div className='element1'>
            <img src={humidity} className="icon" alt="Loaded"/>
            <div className="data">
                <div className="humidity-percent">{`${humiditi}%`}</div>
                <div className='text'>Humidity</div>
            </div>
        </div>

        <div className='element2'>
            <img src={wind} className="icon" alt="Loaded"/>
            <div className="data">
                <div className="wind-rate">{`${windspeed} km/h`}</div>
                <div className='text'>Wind Speed</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Weather