var MongoClient = require('mongodb').MongoClient

exports.handler = async (event) => {
  const ddb_connection = process.env.DDB_CONECTION;
  var client = await MongoClient.connect(ddb_connection);
  const database = process.env.DATABASE;
  var db = client.db(database);
  
  //Specify the collection to be used
  var col = db.collection('sample-collection');
  
  const result = await col.insertOne({ 'hello': 'Amazon DocumentDB' });
  console.log("result", result);
  
  const document = await col.findOne({ 'hello': 'Amazon DocumentDB' });
  console.log("document", document);
  
  client.close();
  
  const response = {
    statusCode: 200,
    body: document,
  };
  
  return response;
};
