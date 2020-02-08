let LivingCreature = require('./LivingCreature');
let random = require('../modules/random').rand;

module.exports = class Eater extends LivingCreature{
    constructor(x,y,index) {
        super(x,y,index)
        this.energy = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    eat(){
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            
            matrix[newCell[1]] [newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newCell[0];
            this.y = newCell[1];

            for(let i in grassEaterArr)
                if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
                    grassEaterArr.splice(i,1);
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
        if(this.energy <= 0){
            matrix[this.y][this.x] = 1;
            grassArr.push(new Grass(this.x,this.y,1))
            
            for(let i in eaterArr)
                if(this.x == eaterArr[i].x && this.y == eaterArr[i].y){
                    eaterArr.splice(i,1);
                    break;
                }
            
            return;
        }
        this.mul() 
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 12 && newCell) {

            grassEaterArr.push(new GrassEater(newCell[0], newCell[1], this.index));
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
            return;
        }
        this.eat();
    }
    newinfo(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.newinfo();
        return super.chooseCell(character);
    }
}