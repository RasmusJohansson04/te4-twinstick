import Enemy from './Enemy.js'

export default class Gargoyle extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 48
        this.height = 48
        this.x = x
        this.y = y
        this.speed = .5
        this.lives = 7
        this.maxLives = this.lives
        this.color = 'yellow'
        this.weight = 1
        this.id = 2

        this.score = 50
        this.xp = 30
    }

    update(player) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis
    }
}
