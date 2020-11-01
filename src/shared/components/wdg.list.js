import React from "react";
import PropTypes from 'prop-types';

class WListItem extends React.Component {

    render() {
        return <li className={ this.props.itemStyle }>
                { this.props.children }
            </li>
    }
}



export class WList extends React.Component {

    getItems = () => {
        return this.props.content.map((entry) => {
            return <WListItem key={ entry[this.props.keyAttribute] } itemStyle={ this.props.itemStyle }> { this.props.render(entry) }</WListItem>
        });
    }

    getHeader() {
        if (this.props.title) {
            console.log("Title");
            return <div className="nav bg-dark">
                    <div className="nav-item">
                        <h4 className="text-white p-2">{this.props.title}</h4>
                    </div>
                </div>
        }
        if (this.props.headerContent instanceof Function) {
            console.log("Header");
            return this.props.headerContent.call();
        }
        return "";
    }

    render() {
        return <div className="overflow-auto">
            { this.getHeader() }
            <ul className="list-group list-group-flush">
                { this.getItems() }
            </ul>
        </div>
    }
}

WList.defaultProps = {
    itemStyle: "list-group-item list-group-item-light"
}

WList.propTypes = {
    keyAttribute: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    render: PropTypes.any.isRequired,
    itemStyle: PropTypes.string,
    title: PropTypes.string,
    headerContent: PropTypes.any
}

