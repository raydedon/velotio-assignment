const express = require('express');
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const indexRouter = require('./server/routes/indexRoute');
const filesApiRouter = require('./server/routes/filesApiRoute');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(encodeURI(config.get('MongoDB.connectionString')), { useNewUrlParser: true })
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch(err => {
		console.log(`Could not connect to the database. Exiting now...${err}`);
		process.exit(0);
	});

const db = mongoose.connection;

if (cluster.isMaster && config.get('App.isCluster')) {
	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {
		console.log(`Worker ${worker.process.pid} is online`);
	});

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
		console.log('Starting a new worker');
		cluster.fork();
	});
} else {
	const app = express();

	let myLogger = (req, res, next) => {
		console.log('LOGGED');
		next();
	};

	let requestTime = (req, res, next) => {
		req.requestTime = Date.now();
		next();
	};

	app.set('views', path.join(__dirname, 'server/views/pages'));
	app.set('view engine', 'ejs');

	app.use(require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		indentedSyntax: true,
		sourceMap: true
	}));
	// Setup public directory
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(morgan('short'));
	app.use(myLogger);
	app.use(requestTime);

	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use('/', indexRouter);
	app.use('/api/files', filesApiRouter);

	app.use((req, res) => {
		res.status(404).send('Page not found. Try another.');
	});

	let mode = process.env.NODE_ENV || 'development';

	app.listen(config.get('App.webServer.port'), (error) => {
		console.log(`Process ${process.pid} is listening to all incoming requests 
		mode: ${mode} 
		Server listening on port: ${config.get('App.webServer.port')}`);
	});
}

