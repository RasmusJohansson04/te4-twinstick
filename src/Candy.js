import Enemy from './enemies/Enemy'

export default class Candy extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 16
    this.height = 16
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.type = 'candy'
  }
}
