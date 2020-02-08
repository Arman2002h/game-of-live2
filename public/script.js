let side = 10;
const colors = [
    ['#acacac', '#00FF00', '#FFFF00', '#FF0000', '#000000','#FFFFFF'],
    ['#acac00', '#00FFFF', '#00FF00', '#FFFF00', '#FFFFFF','#000000'],
    ['#00acac', '#FFFF00', '#00FFFF', '#00FF00', '#000000','#FFFFFF'],
    ['#ac00ac', '#0FFFF0', '#0FFF00', '#FFF000', '#FFFFFF','#000000']
];
let t_out = 0;
let w = 0;
// old_t = 0;
// let t = 0;
function setup() {
    AjaxPost('/commfig',data=>{
        data = JSON.parse(data)
        createCanvas(data.lenx * side,data.leny * side);
        background('#acacac');
        setInterval(()=>AjaxPost('/sendmatrix',(matrix)=>{
            t_out++
            if(t_out%100 == 1)w++;
            if(w >= colors.length)w = 0;
            console.log(w , t_out)
            if(!matrix)return console.log('err send matrix');
            matrix = JSON.parse(matrix);
            for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                    fill(colors[w][matrix[y][x]]);
                    rect(side * x, side * y, side, side);
                }
            }
        }),100);
    });
}
function AjaxPost(url,callback,data) {
    callback = callback || function(){}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText,this);
        }
    };
    xhttp.open("POST", url+`/${data||''}`, true);
    xhttp.send();
    return xhttp
}

// const colors = ['#acacac', '#00FF00', '#FFFF00', '#FF0000', '#000000','#FFFFFF',];
// ()=>{
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {

//             fill(colors[matrix[y][x]]);
//             rect(side * x, side * y, side, side);
//         }
//     }
// }