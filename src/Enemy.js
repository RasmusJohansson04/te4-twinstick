export default class Enemy {
  constructor(game, color) {
    this.game = game
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
    this.markedForDeletion = false
    this.color = color
    this.type = 'enemy'
    this.isHit = false
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX
    if (this.x < 0 || this.x > this.game.width) this.markedForDeletion = true
    if (this.y < 0 || this.y > this.game.height) this.markedForDeletion = true
  }

  draw(context) {
    if (this.projectiles) {
      this.projectiles.forEach((projectile) => {
        projectile.draw(context)
      })
    }
    if (this.type === 'enemy') {
      context.fillStyle = 'red'
      context.fillRect(this.x - this.lives * 2 + this.width / 2, this.y - 8, this.lives * 4, 4)
    }
    else if (this.type === 'boss') {
      context.fillStyle = 'red'
      context.textAlign = 'left'
      context.font = `25px Arial`
      context.fillText(`BOSS`, 40, this.game.height - 50)
      context.fillRect(40, this.game.height - 40, (this.lives / this.maxLives) * (this.game.width - 40 * 2), 8)
    }
    if (this.image) {
      context.drawImage(this.image, this.x - this.xOffset, this.y)
    }
    else {
      context.fillStyle = this.color
      context.fillRect(this.x, this.y, this.width, this.height)
    }

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
  }
}
