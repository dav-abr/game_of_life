class Debugger {
  constructor(context) {
    this._execs = {};
    this._context = context;
  }

  registerDebugFor(method) {
    this._execs[method] = [];
    this._context[method] = this._wrapFunction(this._context[method], method);
  }

  startDebug(method) {
    this._execs[method] = [];
  }

  stopDebug(method) {
    const res = this._execs[method].reduce((a, v) => a + v, 0);
    this._execs[method] = [];
    return res;
  }

  _wrapFunction(func, name) {
    func = func.bind(this._context);
    return (...args) => {
      const t1 = performance.now();
      const call = func(...args);
      const t2 = performance.now();

      if (this._execs[name]) {
        this._execs[name].push(t2 - t1);
      }

      return call;
    }
  }
}
