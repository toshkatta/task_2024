const createMiddleware = (handlers) => (store) => (next) => (action) => {
  if (Object.keys(handlers).includes(action.type)) {
    return handlers[action.type](store, next, action);
  }

  next(action);
};

export default createMiddleware;
