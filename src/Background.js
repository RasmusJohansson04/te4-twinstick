import { Noise } from "noisejs"

export default class Background {
    constructor(game) {
        this.game = game
        this.width = Math.ceil(game.width / 8)
        this.height = Math.ceil(game.height / 8)
        this.map = []
        this.noise = new Noise(Math.random())
        this.setupBackground()
    }

    setupBackground() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let value = this.noise.simplex2(x / 100, y / 100)
                if (value < -.3) {
                    this.map.push({
                        color: '#468232',
                        x: x,
                        y: y
                    })
                }
                else if (value < .5) {
                    this.map.push({
                        color: '#25562E',
                        x: x,
                        y: y
                    })
                }
                else {
                    this.map.push({
                        color: '#19332D',
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
            context.fillRect(tile.x * 8, tile.y * 8, 8, 8)
        }
    }
}
