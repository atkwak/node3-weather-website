// console.log("client side js is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((res)=>{     //fetch data from a http server in json format
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch ('http://localhost:3000/weather?address=seattle').then((res)=>{
//     res.json().then((data) =>{
//         if (data.error){
//                 console.log(data.error)
//             } else{
//                 console.log(data.location)
//                 console.log(data.forecast.Description)
//                 console.log(data.forecast.Temp)
//                 console.log(data.forecast.FeelsLike)
//             }   

//     })
// })

const weatherForm = document.querySelector('form')
const searchCity = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'from Jave script'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = searchCity.value

    messageOne.textContent =''
    messageTwo.textContent = ''
    fetch ('http://localhost:3000/weather?address='+location).then((res)=>{
    res.json().then((data) =>{
        if (data.error){
                messageOne.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.Description+' Temperture: '+data.forecast.Temp+' Feels like: '+data.forecast.FeelsLike
                // console.log(data.location)
                // console.log(data.forecast.Description)
                // console.log(data.forecast.Temp)
                // console.log(data.forecast.FeelsLike)
            }   
        })
    })  
})