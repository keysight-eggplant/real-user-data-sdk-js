export default class ConversionCollector {

  checkout(goalType, goalValue, goalCurrency) {
    this.goalType = goalType;
    this.goalValue = goalValue;
    this.goalCurrency = goalCurrency;

    return this;
  }

  clear() {
    this.goalType = null;
    this.goalValue = null;
    this.goalCurrency = null;

    return this;
  }

  async prepare(event) {
    if (this.goalType) {
      event.goalType = this.goalType;
      event.goalValue = this.goalValue;
      event.goalCurrency = this.goalCurrency;
    }
    return event;
  }
}
