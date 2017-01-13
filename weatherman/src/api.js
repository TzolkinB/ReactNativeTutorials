var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=d44a7700061d9178749572f9fa0c262d';

var kelvinToF = function(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' F'
};

module.exports = function(latitude, longitude) {
  const url =`${rootUrl}&lat=${latitude}&lon=${longitude}`; //template string from ES2016
  //vanilla JS would be rootUrl + '&lat' + latitude + '&lon' + longitude
  
  return fetch(url) //returns a promise
    .then((response) => {
      return response.json();
    }).catch(function(err){
      return err;
    })
    .then(function(json){
      console.log(json);
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: json.weather[0].description
      }
    });
}
