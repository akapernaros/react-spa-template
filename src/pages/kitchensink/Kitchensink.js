import React from "react";
import {Widget} from "../../shared/components";
import DropDownExample from "./DropDownExample";
import {withTranslation} from "react-i18next";
import ButtonExample from "./ButtonExample";
import ExpandableSectionExample from "./ExpandableSectionExample";
import TwoWayDatabingExample from "./TwoWayDatabingExample";
import ListExample from "./ListExample";
import BackendApi from "./BackendApi";
import ErrorSection from "./ErrorSection";

class Kitchensink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    render() {
        return <div>
            <h1> { this.props.t('app.kitchensink.title') } </h1>
            <ButtonExample handler={ this.handleShow }/>
            <DropDownExample/>
            <ErrorSection/>
            <ExpandableSectionExample handler={ this.handleShow }/>
            <TwoWayDatabingExample/>
            <ListExample handler={ this.handleShow }/>
            <BackendApi/>
            <Widget.Modal title={ this.props.t('app.kitchensink.modal.title') } closeFunction={ this.handleClose } message={ this.props.t('app.kitchensink.modal.message')} show={ this.state.show }/>
        </div>
    }
}

export default withTranslation()(Kitchensink);