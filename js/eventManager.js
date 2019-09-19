var _eventHandlers = {};

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
        var handlers = _eventHandlers[node];
        if (event in handlers) {
            var eventHandlers = handlers[event];
            for (var i = eventHandlers.length; i--;) {
                var handler = eventHandlers[i];
                document.removeEventListener(event, handler[0], handler[1]);
            }
        }
    }
};
