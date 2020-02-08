let LivingCreature = require('./LivingCreature');
let random = require('../modules/random').rand;

module.exports = class Grass extends LivingCreature{
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;  
        }
    }
}