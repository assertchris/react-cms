import React from "react";
import Component from "react-cms/component";

class PageEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "changed": false
        };

        this.bind("handlePageChange");
    }

    isChanged(next, previous) {
        return JSON.stringify(next) !== JSON.stringify(previous)
    }

    componentWillReceiveProps(props) {
        this.setState({
            "changed": this.isChanged(props, this.props)
        });
    }

    render() {
        return <div>
            {this.state.changed ? "*" : ""}
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
                    name="body"
                    value={this.props.body}
                    />
            </div>
            <button
                onClick={this.props.onPageCancel}
                >cancel</button>
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
