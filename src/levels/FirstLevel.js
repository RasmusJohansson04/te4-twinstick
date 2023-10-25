import Map from '../Map'
import Tile from '../Tile'

export default class FirstLevel extends Map {
    constructor(game) {
        super(game, 3000, 3000)
        this.addTile(new Tile(game, 0, 450, 300, 50))
    }
}