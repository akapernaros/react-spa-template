import React from "react";
import PropTypes from 'prop-types';
import { Trans } from "react-i18next";

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
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalShow: 'show',
            display: 'block'
        });
    }

    closeModal(value) {
        this.setState({
            modalShow: '',
            display: 'none'
        });
        if (this.props.closeFunction) {
            this.props.closeFunction(value);
        }
    }

    componentDidMount() {
        this.props.show ? this.openModal() : this.closeModal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.props.show ? this.openModal() : this.closeModal();
        }
    }

    getFooterButtons() {
        if (this.props.footerButtons) {
            let buttons =  [];
            let idx = 0;
            this.props.footerButtons.forEach(but => {
                buttons.push(<button key={idx} type="button" className="btn btn-secondary" onClick={ but.value ? this.closeModal.bind(this, but.value) : this.closeModal }>
                    { but.title }
                </button>);
                idx++;
            });
            return buttons;
        }
        return <button type="button" className="btn btn-secondary" onClick={ this.closeModal.bind(this, 'CLOSE') }>
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
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{ this.props.title }</h3>
                            { this.props.headerClose ? <button type="button"
                                className="close"
                                aria-label="Close"
                                onClick={ this.closeModal.bind(this, 'XCLOSE') } >
                                <span aria-hidden="true">&times;</span>
                            </button> : ''}
                        </div>
                        <div className="modal-body">
                            { this.props.message }
                            { this.props.children }
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
    headerClose: true
}

WModal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    headerClose: PropTypes.bool.isRequired,
    footerButtons: PropTypes.array,
    message: PropTypes.string,
    children: PropTypes.any,
    closeFunction: PropTypes.func
}