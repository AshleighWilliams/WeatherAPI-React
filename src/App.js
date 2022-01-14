import React from "react";
//import external stylesheet.
import './App.css';
//import weather-icons.
import 'weather-icons/css/weather-icons.css';
//import bootstrap css from bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';
//import weather from components.
import Weather from "./Components/Weather";
//import form from components.
import Form from "./Components/WeatherForm"

//unique api key.
const API_key = "b7b5d361cb603c55cb548c6c5533fbe8";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };
    //weather-icons.
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sprinkle",
      Rain: "wi-rain",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-cloudy"
    }
  }

  //convert to degrees celcius.
  calCelcius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell
  }
  //choose correct weather-icon corresponding to the weather.
  get_WeatherIcon(icons, rangeId){
    switch (true) {
      case rangeId >= 200 && rangeId <= 232: this.setState({icon: this.weatherIcon.Thunderstorm}); 
      break;
      case rangeId >= 300 && rangeId <= 321: this.setState({icon: this.weatherIcon.Drizzle}); 
      break;
      case rangeId >= 500 && rangeId <= 531: this.setState({icon: this.weatherIcon.Rain}); 
      break;
      case rangeId >= 600 && rangeId <= 622: this.setState({icon: this.weatherIcon.Snow}); 
      break;
      case rangeId >= 700 && rangeId <= 781: this.setState({icon: this.weatherIcon.Atmosphere}); 
      break;
      case rangeId === 800: this.setState({icon: this.weatherIcon.Clear}); 
      break;
      case rangeId >= 801 && rangeId <= 804: this.setState({icon: this.weatherIcon.Clouds}); 
      break;
      default: this.setState({icon: this.weatherIcon.Clouds}); 
    }
  }

  //get the weather from api. 
  getWeather = async(event) => {

    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    
    //fetch api link.
    if(city && country){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)

      const response = await api_call.json();
      
      //set the state to display city name, min and max temperatures and weather description.
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celcius: this.calCelcius(response.main.temp),
        temp_min: this.calCelcius(response.main.temp_min),
        temp_max: this.calCelcius(response.main.temp_max),
        description: response.weather[0].description,
        error: false
      });
      //set state for weather-icon.
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else{
      this.setState({error: true})
    }
  };

  //render and return the form and weather components.
  render(){
    return(
      <div className="App">
        <div className="container">
          <h1>Weather Forecast</h1>
            <div className="row">
            <div className="col-md-5 form-container">
              <Form 
              loadweather={this.getWeather}
              error={this.state.error}
              />
            </div>
            <div className="col-md-7 weather-container">
              <Weather 
              city={this.state.city} 
              country={this.state.country} 
              temp_celcius={this.state.celcius} 
              temp_min={this.state.temp_min} 
              temp_max={this.state.temp_max}
              description={this.state.description}
              weatherIcon={this.state.icon}
              />
            </div>
            </div>
        </div>
      </div>
    );
  }
} 

//export the code.
export default App;