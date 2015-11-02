import React from "react";
import Component from "react-cms/component";

class PageListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            {this.props.title}
            <a href="#" onClick={this.props.onPageEdit}>edit</a>
            <a href="#" onClick={this.props.onPageDelete}>delete</a>
        </div>;
    }
}

PageListItem.propTypes = {
    // "myProperty": React.PropTypes.string
    // "myShape": React.PropTypes.shape({})
};

export default PageListItem;
