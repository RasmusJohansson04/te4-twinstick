import Projectile from './Projectile'
import spriteImage from '../assets/sprites/arrow.png'

export default class Arrow extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.game = game
        this.width = 16
        this.height = 4
        this.x = x
        this.y = y
        this.angle = angle

        const image = new Image()
        image.src = spriteImage
        this.image = image

        this.speed = 400
        this.damage = 1 + game.player.baseDmg
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
