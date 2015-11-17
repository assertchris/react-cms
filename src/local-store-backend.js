import LocalStore from "react-cms/local-store";
import EventEmitter from "event-emitter";

class LocalStoreBackend extends EventEmitter {
    constructor() {
        super();

        var pages = LocalStore.get("pages", []);

        this.id = 1;

        this.pages = pages.map((page) => {
            page.id = this.id++;
            return page;
        });
    }

    all() {
        return this.pages;
    }

    update(id, property, value) {
        this.pages = this.pages.map((page) => {
            if (page.id == id) {
                page[property] = value;
            }

            return page;
        });

        LocalStore.set("pages", this.pages);

        this.emit("update", this.pages);
    }

    delete(id) {
        this.pages = this.pages.filter(
            (page) => page.id !== id
        );

        LocalStore.set("pages", this.pages);

        this.emit("update", this.pages);
    }

    create() {
        this.pages.push({
            "id": this.id++,
            "title": "New page",
            "body": ""
        });

        LocalStore.set("pages", this.pages);

        this.emit("update", this.pages);
    }
}

export default LocalStoreBackend;
