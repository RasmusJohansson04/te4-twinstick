export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0
    this.weaponType = 0
    this.isPaused = false
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

        if (event.key === '1') {
          this.weaponType = 0
        }

        if (event.key === '2') {
          this.weaponType = 1
        }

        if (event.key === '3') {
          this.weaponType = 2
        }

        if (event.key === 'p') {
          this.game.debug = !this.game.debug
        }
      }
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
      if (!this.game.paused) {
        this.game.player.shoot(this.mouseX, this.mouseY, this.weaponType)
      }
    })
  }
}
