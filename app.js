const express = require("express");
const fs = require("fs");

const app = express();

const port = 5000;

app.get('/', (req, res) => {
	res.send('Greeting from server');
});

app.get('/data', (req, res) => {
	res.send('Here is some data');
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
})

let text = '';
for (let i = 1; i <= 10; i++) {
	text += i + '\n';
}

fs.writeFile('./text/file.txt', text, err => {
	if (err) throw err;
	console.log('File successfully written');
});

fs.readFile('./text/file.txt', 'utf-8', (err, data) => {
	if (err) throw err;

	const arr = data.split('\n');
	let randomText = arr[Math.floor(Math.random()*(arr.length - 1))];

	fs.appendFile('./text/file.txt', randomText, err => {
		if (err) throw err;
	});

	console.log('Random text:', randomText)

	fs.unlink('./text/file.txt', err => {
		if (err) throw err;
	});
});