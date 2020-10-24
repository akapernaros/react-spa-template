import React from "react";
import PropTypes from 'prop-types';

export class WDropdown extends React.Component {

    getEmptyOption(text) {
        return <option disabled>{ text }</option>
    };

    render() {

        let emptyElement;
        if (this.props.emptyText) {
            emptyElement = this.getEmptyOption(this.props.emptyText)
        }

        let onSel;
        if (this.props.onSelect) {
            onSel = this.props.onSelect;
        }
        return <select className="custom-select" onChange={ onSel }>
            { emptyElement }
            { this.props.children }
        </select>
    }
}

WDropdown.propTypes = {
    children: PropTypes.node.isRequired,
    emptyText: PropTypes.string,
    onSelect: PropTypes.func

}