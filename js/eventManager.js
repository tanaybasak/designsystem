const _eventHandlers = {};

export const addListener = (node, event, handler, capture) => {
  if (!(node in _eventHandlers)) {
    _eventHandlers[node] = {};
  }
  if (!(event in _eventHandlers[node])) {
    _eventHandlers[node][event] = [];
  }
  _eventHandlers[node][event].push([handler, capture]);
  document.addEventListener(event, handler, capture);
};

export const removeListeners = (node, event) => {
  if (node in _eventHandlers) {
    const handlers = _eventHandlers[node];
    if (event in handlers) {
      const eventHandlers = handlers[event];
      for (let i = eventHandlers.length; i--; ) {
        const handler = eventHandlers[i];
        document.removeEventListener(event, handler[0], handler[1]);
      }
    }
  }
};
