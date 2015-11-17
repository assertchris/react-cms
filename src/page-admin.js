import React from "react";
import Component from "react-cms/component";
import Page from "react-cms/page";
import LocalStoreBackend from "react-cms/local-store-backend";

class PageAdmin extends Component {
    constructor(props) {
        super(props);

        this.bind(
            "handlePageCreate",
            "handlePageUpdate",
            "handlePageDelete"
        );

        this.state = {
            "pages": this.props.backend.all()
        };

        this.props.backend.on("update",
            (pages) => this.setState({pages})
        );
    }

    render() {

        return (
            <React.addons.CSSTransitionGroup transitionName="page-admin" transitionAppear={true} transitionAppearTimeout={250}>
                <div>
                    <button onClick={this.handlePageCreate}>create new page</button>
                </div>
                <ol>
                    <React.addons.CSSTransitionGroup transitionName="page" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
                        {this.state.pages.map((page, i) => {
                            return <li key={i}>
                                <Page
                                    {...page}
                                    onPageUpdate={this.handlePageUpdate}
                                    onPageDelete={this.handlePageDelete}
                                    />
                            </li>;
                        })}
                    </React.addons.CSSTransitionGroup>
                </ol>
            </React.addons.CSSTransitionGroup>
        );
    }

    handlePageCreate() {
        this.props.backend.create();
    }

    handlePageUpdate(id, field, value) {
        this.props.backend.update(id, field, value);
    }

    handlePageDelete(id) {
        this.props.backend.delete(id);
    }
}

PageAdmin.propTypes = {
    "backend": function(props, propName, componentName) {
        if (props.backend instanceof LocalStoreBackend) {
            return;
        }

        return new Error(
            "Required prop `backend` is not a `Backend`."
        );
    }
};

export default PageAdmin;
