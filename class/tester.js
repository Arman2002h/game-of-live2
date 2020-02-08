let LivingCreature = require('./LivingCreature');
let random = require('../modules/random').rand;

module.exports = class Tester extends LivingCreature{
    constructor(x,y,index) {

        super(x,y,index)

        this.multiply = 0;
        this.energy = 40;
        this.directions = [];
    }
    mymethod(){
        if(Math.floor(Math.random()*100) <= 5){
           let direct = [];
            for(let i = -2; i <= 2; i ++)
                for(let j = -2; j <= 2; j ++){
                    let x = this.x + j;
                    let y = this.y + i;
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                        for(let i in grassEaterArr)
                            if(x === grassEaterArr[i].x && y === grassEaterArr[i].y){
                                grassEaterArr.splice(i,1);
                                break;
                            }
                        for(let i in eaterArr)
                            if(x === eaterArr[i].x && y === eaterArr[i].y){
                                eaterArr.splice(i,1);
                                break;
                            }
                        for(let i in AdminArr)
                            if(x === AdminArr[i].x && y === AdminArr[i].y){
                                AdminArr.splice(i,1);
                                break;
                            }
                        for(let i in TestArr)
                            if(x === TestArr[i].x && y === TestArr[i].y){
                                TestArr.splice(i,1);
                                break;
                            }
                        matrix[y][x] = 2;
                        grassEaterArr.push( new GrassEater(x,y,matrix[y][x]))
                    }
                }
        } 
    }
    eat(){

        let newCell = random(this.chooseCell(4));
        
        if (newCell) {
            
            matrix[newCell[1]] [newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newCell[0];
            this.y = newCell[1];

            for(let i in AdminArr)
                if(this.x === AdminArr[i].x && this.y === AdminArr[i].y){
                    AdminArr.splice(i,1);
                    break;
                }

            this.energy +=5;
            this.multiply++;

            return;
        }
        this.move();
    }
    move(){
        var newCell = random([random(this.chooseCell(1)),random(this.chooseCell(0))]);
        if (newCell) {
            matrix[newCell[1]] [newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newCell[0];
            this.y = newCell[1];

            for (var i = 0; i < grassArr.length; i++)
                if(this.x == grassArr[i].x && this.y == grassArr[i].y)            
                    grassArr.splice(i,1);

            this.energy -- ;

        }
    }
    die(){
        if( this.energy <= 0){
            matrix[this.y][this.x] = 1;
            grassArr.push(new Grass(this.x,this.y,1))
            
            for(let i in AdminArr)
                if(this.x == TestArr[i].x && this.y == TestArr[i].y){
                    TestArr.splice(i,1);
                    break;
                }

            this.mymethod();
            return;
        }
        this.mul();
    }
    mul(f = false) {
        var newCell = random(this.chooseCell(0));
        if ((this.multiply >= 12 && newCell)|| f ) {

            AdminArr.push(new Admin(newCell[0], newCell[1], this.index));
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
            return;
        }
        this.eat();
    }
    newinfo(){
        this.directions = [];
        for(let i = -100; i <= 100; i ++)
            for(let j = -100; j <= 100; j ++)
                if(i==0 || j==0)
                    this.directions.push([this.x - j,this.y - i])
    }
    chooseCell(character) {
        this.newinfo();
        if(typeof character === 'number'){
            return super.chooseCell(character);
        }else{
            let found = [];
            for (var j = 0; j < character.length; j++) {
                super.chooseCell(character[j]).forEach(el => {
                    found.push(el)
                });
            }
            return found;
        }
    }
}