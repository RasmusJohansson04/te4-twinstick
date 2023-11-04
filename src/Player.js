import Projectile from './Projectile.js'
import spriteImage from './assets/sprites/player.png'
import spriteImage2 from './assets/sprites/player_hurt.png'
import Arrow from './Arrow.js'
import Dagger from './Dagger.js'
import Spear from './Spear.js'
import Sword from './Sword.js'
import Exsanguinate from './Exsanguinate.js'


export default class Player {
  constructor(game) {
    this.game = game
    this.xOffset = 8
    this.width = 16
    this.height = 32
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 4

    const image = new Image()
    image.src = spriteImage
    this.image = image

    this.maxAmmo = 20
    this.ammo = 20
    this.ammoTimer = 0
    this.ammoInterval = 400

    this.xp = 0
    this.neededXp = 100
    this.level = 1

    this.lives = 10
    this.maxLives = 10

    this.weaponType = 0

    this.isHurt = false
    this.hurtTimer = 0
    this.hurtInterval = 300
  }

  update(deltaTime) {
    if (this.isHurt) {
      if (this.hurtTimer < this.hurtInterval) {
        this.hurtTimer += deltaTime
        this.image.src = spriteImage2
      }
      else {
        this.image.src = spriteImage
        this.isHurt = false
        this.hurtTimer = 0
      }
    }

    if (this.xp >= this.neededXp) {
      this.xp = this.xp - this.neededXp
      this.level++
      this.game.levelUp()
    }

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
    // context.fillStyle = '#f00'
    // context.fillRect(this.x, this.y, this.width, this.height)
    context.drawImage(this.image, this.x - this.xOffset, this.y)
    context.fillStyle = '#A53030'
    context.fillRect(this.x - this.lives * 2 + this.width / 2, this.y - 8, this.lives * 4, 4)

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

  arrow(mouseX, mouseY) {
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    this.projectiles.push(
      new Arrow(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle
      )
    )
  }

  dagger(mouseX, mouseY) {
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    this.projectiles.push(
      new Dagger(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle + .2
      )
    )
    this.projectiles.push(
      new Dagger(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle
      )
    )
    this.projectiles.push(
      new Dagger(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle - .2
      )
    )
  }

  spear(mouseX, mouseY) {
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    this.projectiles.push(
      new Spear(
        this.game,
        this.x + this.width / 2,
        this.y,
        angle
      )
    )
  }

  sword(mouseX, mouseY) {
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    this.projectiles.push(
      new Sword(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      )
    )
  }

  exsanguinate(mouseX, mouseY) {
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    this.lives--

    this.projectiles.push(
      new Exsanguinate(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle + Math.PI / 2
      )
    )
    this.projectiles.push(
      new Exsanguinate(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle
      )
    )
    this.projectiles.push(
      new Exsanguinate(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle + Math.PI
      )
    )
    this.projectiles.push(
      new Exsanguinate(
        this.game,
        this.x,
        this.y + this.height / 2,
        angle + (Math.PI * 3) / 2
      )
    )
  }
}
