class Api {
  static get(url, successCallback, errorCallback = null) {
    this.makeRequest(url, {
      headers: {'Accept': 'application/json'},
      method: 'GET',
    }, successCallback, errorCallback);
  }

  static post(url, body, successCallback, errorCallback = null) {
    this.makeRequest(url, {
      headers: {'Accept': 'application/json'},
      method: 'POST',
      body: JSON.stringify(body),
    }, successCallback, errorCallback);
  }

  static makeRequest(url, options, successCallback, errorCallback) {
    if (url[0] != '/') url = `/${url}`;
    fetch(`${this.backendHost()}${url}`, options)
    .then((response) => response.json())
    .then((values) => successCallback(values))
    .catch((error) => {
      console.error("error during fetch", error);
      if (errorCallback) errorCallback(error);
    });
  }

  static addChangeHandler(handlerName, handlerFunction) {
    this.lazyInit();
    this.changeHandlers[handlerName] = handlerFunction;
  }

  static removeChangeHandler(handlerNameToRemove) {
    this.lazyInit();
    let newChangeHandlers = {};
    for (const [handlerName, handlerFunction] of this.changeHandlers) {
      if (handlerName != handlerNameToRemove) {
        newChangeHandlers[handlerName] = handlerFunction;
      }
    }
    this.changeHandlers = newChangeHandlers;
  }

  static signalChange(handlerName) {
    this.lazyInit();
    const handlerFunction = this.changeHandlers[handlerName];
    if (handlerFunction) handlerFunction();
  }

  static lazyInit() {
    this.changeHandlers = this.changeHandlers || {};
  }

  static backendHost() {
    return 'http://localhost:6543';
  }
}

export default Api;