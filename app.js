const express = require('express')
const app = express() 
const bodyParser = require("body-parser")
const mustacheExpress = require('mustache-express')

 
app.engine('mustache', mustacheExpress('./views' + '/partials', '.mustache'))
app.set('views', './views')

app.use(bodyParser.urlencoded({extended: false}))
app.use('/css', express.static("css")) 

app.set('view engine', 'mustache')


// const db = pgp(CONNECTION_STRING)
let trips = []

app.get('/createTrip', (req, res) => {
    res.render('createTrip')
})

app.get('/updateTrips', (req, res) => {
    res.render('updateTrips')
})

app.post('/updateTrips', (req, res) => {
    let{title, image, departureDate, returnDate} = req.body

    const trip = {tripId: trips.length +1, title: title, image: image, departureDate: departureDate, returnDate: returnDate}
    
    trips.push(trip)
    
})

// app.put('updateTrips', (req, res) => {

// })
app.get('/createTrip', (req, res) => {
    res.json(trips)
})

app.post('/createTrip', (req, res) => {
    let{title, image, departureDate, returnDate} = req.body

    const trip = {tripId: trips.length +1, title: title, image: image, departureDate: departureDate, returnDate: returnDate}
    console.log(trip)
    trips.push(trip)
    
    console.log(trips)
    res.redirect('/trips')
})

app.get('/trips', (req, res) => {
    res.render('trips', {allTrips: trips})
})

// app.post('/trips/deleteTrip', (req, res) => {

//     let tripId = req.body.tripId
//     db.none('DELETE FROM trips WHERE tripId = $1', [tripId])
//     .then(() => {
//         res.redirect('/trips')
//     })
// })

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('Server is running...')
})