const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bson = require('bson');
require('dotenv').config();

const PORT = process.env.EXPRESS_PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json())

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URL}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, { useUnifiedTopology: true, }).then((client) => {
	console.log('Connected to Mongo Atlas');
	const db = client.db(process.env.MONGO_DATABASE);
	const todos = db.collection('weddingtodos');

	
	app.get('/', (req, res) => {
		res.send('REST API testing!');
	});

	
	app.get('/weddingtodos', (req, res) => {
		todos.find().toArray().then((results) => {
			res.status(200).send(results);
		}).catch((error) => {
			console.error('Get weddingtodos error: ', error);
			res.status(400).send(error);
		});
	});

	
	app.get('/weddingtodos/:id', (req, res) => {
		let objectId = bson.ObjectID(req.params.id);

		todos.findOne(
			{ _id: { $eq: objectId }, }
		).then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('This wedding todo do not exists.');
			}
		}).catch((error) => {
			console.error('Get 1 error: ', error);
			res.status(400).send(error);
		});
	});

	
	app.post('/weddingtodos', (req, res) => {
		todos.insertOne(req.body)
			.then((result) => {
				if (result.insertedCount >= 0) {
					res.status(201).send(result.ops);
				} else {
					res.status(500).send('Your wedding todo could not be created.');
				}
			}).catch((error) => {
				console.error('Create error; ', error);
				res.status(400).send(error);
			});
	});

	
	app.put('/weddingtodos/:id', (req, res) => {
		let objectId = bson.ObjectID(req.params.id);

		todos.findOneAndUpdate(
			{ _id: { $eq: objectId, }, },
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
					actionby: req.body.actionby,
					dueByDate: req.body.dueByDate,
					status: req.body.status,
					option: req.body.option
				},
			},
			{
				upsert: true
			}
		).then((result) => {
			if (result.ok) {
				res.status(200).send(req.body);
			} else {
				res.status(400).send('Your wedding todo update failed.');
			}
		}).catch((error) => {
			console.error('Update error; ', error);
			res.status(400).send(error);
		});
	});

	
	app.delete('/weddingtodos/:id', (req, res) => {
		let objectId = bson.ObjectID(req.params.id);

		todos.findOneAndDelete(
			{ _id: { $eq: objectId, }, },
		).then((result) => {
			if (result.ok) res.status(200).send('Wedding todo was successfully deleted.');
		}).catch((error) => {
			console.error('Delete error; ', error);
			res.status(400).send(error);
		});
	});

	// LISTEN
	app.listen(PORT, () => {
		console.log(`App is listening on PORT ${PORT}`);
	});
}).catch((error) => {
	console.error('Connection error: ', error);
});