function errorHandler(error: any, name: string, from: string) {
  let loggerFunction = console.log;

  loggerFunction("----------START----------");
  loggerFunction("Error occured in ", name);

  if (from === "axios") {
    if (error.response) {
      loggerFunction(error.response.data);
      loggerFunction(error.response.status);
      loggerFunction(error.response.handlers);
    } else if (error.request) {
      loggerFunction(error.request);
    } else {
      loggerFunction("[ERROR]", error.message);
    }
    loggerFunction(error.toJSON());
  }

  loggerFunction("----------START----------");
}

module.exports = {
  errorHandler,
};
