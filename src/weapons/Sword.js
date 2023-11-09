import Projectile from './Projectile'
import spriteImage from '../assets/sprites/sword.png'

export default class Sword extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.game = game
        this.width = 48
        this.height = 48
        this.x = x
        this.y = y
        this.angle = angle
        this.penetrate = true
        this.static = true

        const image = new Image()
        image.src = spriteImage
        this.image = image

        this.distance = 48
        this.damage = 3
        this.color = 'white'

        this.attackTimer = 0
        this.attackInterval = 250

        this.position = {
            x: this.distance * Math.cos(this.angle),
            y: this.distance * Math.sin(this.angle),
        }
    }

    update(deltaTime) {
        if (this.attackTimer > this.attackInterval) {
            this.attackTimer = 0
            this.markedForDeletion = true
        }
        else {
            this.attackTimer += deltaTime
            this.x = this.game.player.x + this.game.player.width / 2 - this.width / 2 + this.position.x
            this.y = this.game.player.y + this.game.player.height / 2 - this.height / 2 + this.position.y
        }
    }
}
