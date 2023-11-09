export default class WeaponTable {
    constructor(game) {
        this.game = game
        this.upgrades = [
            {
                name: "Arrow",
                damage: 1,
                fireRate: 1,
                level: 1,
                upgradeAmount: 1,
                upgradePath: []
            },
            {
                name: "Dagger",
                damage: 1,
                level: 1,
                upgradeAmount: 1
            },
            {
                name: "Spear",
                damage: 1,
                level: 1,
                upgradeAmount: 1
            },
            {
                name: "Sword",
                damage: 3,
                level: 1,
                upgradeAmount: 1
            },
            {
                name: "Exsanguinate",
                damage: 4,
                level: 1,
                upgradeAmount: 1
            },
            {
                name: "Health",
                damage: 4,
                level: 1,
                upgradeAmount: 1
            },
            {
                name: "Stamina",
                damage: 4,
                level: 1,
                upgradeAmount: 1
            },
        ]
    }
}
