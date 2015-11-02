import React from "react";
import Component from "react-cms/component";
import PageEditor from "react-cms/page-editor";
import PageListItem from "react-cms/page-list-item";

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

        return <PageListItem
            {...this.props}
            onPageEdit={this.handlePageEdit}
            onPageDelete={this.handlePageDelete}
            />;
    }

    handlePageEdit() {
        this.setState({
            "isEditing": true
        });

        console.log("time to edit a page");
    }

    handlePageDelete() {
        console.log("time to delete a page", this.props.id);

        this.props.onPageDelete(this.props.id);
    }

    handlePageCancel() {
        this.setState({
            "isEditing": false
        });

        console.log("time to cancel a page edit");
    }
}

Page.propTypes = {
    // "myProperty": React.PropTypes.string
    // "myShape": React.PropTypes.shape({})
};

export default Page;
