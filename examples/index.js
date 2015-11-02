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
    }

    all() {
        return [
            {
                "id": 1,
                "title": "Home",
                "segment": "home",
                "body": "This is the home page"
            },
            {
                "id": 2,
                "title": "About Us",
                "segment": "about-us",
                "body": "This is the about us page"
            },
            {
                "id": 3,
                "title": "Contact Us",
                "segment": "contact-us",
                "body": "This is the contact us page"
            },
            {
                "id": 4,
                "title": "Products",
                "segment": "products",
                "body": "This is the products page"
            },
            {
                "id": 5,
                "title": "Burning Baskets",
                "segment": "burning-baskets",
                "body": "This is a page dedicated to burning baskets"
            }
        ]
            .filter((page) => this.deleted.indexOf(page.id) == -1)
            .map((page) => {
                var modified = page;

                this.updates.forEach((update) => {
                    if (update[0] == page.id) {
                        modified[update[1]] = update[2];
                    }
                });

                return modified;
            });
    }

    delete(id) {
        this.deleted.push(id);
    }

    update(id, field, value) {
        this.updates.push([id, field, value]);
    }
}

let backend = new Backend();

ReactDOM.render(
    <PageAdmin backend={backend} />,
    document.querySelector(".react")
);
