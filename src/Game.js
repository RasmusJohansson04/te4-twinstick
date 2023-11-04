import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Skeleton from './Skeleton.js'
import Gargoyle from './Gargoyle.js'
import Reaper from './Reaper.js'
import Candy from './Candy.js'
import Background from './Background.js'
import LevelScreen from './LevelScreen.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []

    this.gameOver = false
    this.paused = false

    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 500
    this.hasWave = true
    this.waveTimer = 0
    this.waveInterval = 1000
    this.tileSize = 16

    this.background = new Background(this)
    this.player = new Player(this)
    this.lvlScreen = new LevelScreen(this)
  }

  levelUp() {
    this.paused = true
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

    //* SPAWN ENEMIES
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
      if (Math.random() < .05) {
        this.enemies.push(new Reaper(this, x, y))
      }
      else if (Math.random() < .1) {
        this.enemies.push(new Gargoyle(this, x, y))
      }
      else if (Math.random() < 0.2) {
        this.enemies.push(new Skeleton(this, x, y))
      } else {
        this.enemies.push(new Pumpkin(this, x, y))
      }
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)

    this.enemies.forEach((enemy) => {
      enemy.update(this.player, deltaTime)
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        if (enemy.type === 'candy') {
          this.player.lives++
        }
        else {
          this.player.lives--
          this.player.isHit = true
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy) && enemy.type !== 'candy' && projectile.hasHit.indexOf(enemy) === -1) {
          enemy.lives -= projectile.damage
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true
            this.player.xp += 10
            if (Math.random() > .8) {
              this.enemies.push(new Candy(this, enemy.x, enemy.y))
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
            this.player.lives--
            this.player.isHit = true
          }
        })
      }
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    // this.lvlScreen.draw(context)
    this.ui.draw(context)
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
