import LocalStore from "react-cms/local-store";
import EventEmitter from "event-emitter";

class WebSocketBackend extends EventEmitter {
    constructor(socket) {
        super();

        this.socket = socket;

        this.socket.addEventListener("open", (event) => {
            this.emit("open", event);
        });

        this.socket.addEventListener("message", (event) => {
            var json = JSON.parse(event.data);

            if (json && json.method) {
                if (json.method == "data" && json.data) {
                    this.emit("data", event, json.data);
                }
            }
        });
    }

    all() {
        this.socket.send(
            JSON.stringify({
                "method": "all"
            })
        );
    }

    update(id, property, value) {
        this.socket.send(
            JSON.stringify({
                "method": "update",
                "data": [id, property, value]
            })
        );
    }

    delete(id) {
        this.socket.send(
            JSON.stringify({
                "method": "delete",
                "data": [id]
            })
        );
    }

    create() {
        throw new Error("create() not implemented");
    }
}

export default WebSocketBackend;
