import React from 'react';
import { MessageHandler, EventBus } from "../shared/services/eventbus";
import {SEVERITY} from "../shared/core/errors";
import {WModal} from "../shared/components/wdg.modal";
import {useTranslation, withTranslation} from "react-i18next";
import {APPEARANCE} from "../shared/components/constants";

const ALERT = {
    1: 'alert-danger',
    2: 'alert-danger',
    3: 'alert-warning',
    4: 'alert-info'
}

function getTitleKey(severity) {
    return `common.messages.title.${severity}`;
}

function TranslatedTitle(props) {
    const { t } = useTranslation();
    return <div className="row"><h4>{ t(getTitleKey(props.error.severity))}</h4></div>
}

function TranslatedMessage(props) {
    const { t } = useTranslation();
    let key = `common.messages.code.${props.error.code}`;
    let message = t(key);
    if ( message === key) {
        message = props.error.message;
    }
    return <div className={'row'}>[{props.error.code}] - {message}</div>
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
                <div className="row">
                    <div className="col-lg">
                        <TranslatedTitle error={this.state.message}/>
                        <TranslatedMessage error={this.state.message}/>
                    </div>
                    <div className="col-lg-1">
                        <button type="button"
                                className="close"
                                aria-label="Close"
                                onClick={ this.resetState } >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        } else if (this.state.showFatal) {
            return <WModal show={ this.state.showFatal }
                           appearance={ APPEARANCE.ALERT }
                           title={this.props.t(getTitleKey(this.state.message.severity))}
                           closeFunction={ this.resetFatal }>
                <TranslatedMessage error={this.state.message}/>
            </WModal>
        }
        return '';
    }
}

export default withTranslation()(EventBus.withEventBus(DisplayMessage));



