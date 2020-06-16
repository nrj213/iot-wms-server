const express = require('express')
const userRouter = require('./routes/user.router')
const binRouter = require('./routes/bin.router')
const municipalityRouter = require('./routes/municipality.router')
const areaRouter = require('./routes/area.router')
const collectionRecordRouter = require('./routes/collectionrecord.router')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

/**
 * Enabling cross origin requests support
 */
app.use(cors())

/**
 * Parse application/json request body
 */
app.use(bodyParser.json())

/**
 * Express configuration
 */
app.set('port', process.env.PORT || 8080)

/**
 * Configuring routes
 */
app.use('/wms/users', userRouter)
app.use('/wms/bins', binRouter)
app.use('/wms/municipalities', municipalityRouter)
app.use('/wms/areas',areaRouter)
app.use('/wms/collectionrecords', collectionRecordRouter)

/**
 * Managing unhandled rejections
 */
process.on('unhandledRejection', function(err) {
    console.log(err);
});

/**
 * Start Expess server
 */
app.listen(app.get('port'), () => {
    console.log("App is running at http://localhost:%d in %s mode", app.get('port'), app.get('env'));
})