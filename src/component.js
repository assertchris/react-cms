import React from "react";

class Component extends React.Component {
    bind(...methods) {
        methods.map(
            method => this[method] = this[method].bind(this)
        )
    }
}

export default Component;
