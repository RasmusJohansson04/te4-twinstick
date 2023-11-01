import { Noise } from "noisejs"

export default class Background {
    constructor(game) {
        this.game = game
        this.width = Math.ceil(game.width / game.tileSize)
        this.height = Math.ceil(game.height / game.tileSize)
        this.map = []
        this.noise = new Noise(Math.random())
        this.setupBackground()
    }

    setupBackground() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let value = this.noise.simplex2(x / 100, y / 100);
                if (value < -.1) {
                    this.map.push({
                        color: '#588157',
                        x: x,
                        y: y
                    })
                }
                else if (value < .3) {
                    this.map.push({
                        color: '#3A5A40',
                        x: x,
                        y: y
                    })
                }
                else if (value < .7) {
                    this.map.push({
                        color: '#344E41',
                        x: x,
                        y: y
                    })
                }
            }
        }
    }

    draw(context) {
        for (let index = 0; index < this.map.length; index++) {
            let tile = this.map[index]
            context.fillStyle = tile.color
            context.fillRect(tile.x * 16, tile.y * 16, 16, 16)
        }
    }
}