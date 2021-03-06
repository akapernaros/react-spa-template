import React from "react";
import PropTypes from 'prop-types';
import { Trans } from "react-i18next";
import {APPEARANCE} from "./constants";

function getHeaderStyle(apperance) {
    let result;
    switch (apperance) {
        case APPEARANCE.ALERT:
            result = 'bg-danger';
            break;
        case APPEARANCE.WARN:
            result = 'bg-warning';
            break;
        case APPEARANCE.SUBMIT:
            result = 'bg-primary';
            break;
        case APPEARANCE.NORMAL:
            result = 'bg-secondary';
            break;
        case APPEARANCE.INFO:
            result = 'bg-info';
            break;
        case APPEARANCE.DARK:
            result = 'bg-dark';
            break;
        default:
            result = 'bg-light';
    }
    return result;
}

function getContentStyle(apperance) {
    let result;
    switch (apperance) {
        case APPEARANCE.LIGHT:
            result = 'bg-transparent';
            break;
        default:
            result = 'bg-light';
    }
    return result;
}

function getTextStyle(apperance) {
    let result;
    switch (apperance) {
        case APPEARANCE.ALERT:
            result = 'text-white';
            break;
        case APPEARANCE.NORMAL:
            result = 'text-white';
            break;
        case APPEARANCE.INFO:
            result = 'text-white';
            break;
        case APPEARANCE.DARK:
            result = 'text-white';
            break;
        default:
            result = 'text-body';
    }
    return result;
}

/**
 * Displays a popup with a simple message or a custom body. Returns 'CLOSE' if closed by default button or 'XCLOSE' if closed by header-button.
 *
 * @property show triggers the popup to be shown
 * @property headerClose (default:true) displays the close button in the header
 * @property title header title
 * @property message message to be displayed (if no children).
 * @property closeFunction will be triggered to indicate a. that the popup closed and b. the button (value) that triggered close action.
 * @property footerButtons optional, define custom buttons {title: "", value: ""} in an array. Title will be displayed and value will be returned to the closeFunction.
 */
export class WModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: '',
            display: 'none'
        };
        this.current = false;
    }

    customClose(value) {
        if (this.props.closeFunction) {
            this.props.closeFunction(value);
        }
    }

    showModal() {
        this.setState({
            modalShow: 'show',
            display: 'block'
        });
        this.current = true;
    }

    hideModal() {
        this.setState({
            modalShow: '',
            display: 'none'
        });
        this.current = false;
    }

    componentDidMount() {
        this.props.show ? this.showModal() : this.hideModal();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.current === false && this.props.show === true) {
            this.showModal();
        } else if (this.current === true && this.props.show === false) {
            this.hideModal();
        }
    }

    getFooterButtons() {
        if (this.props.footerButtons) {
            let buttons =  [];
            let idx = 0;
            this.props.footerButtons.forEach(but => {
                buttons.push(<button key={idx} type="button" className="btn btn-secondary" onClick={ but.value ? this.customClose.bind(this, but.value) : this.triggerClose.bind(this) }>
                    { but.title }
                </button>);
                idx++;
            });
            return buttons;
        }
        return <button type="button" className="btn btn-secondary" onClick={ this.customClose.bind(this, 'CLOSE') }>
            <Trans>common.actions.close</Trans>
        </button>
    }

    render() {
        return (
            <div className={'modal fade ' + this.state.modalShow}
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ display: this.state.display }} >
                <div className="modal-dialog" role="document">
                    <div className={ `modal-content ${getContentStyle(this.props.appearance)}` }>
                        <div className={ `modal-header ${getHeaderStyle(this.props.appearance)} ${getTextStyle(this.props.appearance)}` } >
                            <h3>{ this.props.title }</h3>
                            { this.props.headerClose ? <button type="button"
                                className="close"
                                aria-label="Close"
                                onClick={ this.customClose.bind(this, 'XCLOSE') } >
                                <span aria-hidden="true">&times;</span>
                            </button> : ''}
                        </div>
                        <div className="modal-body">
                            <div className={"px-3"}>
                                { this.props.message }
                                { this.props.children }
                            </div>
                        </div>
                        <div className="modal-footer">
                            { this.getFooterButtons() }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

WModal.defaultProps = {
    headerClose: true,
    appearance: APPEARANCE.LIGHT
}

WModal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    headerClose: PropTypes.bool.isRequired,
    appearance: PropTypes.string,
    footerButtons: PropTypes.array,
    message: PropTypes.string,
    children: PropTypes.any,
    closeFunction: PropTypes.func
}