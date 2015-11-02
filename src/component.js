import React from "react";

class Component extends React.Component {
    constructor(props) {
        super(props);
    }

    bind(...methods) {
        methods.map(
            method => this[method] = this[method].bind(this)
        )
    }
}

export default Component;
