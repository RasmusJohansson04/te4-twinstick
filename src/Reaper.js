import Enemy from './Enemy.js'
import Arrow from './Arrow.js'

export default class Reaper extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 64
        this.height = 64
        this.x = x
        this.y = y
        this.speed = 1
        this.lives = 50
        this.maxLives = 50
        this.color = 'pink'
        this.engagementDistance = 500
        this.projectiles = []
        this.shootTimer = 0
        this.shootInterval = 400
        this.type = 'boss'

        this.score = 100
        this.xp = 100
    }

    update(player, deltaTime) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis

        if (distance > this.engagementDistance) {
            this.x += speedX // move the enemy towards the player on the x axis
            this.y += speedY // move the enemy towards the player on the y axis
        }
        else {

            if (this.shootTimer > this.shootInterval) {
                this.shoot(player.x, player.y)
                this.shootTimer = 0
            }
            else {
                this.shootTimer += deltaTime
            }
        }
        // projectiles
        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)
        })
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
        )
    }

    shoot(playerX, playerY) {
        const angle = Math.atan2(
            playerY - (this.y + this.height / 2),
            playerX - (this.x + this.width / 2)
        )
        this.projectiles.push(
            new Arrow(
                this.game,
                this.x + this.width / 2,
                this.y + this.height / 2,
                angle
            )
        )
        console.log(this.projectiles)
    }
}
