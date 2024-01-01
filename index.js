const API_KEY = '47651989315605f6e10456f3972eec9e';

function renderWeatherInformation(data){
    let para = document.createElement("p");
    para.innerText = data.main.temp;
    document.body.appendChild(para);
}
async function fetchWeatherDetails() {
    try {
        let city = "sikandrabad";
        // let lon = 77.69;
        // let lat = 28.45;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        const data = await response.json();
        console.log("Weather Information --> ", data);
        renderWeatherInformation(data);
        
    } catch (error) {
        console.log("Error:", error);
        
    }
}
fetchWeatherDetails();

// My Location // GeoLocation Api
function geoLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geoLocation Support");
    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat);
    console.log(long);
}

geoLocation();