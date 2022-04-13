
// Importar los servicio
const { searchDocuments, DocumentsType, DocumentsReviews, DocumentsxCamas} = require('../services/mongodb.service');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const consultaAirbnb = async (req, res) => {
    let answ = {}
    try {
        answ.ok = true
        answ.message = "Airbnb consultados"
        let result = await searchDocuments(process.env.COLLECTION_AIRBNB)
        answ.info = result
        res.send(answ)
    } catch (error) {
        console.log(error);
        answ.ok = false
        answ.message = "Error en la consulta de airbnb"
        answ.info = error
        res.status(500).send(answ)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const TiposAirbnb = async (req, res) => {
    let answ = {}
    try {
        answ.ok = true
        answ.message = "Tipos de Airbnb consultados con éxito"
        let result = await DocumentsType(process.env.COLLECTION_AIRBNB)
        result = result.map((element) => {
            return element._id
        })
        answ.info = result
        res.send(answ)
    } catch (error) {
        console.log(error);
        answ.ok = false
        answ.message = "Error al consultar los tipos de airbnb"
        answ.info = error
        res.status(500).send(answ)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const ReviewsAirbnb = async (req, res) => {
    let answ = {}
    try {
        answ.ok = true
        answ.message = "Airbnbs con más reviews consultados de forma exitosa"
        let result = await DocumentsReviews(process.env.COLLECTION_AIRBNB)
        answ.info = result
        res.send(answ)
    } catch (error) {
        console.log(error);
        answ.ok = false
        answ.message = "Ha ocurrido un error consultando los airbnb."
        answ.info = error
        res.status(500).send(answ)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const AirbnbCamas = async (req, res) => {
    let answ = {}
    try {
        // Limite de registros que pide el usuario para la consulta
        let limit = req.params.nro_beds
        answ.ok = true
        answ.message = "Airbnbs con más camas disponibles consultados exitosamente"
        // Se consultan los airbnb con más camas disponibles de la base de datos
        let result = await DocumentsxCamas(process.env.COLLECTION_AIRBNB, limit)
        answ.info = result
        res.send(answ)
    } catch (error) {
        console.log(error);
        answ.ok = false
        answ.message = "Ha ocurrido un error consultando los airbnbs"
        answ.info = error
        res.status(500).send(answ)
    }
}


module.exports = {consultaAirbnb,TiposAirbnb,ReviewsAirbnb,AirbnbCamas}