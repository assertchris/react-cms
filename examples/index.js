import React from "react";
import ReactDOM from "react-dom";
import EventEmitter from "event-emitter";
import PageAdmin from "react-cms/page-admin";
import Page from "react-cms/page";
import PageEditor from "react-cms/page-editor";
import PageView from "react-cms/page-view";
import LocalStoreBackend from "react-cms/local-store-backend";

var backend = new LocalStoreBackend();

ReactDOM.render(
    <PageAdmin backend={backend} />,
    document.querySelector(".react")
);
