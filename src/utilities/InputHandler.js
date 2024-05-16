import Sound from "../Sound"

export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0
    this.sound = new Sound(game)
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

        if (event.key === '5') {
          this.weaponType = 'exsanguinate'
        }

        if (event.key === 'p') {
          this.game.debug = !this.game.debug
        }
      }

      if (event.key === 'e') {
        this.game.levelUp()
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
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', (event) => {
      if (!this.game.paused && this.game.player.stamina > 0) {
        this.game.sound.playSound('shoot')
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
      const mouse = {
        x: this.mouseX,
        y: this.mouseY,
        width: 1,
        height: 1
      }
      const lvl = this.game.lvlScreen
      if (lvl.show) {
        for (let index = 0; index < lvl.upgrades.length; index++) {
          console.log(mouse)
          console.log(lvl.upgradesObjects[index])
          const player = this.game.player
          if (this.game.checkCollision(mouse, lvl.upgradesObjects[index]) && player.levelPoints > 0) {
            player.levelPoints -= 1
            switch (lvl.upgradesObjects[index].skill) {
              case 'health':
                player.lives += 1
                player.maxLives += 1
                break
              case 'stamina':
                player.stamina += 10
                player.maxStamina += 10
                break
              case 'recovery':
                player.staminaInterval -= 10
                break
              case 'strength':
                player.baseDmg += .5
                break
            }
            this.sound.playSound('pickup')
            if(player.levelPoints <= 0) {
              this.game.levelUp()
            }
          }
        }
      }
    })
  }
}
