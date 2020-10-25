import React from "react";
import PropTypes from 'prop-types';
import { APPEARANCE } from "./constants";


export class WButton extends React.Component {

    getClasses() {
        let cl = `btn btn-${this.props.type} `;
        if (this.props.className) {
            cl = cl + this.props.className;
        }
        if (this.props.fullWidth && this.props.fullWidth === true) {
            cl = cl + ' btn-block ';
        }
        return cl
    }

    render() {
        return (
            <button type='button'
                    onClick={ this.props.onClick }
                    title={ this.props.title }
                    className={ this.getClasses() }>
                { this.props.children }
            </button>);
    }
}

WButton.defaultProps = {
    type: APPEARANCE.constructor
}

WButton.propsType = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    title: PropTypes.string
}