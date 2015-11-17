import React from "react";
import Component from "react-cms/component";

class PageView extends Component {
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

PageView.propTypes = {
    "title": React.PropTypes.string.isRequired,
    "onPageEdit": React.PropTypes.func.isRequired,
    "onPageDelete": React.PropTypes.func.isRequired
};

export default PageView;
