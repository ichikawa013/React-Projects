import React, { useEffect, useRef, useState } from "react";
import search_icon from '../assets/search_icon.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        '01d': clear,
        '01n': clear,
        '02d': cloud,
        '02n': cloud,
        '03d': cloud,
        '03n': cloud,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '13d': snow,
        '13n': snow,
    }

    const search = async (city) => {
        if (city === '') {
            alert('Enter city name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const res = await fetch(url);
            const data = await res.json();
            if(!res.ok){
                alert(data.message)
                return;
            }
            
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        }
        catch (error) {
            setWeatherData(false)
            console.error("Error in fetching data.");
        }
    }
    useEffect(() => {
        search("Varanasi")
    }, [])
    return (
        <div id="weather" className="flex flex-col gap-1 place-self-center p-10 rounded-2xl bg-gradient-to-bl from-blue-800 to-orange-400">
            <div id="searchbar" className="flex gap-2 ">
                <input ref={inputRef} type="text" placeholder="Search" className="rounded-full pl-4 border-none outline-none bg-white" />
                <img onClick={() => search(inputRef.current.value)} className="size-7 rounded-full bg-white p-1" src={search_icon} alt="" />
            </div>
            {weatherData ? <>
                <div className="flex justify-center items-center flex-col">
                <img src={weatherData.icon} alt="Weather Icon" className="w-40 m-8" />
                <p className=" text-white text-xl ">{weatherData.temperature}°C</p>
                    <p className=" text-white text-xl ">{weatherData.location}</p>
                </div>
                <div id="weather-data" className="flex justify-between mt-8 tracking-normal text-white">
                    <div className="flex justify-between gap-3">
                        <img className="w-7 h-7 my-2" src={humidity} alt="" />
                        <div className="space-y-0">
                            <p>{weatherData.humidity}</p>
                            <span className="flex text-sm antialiased tracking-tight my-1">Humidity</span>
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <img className="w-8 h-8 my-2" src={wind} alt="" />
                        <div className="space-y-0">
                            <p>{weatherData.windspeed} km/h</p>
                            <span className="flex text-sm antialiased tracking-tight my-1">Wind speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}


        </div>
    )
}

export default Weather