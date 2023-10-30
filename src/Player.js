import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 16
    this.height = 16
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 4

    this.maxAmmo = 20
    this.ammo = 20
    this.ammoTimer = 0
    this.ammoInterval = 400

    this.lives = 10

    this.weaponType = 0
  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a') && this.x - this.maxSpeed > 0) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('d') &&
      this.x + this.maxSpeed < this.game.width - this.game.tileSize
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w') && this.y - this.maxSpeed > 0) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('s') &&
      this.y + this.maxSpeed < this.game.height - this.game.tileSize
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    if (this.speedX !== 0 && this.speedY !== 0) {
      this.speedX *= Math.SQRT1_2
      this.speedY *= Math.SQRT1_2
    }

    this.y += this.speedY
    this.x += this.speedX

    if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
      this.ammoTimer = 0
      this.ammo++
    } else {
      this.ammoTimer += deltaTime
    }

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  shoot(mouseX, mouseY, weaponType) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    switch (weaponType) {
      case 0:
        if (this.ammo > 0) {
          this.ammo--
          this.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              angle,
              'standard'
            )
          )
        }
        break
      case 1:
        if (this.ammo > 0) {
          this.ammo--
          this.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              angle + .2,
              'dagger'
            )
          )
          this.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              angle,
              'dagger'
            )
          )
          this.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              angle - .2,
              'dagger'
            )
          )
        }
        break
      case 2:
        if (this.ammo > 0) {
          this.ammo--
          this.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              angle,
              'spear'
            )
          )
        }
        break
    }
  }
}
