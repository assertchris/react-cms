import React from "react";
import ReactDOM from "react-dom";

import PageAdmin from "react-cms/page-admin";
import Page from "react-cms/page";
import PageEditor from "react-cms/page-editor";
import PageListItem from "react-cms/page-list-item";

class Backend {
    constructor() {
        this.deleted = [];
        this.updates = [];

        this.pages = [
            {
                "id": 1,
                "title": "Home",
                "body": "..."
            },
            {
                "id": 2,
                "title": "About Us",
                "body": "..."
            },
            {
                "id": 3,
                "title": "Contact Us",
                "body": "..."
            },
            {
                "id": 4,
                "title": "Products",
                "body": "..."
            }
        ];
    }

    filter(page) {
        return this.deleted.indexOf(page.id) == -1
    }

    mapper(page) {
        var modified = page;

        this.updates.forEach((update) => {
            if (update[0] == page.id) {
                modified[update[1]] = update[2];
            }
        });

        return modified;
    }

    all() {
        return this.pages
            .filter(this.filter.bind(this))
            .map(this.mapper.bind(this));
    }

    update(id, property, value) {
        this.updates.push([id, property, value]);
    }

    delete(id) {
        this.deleted.push(id);
    }
}

let backend = new Backend();

ReactDOM.render(
    <PageAdmin backend={backend} />,
    document.querySelector(".react")
);
