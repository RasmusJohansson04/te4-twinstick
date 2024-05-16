import shoot from './assets/sounds/shoot.wav'
import death from './assets/sounds/death.wav'
import explosion from './assets/sounds/explosion.wav'
import explosion2 from './assets/sounds/explosion2.wav'
import hit from './assets/sounds/hit.wav'
import pickup from './assets/sounds/pickup.wav'

export default class Sound {
  constructor(game) {
    this.game = game
    const a = new Audio()
    a.src = shoot
    this.soundToPlay = a
  }

  playSound(sound) {
    const a = new Audio()
    switch(sound) {
        case 'shoot':
            a.src = shoot
            break
        case 'death':
            a.src = death
            break
        case 'explosion':
            a.src = explosion
            break
        case 'explosion2':
            a.src = explosion2
            break
        case 'hit':
            a.src = hit
            break
        case 'pickup':
            a.src = pickup
            break
        default:
            a.src = shoot
            break
    }
    this.soundToPlay = a
    this.soundToPlay.currentTime = 0
    this.soundToPlay.play()
  }
}