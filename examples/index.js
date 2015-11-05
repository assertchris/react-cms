import React from "react";
import ReactDOM from "react-dom";

import PageAdmin from "react-cms/page-admin";
import Page from "react-cms/page";
import PageEditor from "react-cms/page-editor";
import PageView from "react-cms/page-view";

import EventEmitter from "event-emitter";

class Backend extends EventEmitter {
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

        this.deleted = [];
        this.updates = [];

        //this.pages = [
        //    {
        //        "id": 1,
        //        "title": "Home",
        //        "body": "..."
        //    },
        //    {
        //        "id": 2,
        //        "title": "About Us",
        //        "body": "..."
        //    },
        //    {
        //        "id": 3,
        //        "title": "Contact Us",
        //        "body": "..."
        //    },
        //    {
        //        "id": 4,
        //        "title": "Products",
        //        "body": "..."
        //    }
        //];
    }

    //filter(page) {
    //    return this.deleted.indexOf(page.id) == -1
    //}

    //mapper(page) {
    //    var modified = page;
    //
    //    this.updates.forEach((update) => {
    //        if (update[0] == page.id) {
    //            modified[update[1]] = update[2];
    //        }
    //    });
    //
    //    return modified;
    //}

    all() {
        //return this.pages
        //    .filter(this.filter.bind(this))
        //    .map(this.mapper.bind(this));

        this.socket.send(
            JSON.stringify({
                "method": "all"
            })
        );
    }

    update(id, property, value) {
        //this.updates.push([id, property, value]);

        this.socket.send(
            JSON.stringify({
                "method": "update",
                "data": [id, property, value]
            })
        );
    }

    delete(id) {
        //this.deleted.push(id);

        this.socket.send(
            JSON.stringify({
                "method": "delete",
                "data": [id]
            })
        );
    }
}

let backend = new Backend(
    new WebSocket("ws://127.0.0.1:8000/ws")
);

ReactDOM.render(
    <PageAdmin backend={backend} />,
    document.querySelector(".react")
);
