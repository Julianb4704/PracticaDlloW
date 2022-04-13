const express = require('express')
const router = express.Router()

const airbnbCtr = require("../controllers/airbnb.controller")

const vs = "/api/v1"

router.get(vs + "/airbnb/all-properties", airbnbCtr.consultaAirbnb)
router.get(vs + "/airbnb/types", airbnbCtr.TiposAirbnb)
router.get(vs + "/airbnb/reviews", airbnbCtr.ReviewsAirbnb)
router.get(vs + "/airbnb/beds/:nro_beds", airbnbCtr.AirbnbCamas)

module.exports = router




