function findWeatherData() {
    try {
        getWeather();
    } catch(err) {
        sendTextResponse("Я не нашел погоды для вашего города");
        $reactions.transition({value: '/Weather', deferred: false});
    }
    
}

function getWeather() {
    var url = "api.openweathermap.org/data/2.5/forecast";
    
    var result = getPosition();
    var lat = result.lat;
    var lon = result.lon;
    
    var params = {
        lat: lat,
        lon: lon,
        appid: getAppId(),
        units: "metric",
    }
    
    var weatherResponse = loadWeatherData(url, params);
    
    var state = weatherResponse.data.list[0].weather[0].main;
    log(state);
    switch(state) {
        case "Clear":
            state = 'Чистое небо';
            break;
        case "Snow":
            state = "Снежно";
            break;
        case "Windy": 
            state = "Ветренно";
            break;
        case "Clouds":
            state = "Облачно";
            break;
        case "Thunderstorm":
            state = "Гроза";
            break;
        case "Rain":
            state = "Дождь";
            break;
        case "Clear":
            state = 'Чисто';
            break;
    }
    
    var temp = weatherResponse.data.list[0].main.temp;
    var text = "У вас сейчас: " + state + "\nТемпература: " + temp;
    sendTextResponse(text);
}

function sendTextResponse(text) {
    var $response = $jsapi.context().response;

    $response.replies = $response.replies || [];
    
    $response.replies.push({
        type: "text",
        text: text,
    })
}

function loadWeatherData(url, params) {
    return getRequest(url, params);
}


function getPosition() {
    var url = "http://api.openweathermap.org/geo/1.0/direct";
    var city = $jsapi.context().request.query;
    
    var params = {
        q: city,
        appid: getAppId(),
    }
    
    var position = getRequest(url, params);
  
    return {
        lat: position.data[0].lon,
        lon: position.data[0].lat,
    };
}

function getRequest(url, params) {
    return $http.query(mountParametersToQueryString(url, params));
}

function mountParametersToQueryString(url, paramsObj) {
    var counter = 0;
    var finalString = url;
    
    for (var field in paramsObj) {
        if (!counter) {
            finalString += '?' + field + '=';
        } else {
            finalString += '&'+ field + '=';
        }
        
        finalString += paramsObj[field];
        
        counter++;
    }
  
    return finalString;
}

function getAppId() {
    return "6838f29871380f5b96e70075eb3f5613";
}