import Ghost from '../enemies/Ghost.js'
import Skeleton from '../enemies/Skeleton.js'
import Gargoyle from '../enemies/Gargoyle.js'
import Reaper from '../enemies/Reaper.js'

import EnemyList from './EnemyList.js'

export default class WaveController {
    constructor(game) {
        this.game = game
        this.intensityMultiplier = 1.05
        this.manpowerMultiplier = 1.15

        this.enemyManpower = 20
        this.enemyIds = []
        this.weightTable = []
        this.spawnIntervals = [100, 300, 200, 400, 500]
        this.spawnSchedule = ['standard', 'standard', 'horde', 'tank', 'boss', 'standard', 'tank', 'horde', 'tank', 'boss']
        this.wave = 0

        this.enemyList = new EnemyList(game)

        this.createWeightTable()
    }

    createWeightTable() {
        this.weightTable = []
        for (let index = 0; index < this.enemyList.list.length; index++) {
            let item = this.enemyList.list[index]
            for (let slot = 0; slot < item.weight; slot++) {
                this.weightTable.push(item.id)
            }
        }
        this.instantiateEnemies()
    }

    instantiateEnemies() {
        this.wave++
        this.game.enemyInterval = this.spawnIntervals[0]
        if (this.spawnSchedule[0] === 'boss') {
            this.enemyIds.push(3)
        }
        else {
            for (let index = 0; index < this.enemyManpower; index++) {
                this.enemyIds.push(this.weightTable[Math.floor(Math.random() * this.weightTable.length)])
            }
        }
    }

    getNextEnemy(x, y) {
        if (this.enemyIds.length < 1 && this.game.enemies.length < 1) {
            this.nextWave()
        }
        else {
            const enemyId = this.enemyIds.pop()
            return this.enemyList.getEnemyFromId(enemyId, x, y)
        }
    }

    nextWave() {
        this.enemyManpower = Math.ceil(this.enemyManpower * this.manpowerMultiplier)
        this.spawnIntervals.push(this.spawnIntervals.shift())
        this.spawnSchedule.push(this.spawnSchedule.shift())
        switch (this.spawnSchedule[0]) {
            case 'standard':
                this.enemyList.list = this.enemyList.standard
                break
            case 'horde':
                this.enemyList.list = this.enemyList.horde
                break
            case 'tank':
                this.enemyList.list = this.enemyList.tank
                break
            case 'boss':
                this.enemyList.list = this.enemyList.boss
                break
        }
        this.createWeightTable()
    }
}
