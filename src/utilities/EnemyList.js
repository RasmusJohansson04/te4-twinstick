import Ghost from '../enemies/Ghost.js'
import Skeleton from '../enemies/Skeleton.js'
import Gargoyle from '../enemies/Gargoyle.js'
import Reaper from '../enemies/Reaper.js'

export default class EnemyList {
    constructor(game) {
        this.game = game
        this.list = [
            {
                'id': 0,
                'weight': 20,
            },
            {
                'id': 1,
                'weight': 5,
            },
            {
                'id': 2,
                'weight': 1,
            },
        ]
        this.standard = [
            {
                'id': 0,
                'weight': 20,
            },
            {
                'id': 1,
                'weight': 5,
            },
            {
                'id': 2,
                'weight': 1,
            },
        ]
        this.horde = [
            {
                'id': 0,
                'weight': 20,
            },
            {
                'id': 1,
                'weight': 3,
            },
            {
                'id': 2,
                'weight': 0,
            },
        ]
        this.tank = [
            {
                'id': 0,
                'weight': 15,
            },
            {
                'id': 1,
                'weight': 5,
            },
            {
                'id': 2,
                'weight': 10,
            },
        ]
        this.boss = [
            {
                'id': 0,
                'weight': 0,
            },
            {
                'id': 1,
                'weight': 0,
            },
            {
                'id': 2,
                'weight': 0,
            },
        ]
    }

    getEnemyFromId(id, x, y) {
        switch (id) {
            case 0:
                return new Ghost(this.game, x, y)
            case 1:
                return new Skeleton(this.game, x, y)
            case 2:
                return new Gargoyle(this.game, x, y)
            case 3:
                return new Reaper(this.game, x, y)
        }
    }
}
