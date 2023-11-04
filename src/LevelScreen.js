export default class LevelScreen {
  constructor(game) {
    this.game = game
    this.show = false
    this.options = document.querySelectorAll('.option')
    this.upgrades = [
      {
        name: "Lives",
        desc: "Increases the players lives.",
        link: game.player.lives
      },
      {
        name: "Expanded quiver",
        desc: "Increases the players max amount of lives",
        link: game.player.maxAmmo
      },
      {
        name: "Boots of Phidippides",
        desc: "Increases the players speed",
        link: game.player.maxAmmo
      },
      {
        name: "Sleight of Hand",
        desc: "Increases firerate of weapons",
        link: game.player.maxAmmo
      },
      {
        name: "Bow of Apollo",
        desc: "Increases the players max amount of lives",
        link: game.player.maxAmmo
      },
      {
        name: "Expanded quiver",
        desc: "Increases the players max amount of lives",
        link: game.player.maxAmmo
      },
    ]
    this.options.forEach(option => {
      option.addEventListener("click", (event) => {
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
        <h1>${index}</h1>
        <h2>To Level</h2>
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
