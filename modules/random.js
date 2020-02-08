let random = (arg)=> {
    if(typeof arg === 'number')return Math.floor(Math.random()*(arg+1))
	return arg[Math.floor(Math.random()*arg.length)]
}
function randomMatrix(r, n, m) {
    let matrix = [];
    for (let y = 0; y < n; y++) {
        matrix.push([])
        for (let x = 0; x < m; x++) {
            matrix[y].push(Math.floor(random(r)));
        }
    }
    return matrix;
}
function ArrForRandom(objArr) {
    let res = [];
    for (let i in objArr)
        for (let j = 0; j < objArr[i].count; j++) {
            res.push(objArr[i].index);
        }
    return res
}

module.exports = {
	'rand':random,
	'ArrForRandom':ArrForRandom,
	'randomMatrix':randomMatrix
}
