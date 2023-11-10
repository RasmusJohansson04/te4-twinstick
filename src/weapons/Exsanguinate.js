import Projectile from './Projectile'
import spriteImage from '../assets/sprites/sword.png'

export default class Exsanguinate extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.game = game
        this.width = 48
        this.height = 48
        this.x = x
        this.y = y
        this.angle = angle
        this.penetrate = true

        const image = new Image()
        image.src = spriteImage
        this.image = image

        this.speed = 400
        this.damage = 4
        this.markedForDeletion = false
    }

    update(deltaTime) {
        const velocity = {
            x: this.speed * Math.cos(this.angle),
            y: this.speed * Math.sin(this.angle),
        }

        this.x += velocity.x * (deltaTime / 1000)
        this.y += velocity.y * (deltaTime / 1000)

        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }
    }
}
