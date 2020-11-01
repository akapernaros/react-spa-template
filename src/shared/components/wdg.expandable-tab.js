import React from "react";
import  PropTypes  from 'prop-types';
import { BoxArrowInUp, BoxArrowDown } from 'react-bootstrap-icons';

class WExpandableHeader extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { expanded: this.props.expanded };
    }

    toggle() {
        this.setState(function(state, props) {
            props.onChange(!state.expanded);
            return {
                expanded: !state.expanded
            };
        });


        this.props.onChange(this.state.expanded);
    }

    getIcon() {
        let size = this.props.size;

        if (this.props.expanded) {
            return <BoxArrowInUp size={ size }/>
        }
        return <BoxArrowDown size={ size }/>
    }

    render() {
        return <div className={ this.props.classes }>
                    <div className="row">
                        <div className={ "col" }>
                            <div className="float-left m-2">
                                <h5>{ this.props.title }</h5>
                            </div>
                            <div className="float-right m-2">
                                <button className={ `btn btn-sm ${this.props.classes}` } type="button" onClick={ this.toggle }> { this.getIcon() }</button>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}

WExpandableHeader.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.string.isRequired
}

class WExpandableBody extends React.Component {



    render() {
        let cl = `mb-2 ${ this.props.className }`;

        return <div className={ cl }>
            { this.props.children }
        </div>
    }
}

WExpandableBody.defaultProps = {
    className: 'bg-light'
}

WExpandableBody.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
}

class WExpandableSection extends React.Component {

    constructor(props) {
        super(props);
        this.handleExpandChange = this.handleExpandChange.bind(this);
        this.state = { expanded: this.props.expanded };
    }

    handleExpandChange(expanded) {
        this.setState({ expanded: expanded });
    }

    render() {
        let body;
        if (this.state.expanded === true) {
            body = this.props.children;
        }
        return  <div className="bg-light">
                    <WExpandableHeader expanded={ this.state.expanded }
                                       size={ this.props.size }
                                       title={ this.props.title }
                                       classes={ this.props.headerClass }
                                       onChange={ this.handleExpandChange } />
                    { body }
                </div>
    }
}

WExpandableSection.defaultProps = {
    size: 24,
    expanded: false,
    headerClass: 'bg-info'
}

WExpandableSection.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.number,
    expanded: PropTypes.bool,
    headerClass: PropTypes.string
}

export { WExpandableSection, WExpandableBody };