import React from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {NB_ITEM_TYPE} from "./constants";

class WNavbar extends React.Component {

    render() {
        return (<Navbar sticky="top" bg="dark" variant="dark" expand={ this.props.size }>
            { this.props.children }
        </Navbar>);
    }
}

WNavbar.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string.isRequired
}

class WNavBarItem extends React.Component {

    render() {
        let element;
        if (this.props.type === NB_ITEM_TYPE.TEXT) {
            element = <Navbar.Text>{this.props.children}</Navbar.Text>
        } else if (this.props.type === NB_ITEM_TYPE.TITLE) {
            element = <Navbar.Brand>{this.props.children}</Navbar.Brand>
        }

        return element;
    }
}

WNavBarItem.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string
}


export default WNavbar;

export const NB = {
    item: WNavBarItem
}

