const PORT = 3000;
let fs = require('fs')
const randmizer = require('./modules/random');

let randomMatrix = randmizer.randomMatrix;
let ArrForRandom = randmizer.ArrForRandom;

const express = require('express');
const app = express();
matrix = [];

let is_Game= false;

Grass = require('./class/grass');
GrassEater = require('./class/grassEater');
Eater  = require('./class/eater');
Admin  = require('./class/admin');
Tester = require('./class/tester');

TestArr = [];
AdminArr = [];
grassArr = [];
grassEaterArr = [];
eaterArr = [];
let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.get('/' , ( req, res) => {
	res.sendFile(__dirname + '/index.html');
    is_Game = true;
	matrix = randomMatrix(ArrForRandom([
		{ index: 0, count: 10 },
        { index: 1, count: 20 },
        { index: 2, count: 40 },
        { index: 3, count: 1  },
        { index: 4, count: 5  },
        { index: 5, count: 1  }]),50,50);
	newMatrix()
    // console.log(grassArr,grassEaterArr,eaterArr)
});
app.post('/commfig',( req, res) => {
	res.send(`{"lenx":${matrix[0].length},"leny":${matrix.length}}`);
});
//StarT/StoP => stp
app.post('/stp',( req, res)=>res.end(is_Game =!is_Game))

app.post('/sendmatrix', ( req, res) => {
        if(is_Game == true){
    	for (let i in grassArr) grassArr[i].mul();
        for (let i in grassEaterArr) grassEaterArr[i].die();
        for (let i in eaterArr) eaterArr[i].die();
        for (let i in AdminArr) AdminArr[i].die();
        for (let i in TestArr) TestArr[i].die();
    }
	res.send(JSON.stringify(matrix));
});

