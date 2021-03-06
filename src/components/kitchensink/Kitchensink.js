import React from "react";
import {Widget} from "../../shared/components";
import DropDownExample from "./DropDownExample";
import ButtonExample from "./ButtonExample";
import ExpandableSectionExample from "./ExpandableSectionExample";
import TwoWayDatabingExample from "./TwoWayDatabindingExample";
import ListExample from "./ListExample";
import BackendApi from "./BackendApi";
import ErrorSection from "./ErrorSection";
import {withAllServices} from "../../shared/services";
import {EventListener} from "../../shared/services/eventbus";
import {APPEARANCE} from "../../shared/components/constants";

const BUTTON_EVENT = 'button.test';

class Kitchensink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.listener = new EventListener(BUTTON_EVENT, () => console.log("Button send custom event."));
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        console.log("Register my kitchen listener");
        this.props.eventBus.subscribe(this.listener);
    }
    componentWillUnmount() {
        console.log("DeRegister my kitchen listener");
        this.props.eventBus.unsubscribe(this.listener);
    }

    handleShow = () => {
        this.setState({ show: true });
        this.props.eventBus.fire("button");
        console.log(this.state.show);
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
            <Widget.Modal title={ this.props.t('app.kitchensink.modal.title') }
                          closeFunction={ this.handleClose }
                          appearance={ APPEARANCE.DARK }
                          message={ this.props.t('app.kitchensink.modal.message')}
                          show={ this.state.show }/>
        </div>
    }
}

export default withAllServices(Kitchensink);