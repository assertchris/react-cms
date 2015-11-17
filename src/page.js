import React from "react";
import Component from "react-cms/component";
import PageEditor from "react-cms/page-editor";
import PageView from "react-cms/page-view";

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "isEditing": false
        };

        this.bind(
            "handlePageEdit",
            "handlePageDelete",
            "handlePageCancel"
        );
    }

    render() {
        if (this.state.isEditing) {
            return <PageEditor
                {...this.props}
                onPageCancel={this.handlePageCancel}
                />;
        }

        return <PageView
            {...this.props}
            onPageEdit={this.handlePageEdit}
            onPageDelete={this.handlePageDelete}
            />;
    }

    handlePageEdit() {
        this.setState({
            "isEditing": true
        });
    }

    handlePageDelete() {
        this.props.onPageDelete(this.props.id);
    }

    handlePageCancel() {
        this.setState({
            "isEditing": false
        });
    }
}

Page.propTypes = {
    "id": React.PropTypes.number.isRequired,
    "onPageDelete": React.PropTypes.func.isRequired
};

export default Page;
