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
            "pages": []
        };

        this.props.backend.on("open", (event) => {
            this.props.backend.all();
        });

        this.props.backend.on("data", (event, data) => {
            console.log(event.data);

            this.setState({
                "pages": data
            });
        });
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
    }

    handlePageDelete(id) {
        this.props.backend.delete(id);
    }
}

PageAdmin.propTypes = {
    // "myProperty": React.PropTypes.string
    // "myShape": React.PropTypes.shape({})
};

export default PageAdmin;
