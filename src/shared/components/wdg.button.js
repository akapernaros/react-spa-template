import React from "react";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { APPEARANCE } from "./constants";


export class WButton extends React.Component {

    render() {
        let type = APPEARANCE.NORMAL;
        if (this.props.type) {
            type = this.props.type;
        }
        return (
            <Button variant={ type }
                    onClick={this.props.onClick}
                    className={this.props.classes}
                    block={this.props.fullWidth}>
                {this.props.children}
            </Button>);
    }
}

WButton.propsType = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    classes: PropTypes.string,
    fullWidth: PropTypes.bool
}