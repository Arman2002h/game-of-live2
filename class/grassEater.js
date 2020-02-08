let LivingCreature = require('./LivingCreature');
let random = require('../modules/random').rand;

module.exports = class GrassEater extends LivingCreature{  
    constructor(x,y,index) {

        super(x,y,index);
        this.energy = 4;
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
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            
            matrix[newCell[1]] [newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newCell[0];
            this.y = newCell[1];

            for(let i in grassArr)
                if(this.x == grassArr[i].x && this.y == grassArr[i].y){
                    grassArr.splice(i,1);
                    break;
                }
            this.energy ++;
            this.multiply++;

            return;
        }
        this.move();
    }
    move(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            
            matrix[newCell[1]] [newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newCell[0];
            this.y = newCell[1];

            this.energy -- ;

        }
    }
    die(){
        if(this.energy <= 0){
            matrix[this.y][this.x] = 1;
            grassArr.push(new Grass(this.x,this.y,1))
            
            for(let i in grassEaterArr)
                if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
                    grassEaterArr.splice(i,1);
                    break;
                }
            
            return;
        }
        this.mul() 
    }
    mul() {
        var newCell = random([random(this.chooseCell(0)),random(this.chooseCell(1))]);
        if (this.multiply >= 15 && newCell) {

            grassEaterArr.push(new GrassEater(newCell[0], newCell[1], this.index));
            matrix[newCell[1]][newCell[0]] = this.index;
            for (var i = 0; i < grassArr.length; i++)
                if(newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y)            
                    grassArr.splice(i,1);
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
        return super.chooseCell(character)
    }
}