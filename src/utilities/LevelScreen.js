import WeaponTable from "./WeaponTable"

export default class LevelScreen {
  constructor(game) {
    this.game = game
    this.show = false
    this.options = document.querySelectorAll('.option')
    this.table = new WeaponTable(game)
    this.upgrades = ['health', 'stamina', 'recovery', 'strength']
    this.upgradesObjects = []
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
    this.setup()
  }

  setup() {
    for (let index = 0; index < this.upgrades.length; index++) {
      this.upgradesObjects.push({
        x: 50,
        y: 55 * index + (this.game.height / 3),
        width: this.game.width - 50 * 2,
        height: 50,
        skill: this.upgrades[index]
      })
    }
  }

  showScreen() {
    this.show = !this.show
  }

  draw(context) {
    if (this.show) {
      context.font = `${this.fontSize}px ${this.fontFamily}`
      context.fillStyle = 'white'
      context.textAlign = 'center'
      context.fillText('LEVEL UP', this.game.width / 2, (this.game.height / 3) - 20)

      context.fillStyle = 'gray'
      context.fillRect(40, (this.game.height / 3) - 10, this.game.width - 40 * 2, 55 * this.upgrades.length + 15)
      context.fillStyle = '#252525'
      for (let index = 0; index < this.upgrades.length; index++) {
        context.fillStyle = '#252525'
        context.fillRect(this.upgradesObjects[index].x, this.upgradesObjects[index].y, this.upgradesObjects[index].width, this.upgradesObjects[index].height)
        context.fillStyle = 'white'
        context.textAlign = 'left'
        context.fillText(this.upgrades[index].toUpperCase(), 60, 55 * index + (this.game.height / 3) + 33)
      }
    }
  }
}
