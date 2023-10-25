export default class Map {
    constructor(game, width, height) {
        this.game = game
        this.width = width
        this.height = height
        this.tiles = []
    }

    draw(context) {
        this.tiles.forEach((tile) =>
            tile.draw(context, this.game.camera.x, this.game.camera.y)
        )
    }

    addTile(tile) {
        this.tiles.push(tile)
    }
}