export default class CheckoutCollector {

  checkout(goalType, goalValue, goalCurrency) {
    this.goalType = goalType;
    this.goalValue = goalValue;
    this.goalCurrency = goalCurrency;
  }

  clear() {
    this.goalType = null;
    this.goalValue = null;
    this.goalCurrency = null;
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