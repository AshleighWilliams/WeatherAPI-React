import React from 'react';

//return weather by displaying the city, temperature icon, min and max temperature and description.
const Weather = (props) => {
    return(
        <div className="container" style={{paddingBottom: 30}}>
            <div className="cards pt-4">
                <h1>
                    {props.city}
                </h1>
                <h1 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h1>
                {props.temp_celcius ? (<h1 className="py2">{props.temp_celcius}&deg;</h1>) : null}
            
                {minmaxTemp(props.temp_min, props.temp_max)}
            
                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
};

//create function to display] min and max temperature.
function minmaxTemp(min,max){
    if(min && max){
        return(
            <h3>
                <span className="px-4">Min: {min}&deg;</span>
                <span className="px-4">Max: {max}&deg;</span>
            </h3>
        );
    }
}

//export the code to make it available outside of this module.
export default Weather;