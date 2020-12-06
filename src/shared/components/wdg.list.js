import React from 'react';
import PropTypes from 'prop-types';
import { Plus, Dash } from "react-bootstrap-icons";

class WListItem extends React.Component {

    render() {
        return <li className={ this.props.itemStyle }>
                { this.props.children }
            </li>
    }
}

WListItem.propTypes = {
    itemStyle: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

function WListHeaderTitle(props) {

    return <div className={`nav ${ props.headerStyle }`}>
        <div className="nav-item p-2">
            <h4 className="text-white">{props.title}</h4>
        </div>
    </div>
}

WListHeaderTitle.propTypes = {
    headerStyle: PropTypes.string.isRequired,
    title: PropTypes.string,
}

function WExpander(props) {

    return <div className="pt-2 pl-1">
        { props.expanded ? <Dash size={'24'} onClick={ props.hideHandler } color={props.expandIconColor} /> : <Plus size={'24'} onClick={ props.showHandler } color={props.expandIconColor}/> }
    </div>
}

WExpander.propTypes = {
    expanded: PropTypes.bool.isRequired,
    hideHandler: PropTypes.func.isRequired,
    showHandler: PropTypes.func.isRequired,
    expandIconColor: PropTypes.string.isRequired
}

export class WList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: this.props.expanded
        }
        this.hideItems = this.hideItems.bind(this);
        this.showItems = this.showItems.bind(this);
    }

    hideItems() {
        this.setState({ expanded: false });
    }

    showItems() {
        this.setState({ expanded: true });
    }

    getItems() {
        return this.props.content.map((entry) => {
            return <WListItem key={ entry[this.props.keyAttribute] } itemStyle={ this.props.itemStyle }> { this.props.render(entry) }</WListItem>
        });
    }

    getHeader() {
        if (this.props.title) {
            return <WListHeaderTitle title={this.props.title} headerStyle={ this.props.headerStyle }/>
        }
        if (this.props.headerContent instanceof Function) {
            return this.props.headerContent.call();
        } else if (this.props.headerContent) {
            return this.props.headerContent;
        }
        return "";
    }

    render() {
        return <div>
                <div className={this.props.headerStyle} >
                    { this.props.expandable ?
                        <div className="float-left">
                            <WExpander expanded={this.state.expanded} hideHandler={this.hideItems} expandIconColor={this.props.expandIconColor}
                                       showHandler={this.showItems} headerStyle={this.props.headerStyle}/>
                        </div> : ''
                    }
                    <div>
                        { this.getHeader() }
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    { this.state.expanded ? this.getItems() : '' }
                </ul>
        </div>
    }
}

WList.defaultProps = {
    itemStyle: "list-group-item list-group-item-light",
    headerStyle: "bg-dark",
    expanded: true,
    expandable: false,
    expandIconColor: 'white'
}

WList.propTypes = {
    keyAttribute: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    render: PropTypes.any.isRequired,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    expandIconColor: PropTypes.string,
    itemStyle: PropTypes.string,
    headerStyle: PropTypes.string,
    title: PropTypes.string,
    headerContent: PropTypes.any
}

