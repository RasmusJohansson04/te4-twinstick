
export default class Projectile {
  constructor(game, x, y, angle) {
    this.game = game
    this.x = x
    this.y = y
    this.angle = angle
    this.markedForDeletion = false
  }

  update(deltaTime) {

    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.save()
    if (this.static) {
      context.translate(this.x + this.width / 2 - this.position.x, this.y + this.height / 2 - this.position.y)
    }
    else {
      context.translate(this.x + this.width / 2, this.y + this.height / 2)
    }
    context.rotate(this.angle)

    if (this.image) {
      if (this.static) {
        context.drawImage(this.image, this.width / 2, -this.height / 2)
      }
      else {
        context.drawImage(this.image, -this.width / 2, -this.height / 2)
      }
    }
    else {
      context.fillStyle = this.color
      context.fillRect(0, 0, this.width, this.height)
    }

    context.restore()
  }
}
