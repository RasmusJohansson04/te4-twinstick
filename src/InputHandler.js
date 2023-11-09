export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0
    this.weaponType = 'arrow'
    this.play = document.querySelector('#play')
    this.tutorial = document.querySelector('#tutorial')
    window.addEventListener('keydown', (event) => {

      if (!this.game.paused) {
        if (
          (event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight' ||
            event.key === 'w' ||
            event.key === 'a' ||
            event.key === 's' ||
            event.key === 'd') &&
          this.game.keys.indexOf(event.key) === -1
        ) {
          this.game.keys.push(event.key)
        }

        if (event.key === ' ') {
          this.game.player.dodge()
        }

        if (event.key === '1') {
          this.weaponType = 'arrow'
        }

        if (event.key === '2') {
          this.weaponType = 'dagger'
        }

        if (event.key === '3') {
          this.weaponType = 'spear'
        }

        if (event.key === '4') {
          this.weaponType = 'sword'
        }

        if (event.key === '5') {
          this.weaponType = 'exsanguinate'
        }

        if (event.key === 'p') {
          this.game.debug = !this.game.debug
        }
      }

      if (event.key === 'Escape') {
        this.game.paused = !this.game.paused
      }
    })

    this.play.addEventListener("click", (event) => {
      document.querySelector('#tutorial').classList.toggle('hidden')
      this.game.paused = false
    })

    window.addEventListener('keyup', (event) => {

      if (!this.game.paused) {
        if (this.game.keys.indexOf(event.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
        }
      }
    })

    window.addEventListener('mousemove', (event) => {
      if (!this.game.paused) {
        this.mouseX = event.clientX - this.game.canvasPosition.left
        this.mouseY = event.clientY - this.game.canvasPosition.top
      }
    })

    window.addEventListener('mousedown', (event) => {
      if (!this.game.paused && this.game.player.stamina > 0) {
        switch (this.weaponType) {
          case 'arrow':
            this.game.player.arrow(this.mouseX, this.mouseY)
            break;
          case 'dagger':
            this.game.player.dagger(this.mouseX, this.mouseY)
            break;
          case 'spear':
            this.game.player.spear(this.mouseX, this.mouseY)
            break;
          case 'sword':
            this.game.player.sword(this.mouseX, this.mouseY)
            break;
          case 'exsanguinate':
            this.game.player.exsanguinate(this.mouseX, this.mouseY)
            break;
        }
      }
    })
  }
}
