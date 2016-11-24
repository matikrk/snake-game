const listeners = [];
const eventManager = {
    fireEvent: function (eventName, data) {
        listeners.forEach(listener => listener.event === eventName ? listener.func(data) : null);
    },
    eventListener: function (eventName, callback) {
        listeners.push({event: eventName, func: callback});
    },
};

module.exports = eventManager;