class MapugkaCharacter {
  constructor() {
    this.charmLevel = 1;
    this.stakedTokens = 0;
    this.accessories = [];
  }

  // Додати токени до стейкінгу
  stakeTokens(amount) {
    this.stakedTokens += amount;
    this.calculateCharm();
    return this.stakedTokens;
  }

  // Розрахувати рівень шарму на основі стейкінгу
  calculateCharm() {
    this.charmLevel = Math.floor(Math.sqrt(this.stakedTokens / 100)) + 1;
    return this.charmLevel;
  }

  // Додати аксесуар до колекції
  addAccessory(accessory) {
    this.accessories.push(accessory);
  }

  // Отримати поточний стан персонажа
  getState() {
    return {
      charmLevel: this.charmLevel,
      stakedTokens: this.stakedTokens,
      accessories: this.accessories
    };
  }
}

module.exports = MapugkaCharacter;
