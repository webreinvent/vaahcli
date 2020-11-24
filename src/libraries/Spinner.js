class Spinner {

  constructor(tasks, options) {
    this._tasks = tasks;
    this._options = Object.assign({}, options);
  }

  static get nonTTY() {
    return true;
  }

  render() {
    console.log('--->');
    for (const task of this._tasks) {
      task.subscribe(event => {
        if (event.type === 'STATE' && task.isPending()) {
          console.log(`${task.title} [started]`);
        }
      });
    }
  }

  end(err) { }
}

module.exports = Spinner;
