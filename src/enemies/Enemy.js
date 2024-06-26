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

    this.isHurt = false
    this.hurtTimer = 0
    this.hurtInterval = 200

    //!   Sprite Animation

    this.frameX = 0
    this.frameY = 0
    this.flip = false

    this.maxFrame = 4
    this.fps = 4
    this.spriteTimer = 0
    this.interval = 1000 / this.fps
  }

  hurt(deltaTime) {
    if (this.isHurt) {
      if (this.lives <= 0) {
        this.speed = 0
      }
      if (this.hurtTimer < this.hurtInterval) {
        this.hurtTimer += deltaTime
        if (this.image) {
          this.setSprite('hurt')
        }
      }
      else {
        if (this.image) {
          this.setSprite('idle')
        }
        this.isHurt = false
        this.hurtTimer = 0
      }
    }
  }

  setSprite(spriteName) {
    switch (spriteName) {
      case 'walk':
        this.image.src = this.walkAnimation.spriteSheet
        this.maxFrame = this.walkAnimation.maxFrame
        this.interval = 1000 / this.fps
        break
      case 'idle':
        this.image.src = this.idleAnimation.spriteSheet
        this.maxFrame = this.idleAnimation.maxFrame
        this.interval = 1000 / this.fps
        break
      case 'hurt':
        this.image.src = this.hurtAnimation.spriteSheet
        this.maxFrame = this.hurtAnimation.maxFrame
        this.interval = 1000 / this.fps
        break
    }
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
      context.fillStyle = '#A53030'
      context.fillRect(this.x - this.lives / this.maxLives * 25 / 2 + this.width / 2, this.y - 8, this.lives / this.maxLives * 25, 4)
    }
    else if (this.type === 'boss') {
      context.fillStyle = '#A53030'
      context.textAlign = 'left'
      context.font = `25px Arial`
      context.fillText(`BOSS`, 40, this.game.height - 50)
      context.fillRect(40, this.game.height - 40, (this.lives / this.maxLives) * (this.game.width - 40 * 2), 8)
    }

    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    if (this.image) {
      // console.log((this.image))
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.flip ? this.x * -1 - this.width : this.x,
        this.y,
        this.width,
        this.height
      )

      context.restore()
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
