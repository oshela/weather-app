
import './App.css';
import {useState} from 'react';
 const api = {
  key:"ce96bf27d521ae5ccf2cb8e666986fb9",
  base: "https://api.openweathermap.org/data/2.5/weather?"
};
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key == "Enter"){
      fetch(`${api.base}q=${query}&units =metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setWeather(result)
        setQuery('');
        ;});
        
    }
  }

  const dateBuilder = (d) =>{
    let Months = ["January","February", "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December"];
  let Days = ["Sunday","Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
    let Day = Days[d.getDay()];
    let Date = d.getDate();
    let Month = Months[d.getMonth()];
    let Year = d.getFullYear();
    return `${Day} ${Date} ${Month} ${Year}`
}
  return (
    <div className={(typeof weather.main !="undefined") ?((weather.main.temp > 16) ? 'app warm':'app' ) :'app'}>
      <main>
        <div className="searchbox">
          <input type="text"
          className="search-bar"
          placeholder='Search...'
          onChange={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress={search}
          />     
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
        <div className="temp">
        {Math.round(weather.main.temp)/10}°C</div>
        <div className="weather">
        {weather.weather[0].main}
        </div>
        </div>
      </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
