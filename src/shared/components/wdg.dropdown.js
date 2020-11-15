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

        return <select id={ this.props.id } className="custom-select" onChange={ this.props.onSelect } value={ this.props.value }>
            { emptyElement }
            { this.props.children }
        </select>
    }
}

WDropdown.propTypes = {
    children: PropTypes.node.isRequired,
    emptyText: PropTypes.string,
    id: PropTypes.string,
    onSelect: PropTypes.func,
    value: PropTypes.any
}