import Enemy from './Enemy.js'
import Arrow from '../weapons/Arrow.js'
import skeletonWalk from '../assets/sprites/skeleton_walk.png'

export default class Skeleton extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 1
    this.lives = 1
    this.maxLives = this.lives
    this.color = 'purple'
    this.weight = 5
    this.id = 1

    this.animate = true

    const image = new Image()
    image.src = skeletonWalk
    this.image = image

    this.walkAnimation = {
      spriteSheet: skeletonWalk,
      maxFrame: 4
    }

    this.idleAnimation = {
      spriteSheet: skeletonWalk,
      maxFrame: 2
    }

    this.hurtAnimation = {
      spriteSheet: skeletonWalk,
      maxFrame: 1
    }

    this.score = 25
    this.xp = 20

    this.engagementDistance = 200
    this.projectiles = []
    this.shootTimer = 0
    this.shootInterval = 800
  }

  update(player, deltaTime) {
    //! Sprite animation update
    if (this.spriteTimer > this.interval) {
      this.frameX++
      this.spriteTimer = 0
    } else {
      this.spriteTimer += deltaTime
    }

    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }

    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    if (distance > this.engagementDistance) {
      this.setSprite('walk')
      this.x += speedX // move the enemy towards the player on the x axis
      this.y += speedY // move the enemy towards the player on the y axis

      if (speedX < 0) {
        this.flip = true
      } else if (speedX > 0) {
        this.flip = false
      }
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
  }
}
