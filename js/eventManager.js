// To handle Window Events
const EventManager = {
    functionList: {},
    addEvent(eventName, fn, status) {
        if (this.functionList[eventName]) {
            this.functionList[eventName]();
        }
        this.functionList[eventName] = fn;
        document.addEventListener(eventName, this.functionList[eventName], status);
    },
    removeEvent(eventName, status) {
        document.removeEventListener(eventName, this.functionList[eventName], status);
        delete this.functionList[eventName]
    }
}
export default EventManager;