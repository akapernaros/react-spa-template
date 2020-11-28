import React from "react";
import {EventBus} from "./shared/services/eventbus";
import {SEVERITY} from "./shared/core/errors";

export function FatalError(props) {
    return  <div className="pt-2">
        <div className="alert alert-danger">{ props.error.code } - { props.error.message }</div>
    </div>
}

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            fatal: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        if (error.severity && error.severity === SEVERITY.FATAL) {
            this.setState( { fatal: true} );
        }
        EventBus.sendMessage(error);
    }

    render() {
        if (this.state.hasError && this.state.fatal) {
            return <FatalError error={ this.state.error }/>
        }
        return this.props.children;
    }
}