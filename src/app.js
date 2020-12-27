const path = require('path')
const express = require('express')
const hbs = require ('hbs')                            // handlebars' partials like header, footer, sidebars 
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')       

// console.log(__dirname)
// console.log(path.join(__dirname,'public'))
const port = process.env.PORT || 3000
const app = express()

//define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')                       // setup the handlebars npm. hbs expects to find the templates in the "view" directory under the root
                                                    // the file extension fo the handlebars is .hbs.  
                                                    // handlebars is used to create dynamic web page templates
app.set('views',viewPath)                          // changes the default directory for the 
hbs.registerPartials(partialPath)                   // location of partial files

// setup static directory to serve
app.use(express.static(publicDir))                 // looks for the html pages in directory.  index.html is the default

app.get('',(req,res)=>{                            // creates route to the index.hbs file
    res.render('index',{
        title:'Weather Weather',
        name:'Austin'
    })                             // instead of send, render method is use to get the hbs file. no need to add the .hbs extension
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About About',
        name: 'Austin austin AuStIn'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'help text is not wihat it seems to be',
        title: 'help',
        name:'austin'
    })
})
// http.get('/help', (req,res) =>{
//     res.send('Help page')
// })

// http.get('/about',(req, res)=>{
//     res.send('<h1>About page</h1>')
// })

// app.get('/weather',(req, res)=>{
//     res.send([{
//         name: 'nami',
//         captain: 'luffy',
//         coworker: 'Zoro',
//         location: 'https://wac.net'
//     },{
//         name: 'zero',
//         captain: 'luffy',
//         coworker: 'Ussop',
//         location: 'https://fuck.com'
//     }])
// })
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'An address must be provided'
        })
    }
    const city = req.query.address
    // geocode (city,(geoerror,{latitude,longtude, locaiton}))=>{

    // }
    geocode(city,(error,{longitude,latitude,location} = {})=>{   // {} indicates default value object for Longi, lati, loca
        if (error){                                              // so the server does not stop if no city is provided.
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if (!req.query.search){                    // if there is no search term
        return res.send({
            error: 'You must provide a search term'            
        })
    } 
        console.log(req.query)
        res.send({
            products: [] 
        })
})

app.get('/help/*',(req,res) =>{
    res.render('error404',{
        title:'Error 404',
        name:'Austin',
        error: 'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{                                // if none of the route handler is matched, it'll run this.      
    res.render('error404',{
        title:'Error 404',
        name:'Austin',
        error: 'Page Not Found'
    })
})
app.listen(port,()=>{// port 3000 is development port
    console.log('Server is runing...')
})           
