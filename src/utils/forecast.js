const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=cabf87b4e23048a21279e303d3d45e58&query='+latitude+','+longitude+'&units=f'
    request ({url, json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect', undefined)
        } else if (body.error){
            callback ('Unable to find weather', undefined)
        }else {
            callback(undefined,{
                Description: body.current.weather_descriptions[0],
                Temp:body.current.temperature,
                FeelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast