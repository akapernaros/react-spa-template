import React from 'react';
import { MessageHandler, EventBus } from "../shared/services/eventbus";
import {SEVERITY} from "../shared/core/errors";
import {WModal} from "../shared/components/wdg.modal";

const ALERT = {
    1: 'alert-danger',
    2: 'alert-danger',
    3: 'alert-warning',
    4: 'alert-info'
}

class DisplayMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            showMessage: false,
            showFatal:false
        }

        this.resetState = this.resetState.bind(this);

        this.logHandler = new MessageHandler((message) => {
            console.log(`Internal message log [${message.code}:${message.severity}], ${message.message}`);
        })

        this.handler = new MessageHandler((message) => {
           this.setState({
               message: message,
               showMessage: true
           });
        }, SEVERITY.WARNING, SEVERITY.INFO, SEVERITY.ERROR);

        this.fatalHandler = new MessageHandler((message) => {
            this.setState({
                message: message,
                showFatal: true
            });
        }, SEVERITY.FATAL);

    }

    componentDidMount() {
        this.props.eventBus.registerMessageHandler(this.handler);
        this.props.eventBus.registerMessageHandler(this.logHandler);
        this.props.eventBus.registerMessageHandler(this.fatalHandler);
    }

    componentWillUnmount() {
        this.props.eventBus.unregisterMessageHandler(this.handler);
        this.props.eventBus.unregisterMessageHandler(this.logHandler);
        this.props.eventBus.unregisterMessageHandler(this.fatalHandler);
    }

    level() {
        if (!this.state.message) {
            return '';
        }
        return ALERT[this.state.message.severity];
    }

    resetState() {
        this.setState({ showMessage: false })
    }

    resetFatal() {
        this.setState({ showFatal: false })
    }

    render() {
        if (this.state.showMessage) {
            return <div className={`alert ${this.level()}`}>
                { this.state.message.code } - { this.state.message.code }
                <button type="button"
                        className="close"
                        aria-label="Close"
                        onClick={ this.resetState } >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        } else if (this.state.showFatal) {
            return <WModal show={ this.state.showFatal } title={"Critical Error"} closeFunction={ this.resetFatal }>
                { this.state.message.code } - { this.state.message.code }
            </WModal>
        }
        return '';
    }
}

export default EventBus.withEventBus(DisplayMessage);



