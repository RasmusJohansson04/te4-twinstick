import InputHandler from './utilities/InputHandler.js'
import Player from './Player.js'
import UserInterface from './utilities/UserInterface.js'
import Candy from './Candy.js'
import Background from './utilities/Background.js'
import LevelScreen from './utilities/LevelScreen.js'
import WaveController from './utilities/WaveController.js'
import Sound from './Sound.js'

export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.keys = []
    this.enemies = []
    this.drops = []

    this.gameOver = false
    this.paused = true

    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 500
    this.hasWave = true
    this.waveTimer = 0
    this.waveInterval = 1000
    this.score = 0
    this.tileSize = 16

    this.sound = new Sound(this)
    this.background = new Background(this)
    this.player = new Player(this)
    this.lvlScreen = new LevelScreen(this)
    this.waveController = new WaveController(this)
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
  }

  levelUp() {
    this.paused = !this.paused
    this.keys = []
    this.lvlScreen.showScreen()
  }

  update(deltaTime) {
    if (!this.gameOver && !this.paused) {
      this.gameTime += deltaTime
    }
    else {
      return
    }

    if (this.enemyTimer > this.enemyInterval) {
      let items = ['north', 'west', 'south', 'east']
      let directions = items[Math.floor(Math.random() * items.length)]
      let x = 0
      let y = 0
      if (directions === 'north') {
        y = 0
        x = Math.random() * this.width
      } else if (directions === 'west') {
        y = Math.random() * this.height
        x = 0
      } else if (directions === 'south') {
        y = this.height - this.tileSize
        x = Math.random() * this.width
      } else if (directions === 'east') {
        y = Math.random() * this.height
        x = this.width - this.tileSize
      }
      const nextEnemy = this.waveController.getNextEnemy(x, y)
      if (nextEnemy) {
        this.enemies.push(nextEnemy)
      }
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)

    this.drops.forEach((drop) => {
      if (this.checkCollision(this.player, drop)) {
        drop.markedForDeletion = true
        this.sound.playSound('pickup')
        if (this.player.lives < this.player.maxLives) {
          this.player.lives++
        }
      }
    })

    this.enemies.forEach((enemy) => {
      enemy.update(this.player, deltaTime)
      enemy.hurt(deltaTime)
      if (this.checkCollision(this.player, enemy)) {
        if (!this.player.isInvulnerable && enemy.lives > 0) {
          this.player.hurt()
          this.sound.playSound('hit')
          this.player.isHurt = true
        }

      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy) && enemy.type !== 'candy' && projectile.hasHit.indexOf(enemy) === -1 && !enemy.markedForDeletion) {
          enemy.isHurt = true
          enemy.lives -= projectile.damage
          this.sound.playSound('hit')
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true
            this.player.xp += enemy.xp
            this.score += enemy.score

            if (Math.random() > .95) {
              this.drops.push(new Candy(this, enemy.x, enemy.y))
            }
          }
          if (!projectile.penetrate) {
            projectile.markedForDeletion = true
          }
          else {
            projectile.hasHit.push(enemy)
          }
        }
      })
      if (enemy.projectiles) {
        enemy.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, this.player)) {
            projectile.markedForDeletion = true
            if (!this.player.isInvulnerable) {
              this.sound.playSound('hit')
              this.player.hurt()
              this.player.isHurt = true
            }
          }
        })
      }
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion || enemy.isHurt)
    this.drops = this.drops.filter((drop) => !drop.markedForDeletion)
  }

  draw(context) {
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'
    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.drops.forEach((drop) => {
      drop.draw(context)
    })
    // this.lvlScreen.draw(context)
    this.ui.draw(context)
    this.lvlScreen.draw(context)
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