app.post('/up/:val', (req,res)=>{
    let val = req.params.val

    if(val < matrix.length)
    for (let  y= 0;y < val ; y++){
        for (let x = 0;x < matrix[y].length - 1; x++){
            if(matrix[y][x] == 1)
                for(let i in grassArr)
                    if(grassArr[i].x == x && grassArr[i].y == y)
                        grassArr.splice(i,1);
            if(matrix[y][x] == 2)
                for(let i in grassEaterArr)
                    if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                        grassEaterArr.splice(i,1);
            if(matrix[y][x] == 3)
                for(let i in eaterArr)
                    if(eaterArr[i].x == x && eaterArr[i].y == y)
                        eaterArr.splice(i,1);
            if(matrix[y][x] == 4)
                for(let i in AdminArr)
                    if(AdminArr[i].x == x && AdminArr[i].y == y)
                        AdminArr.splice(i,1);
            if(matrix[y][x] == 5)
                for(let i in TestArr)
                    if(TestArr[i].x == x && TestArr[i].y == y)
                        TestArr.splice(i,1);
        }
        matrix.shift()
        matrix.push(ArrForRandom([{index:0,count:matrix[y].length}]))
    }res.end();
});
app.post('/down/:val', (req,res)=>{
    let val = req.params.val

    if(val < matrix.length)
    for (let  y= matrix.length-1;y > matrix.length-(val+1) ; y--){
        for (let x = 0;x < matrix[y].length - 1; x++){
            if(matrix[y][x] == 1)
                for(let i in grassArr)
                    if(grassArr[i].x == x && grassArr[i].y == y)
                        grassArr.splice(i,1);
            if(matrix[y][x] == 2)
                for(let i in grassEaterArr)
                    if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                        grassEaterArr.splice(i,1);
            if(matrix[y][x] == 3)
                for(let i in eaterArr)
                    if(eaterArr[i].x == x && eaterArr[i].y == y)
                        eaterArr.splice(i,1);
            if(matrix[y][x] == 4)
                for(let i in AdminArr)
                    if(AdminArr[i].x == x && AdminArr[i].y == y)
                        AdminArr.splice(i,1);
            if(matrix[y][x] == 5)
                for(let i in TestArr)
                    if(TestArr[i].x == x && TestArr[i].y == y)
                        TestArr.splice(i,1);
        }
        matrix.unshift(ArrForRandom([{index:0,count:matrix[y].length}]))
        matrix.pop()
    }res.end();
});
setInterval(()=>{
    if(is_Game)
        fs.readFile("db.json", function(err, buf) {
           
            let db = JSON.parse(buf)
            db.push({'counts':{
                    'grass':grassArr.length,
                    'grassEater':grassEaterArr.length,
                    'eater':eaterArr.length,
                    'tester':TestArr.length,
                    'admin':AdminArr.length
                }
            })
            fs.writeFile("db.json",JSON.stringify(db)+,err =>{if(err)console.log(err)})
        });
},6000)
app.post('/left/:val',(req ,res)=>{
    let val = req.params.val

    if(val < matrix[0].length)
    for (let y in matrix){
        for (let x = 0;x < val; x++){
            if(matrix[y][x] == 1)
                for(let i in grassArr)
                    if(grassArr[i].x == x && grassArr[i].y == y)
                        grassArr.splice(i,1);
            if(matrix[y][x] == 2)
                for(let i in grassEaterArr)
                    if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                        grassEaterArr.splice(i,1);
            if(matrix[y][x] == 3)
                for(let i in eaterArr)
                    if(eaterArr[i].x == x && eaterArr[i].y == y)
                        eaterArr.splice(i,1);
            if(matrix[y][x] == 4)
                for(let i in AdminArr)
                    if(AdminArr[i].x == x && AdminArr[i].y == y)
                        AdminArr.splice(i,1);
            if(matrix[y][x] == 5)
                for(let i in TestArr)
                    if(TestArr[i].x == x && TestArr[i].y == y)
                        TestArr.splice(i,1);
            matrix[y].shift()
            matrix[y].push(0)
        }
    }res.end();
    
});
app.post('/right/:val',(req ,res)=>{
    let val = req.params.val

    if(val < matrix[0].length)
    for (let y in matrix){
        for (let x = 0;x < matrix[y].length - (val + 1); x++){
            if(matrix[y][x] == 1)
                for(let i in grassArr)
                    if(grassArr[i].x == x && grassArr[i].y == y)
                        grassArr.splice(i,1);
            if(matrix[y][x] == 2)
                for(let i in grassEaterArr)
                    if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                        grassEaterArr.splice(i,1);
            if(matrix[y][x] == 3)
                for(let i in eaterArr)
                    if(eaterArr[i].x == x && eaterArr[i].y == y)
                        eaterArr.splice(i,1);
            if(matrix[y][x] == 4)
                for(let i in AdminArr)
                    if(AdminArr[i].x == x && AdminArr[i].y == y)
                        AdminArr.splice(i,1);
            if(matrix[y][x] == 5)
                for(let i in TestArr)
                    if(TestArr[i].x == x && TestArr[i].y == y)
                        TestArr.splice(i,1);
            matrix[y].unshift(0)
            matrix[y].pop()
        }
    }res.end();
});
app.post('/randomMatrix', (req , res)=>{
    matrix = randomMatrix(ArrForRandom([
        { index: 0, count: 10 },
        { index: 1, count: 20 },
        { index: 2, count: 40 },
        { index: 3, count: 1  },
        { index: 4, count: 5  },
        { index: 5, count: 1  }]),50,50);
    newMatrix();
});

function newMatrix() {
    for (let y in matrix)for (let x in matrix[y]) {
        y = parseInt(y);x = parseInt(x);
        if (matrix[y][x] == 1) grassArr.push(new Grass(x, y, matrix[y][x]));
        if (matrix[y][x] == 2) grassEaterArr.push(new GrassEater(x, y, matrix[y][x]));
        if (matrix[y][x] == 3) eaterArr.push(new Eater(x, y, matrix[y][x]));
        if (matrix[y][x] == 4) AdminArr.push(new Admin(x, y, matrix[y][x]));
        if (matrix[y][x] == 5) TestArr.push(new Tester(x, y, matrix[y][x]));
    }
}
app.listen(PORT, err => console.log(err || `useing port {${PORT}}`));