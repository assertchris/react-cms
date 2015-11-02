import React from "react";
import Component from "react-cms/component";
import Page from "react-cms/page";

class PageAdmin extends Component {
    constructor(props) {
        super(props);

        this.bind(
            "handlePageInsert",
            "handlePageUpdate",
            "handlePageDelete"
        );

        this.state = {
            "pages": this.props.backend.all()
        };
    }

    render() {
        return <ol>
            {this.state.pages.map((page, i) => {
                return <li key={i}>
                    <Page
                        {...page}
                        onPageInsert={this.handlePageInsert}
                        onPageUpdate={this.handlePageUpdate}
                        onPageDelete={this.handlePageDelete}
                        />
                </li>;
            })}
        </ol>;
    }

    handlePageInsert() {
        console.log("time to insert a page");
    }

    handlePageUpdate(id, field, value) {
        this.props.backend.update(id, field, value);

        this.setState({
            "pages": this.props.backend.all()
        });
    }

    handlePageDelete(id) {
        this.props.backend.delete(id);

        this.setState({
            "pages": this.props.backend.all()
        });
    }
}

PageAdmin.propTypes = {
    // "myProperty": React.PropTypes.string
    // "myShape": React.PropTypes.shape({})
};

export default PageAdmin;
