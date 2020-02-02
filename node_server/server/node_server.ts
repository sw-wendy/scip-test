import * as express from 'express';
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api',(request, response) => response.send('received'));

app.get('/api/node',(request, response) => {
	//response.json(nodes);
	let result = nodes;
	let params = request.query;
	if(params.hostname) {
		result = result.filter(node => node.hostname.indexOf(params.hostname) !== -1);
	}
	response.json(result);
});

app.get('/api/node/:uuid', (request, response) => {
	//response.json(nodes.find((node) => node.uuid == request.params.uuid));
	response.json(nodes.find(node => node.uuid == request.params.uuid));
});

// POST http://localhost:8080/api/user
// parameters sent with 
app.post('/api/node', (req, res) => {
    var uuid = req.body.uuid;
    var hostname = req.body.hostname;
    console.log(uuid+' '+hostname + ' ');

    res.send(uuid + ' ' + hostname + ' ');

});


const server = app.listen(8080, 'localhost', () => {
	console.log('server start');
});

export class Node {
	constructor(public hostname:string,
				public uuid:string,
				public health:Health,
				public systemInfo:SysInfo) {}

}

class Health {
	public uptime: number;
	public healthy: boolean;
}

class SysInfo {
	public cpu: string;
	public numCores: number;
}
let health: Health= new Health();
health.uptime=12310;
health.healthy=true;
let health2: Health= new Health();
health2.uptime=12322;
health2.healthy=false;
let health3: Health= new Health();
health3.uptime=12333;
health3.healthy=true;

let system_info:SysInfo= new SysInfo();
system_info.cpu="ARM";
system_info.numCores=16;
let system_info2:SysInfo= new SysInfo();
system_info2.cpu="ROM";
system_info2.numCores=17;

let nodes: Node[] = [
 	new Node("node_001","100",health,system_info),
 	new Node("node_002","200",health2,system_info2),
 	new Node("node_003","333",health3,system_info)
 	];
  
