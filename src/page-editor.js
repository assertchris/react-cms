import React from "react";
import Component from "react-cms/component";

class PageEditor extends Component {
    constructor(props) {
        super(props);

        this.bind("handlePageChange");
    }

    render() {
        return <div>
            <div>
            <input
                type="text"
                onChange={this.handlePageChange}
                name="title"
                value={this.props.title}
                />
            </div>
            <div>
            <input
                type="text"
                onChange={this.handlePageChange}
                name="segment"
                value={this.props.segment}
                />
            </div>
            <a
                href="#"
                onClick={this.props.onPageCancel}
                >cancel</a>
        </div>;
    }

    handlePageChange(event) {
        this.props.onPageUpdate(
            this.props.id,
            event.target.name,
            event.target.value
        );
    }
}

PageEditor.propTypes = {
    // "myProperty": React.PropTypes.string
    // "myShape": React.PropTypes.shape({})
};

export default PageEditor;
