import React from "react";
import Component from "react-cms/component";

class PageListItem extends Component {
    constructor(props) {
        super(props);
    }

    isChanged(next, previous) {
        return JSON.stringify(next) !== JSON.stringify(previous)
    }

    shouldComponentUpdate(props, state) {
        return this.isChanged(props, this.props);
    }

    render() {
        return <div>
            {this.props.title}
            &nbsp;
            <button onClick={this.props.onPageEdit}>edit</button>
            &nbsp;
            <button onClick={this.props.onPageDelete}>delete</button>
        </div>;
    }
}

PageListItem.propTypes = {
    // "myProperty": React.PropTypes.string
    // "myShape": React.PropTypes.shape({})
};

export default PageListItem;
