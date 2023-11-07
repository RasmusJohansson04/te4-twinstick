import Enemy from './Enemy.js'
import spriteImage from './assets/sprites/ghost.png'
import spriteImage2 from './assets/sprites/ghost_hurt.png'

export default class Ghost extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.xOffset = 8
    this.width = 16
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 1
    this.lives = Math.floor(Math.random() * 2) + 1
    this.color = 'orange'
    this.weight = 20
    this.id = 0

    this.score = 10
    this.xp = 10

    this.normalSprite = spriteImage
    this.hurtSprite = spriteImage2

    const image = new Image()
    image.src = spriteImage
    this.image = image
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
