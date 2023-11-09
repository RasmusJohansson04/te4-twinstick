import WeaponTable from "./WeaponTable"

export default class LevelScreen {
  constructor(game) {
    this.game = game
    this.show = false
    this.options = document.querySelectorAll('.option')
    this.table = new WeaponTable(game)
    this.upgrades = this.table.upgrades
    this.options.forEach(option => {
      option.addEventListener("click", (event) => {
        this.upgrades[option.id].level += 1
        document.querySelector('#lvl').classList.toggle('hidden')
        game.paused = false
      })
    })
  }

  showScreen() {
    let usedIndexes = []
    document.querySelector('#lvl').classList.toggle('hidden')
    this.options.forEach(option => {
      let index = Math.floor((Math.random() * this.upgrades.length))
      while (usedIndexes.indexOf(index) !== -1) {
        index = Math.floor((Math.random() * this.upgrades.length))
      }
      option.id = index
      usedIndexes.push(index)
      option.innerHTML = `
        <h1>${this.upgrades[index].name}</h1>
        <h2>LEVEL ${this.upgrades[index].level}</h2>
        <p>Description</p>
      `
    })
  }

  // draw(context) {
  // if (this.show) {
  //   context.fillStyle = 'gray'
  //   context.fillRect(50, 50, this.game.width - 50 * 2, this.game.height - 50 * 2)
  // }
  // }  game.player.lives, game.player.maxAmmo, game.player.maxSpeed, game.player.ammoInterval exsanguination
}
