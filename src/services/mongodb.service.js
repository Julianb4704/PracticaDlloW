const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectarDB = async () => {
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}

const searchDocuments = async (nombreColeccion, fltr) => {
  let db = await conectarDB()
  let colection = db.collection(nombreColeccion)
  fltr = fltr ? fltr : {}
  return colection.find(fltr).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
}

const DocumentsType = async (nombreColeccion) => {
  let db = await conectarDB()
  // La propiedad $group nos ayuda a agrupar los registros
  let pipeline = [{ $group: { _id: "$property_type" } }]
  let colection = db.collection(nombreColeccion).aggregate(pipeline)
  return colection.toArray()
}

const DocumentsReviews = async (nombreColeccion) => {
  let db = await conectarDB()
  let sort = { number_of_reviews: -1 }
  let projection = { _id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1 }
  let colection = db.collection(nombreColeccion)
  return colection.find().sort(sort).project(projection).limit(parseInt(process.env.DEFAULT_LIMIT_REVIEWS)).toArray()
}

const DocumentsxCamas = async (nombreColeccion, limite) => {
  let db = await conectarDB()
  let sort = { beds: -1 }
  let projection = { _id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1 }
  let colection = db.collection(nombreColeccion)
  return colection.find().sort(sort).project(projection).limit(parseInt(limite)).toArray()
}

module.exports = {searchDocuments, DocumentsType, DocumentsReviews, DocumentsxCamas}