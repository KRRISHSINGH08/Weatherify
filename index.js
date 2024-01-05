const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector(".form-container");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initially variables needed 
let currentTab = userTab;
const API_KEY = '47651989315605f6e10456f3972eec9e';
currentTab.classList.add("current-tab");

function switchTab(clickedtab) {
    if(currentTab != clickedtab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedtab;
        currentTab.classList.add("current-tab")
        // clicked search tab
        if(!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // clicked on userTab
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.add("active");
            // check local storage for coordinates
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});
searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
    }
}

async function fetchWeatherInfo(coorinates) {
    const {lat, lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API CALL
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.JSON();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    } catch (error) {
        loadingScreen.classList.remove("active");
        // HW
    }

}

function renderWeatherInfo(data) {
    
}

// || HOW TO API? || 
/*
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

geoLocation(); */