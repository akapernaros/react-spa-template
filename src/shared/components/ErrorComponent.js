import React from 'react';
import PropTypes from 'prop-types';

export const SEVERITY = {
    FATAL: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3
}

export class Throwable {
    constructor(code, message, severity) {
        this.code = code;
        this.message = message;
        this.severity = severity;
        if (!this.severity) {
            this.severity = SEVERITY.ERROR;
        }
    }
}
export function withError(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { error: null }
            this.throwException = this.throwException.bind(this);
        }

        throwException(e) {
            return this.setState(() => { throw e });
        }

        render() {
            return <WrappedComponent throwError={ this.throwException } {...this.props} />
        }
    }
}
export const useAsyncError = () => {
    const [error , setError] = React.useState();
    return React.useCallback(
        e => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};

function DefaultDisplay(props) {
    let display = 'alert-danger';
    let error = props.error;
    if (error.severity === SEVERITY.WARNING) {
        display = 'alert-warning';
    } else if (error.severity === SEVERITY.INFO) {
        display = 'alert-info';
    }
    return  <div className="pt-2">
        <div className={"alert " + display }>{ props.error.code } - { props.error.message }</div>
        { props.children }
    </div>
}

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
        this.resetState = this.resetState.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    resetState() {
        this.setState({hasError: false, error: null});
    }

    componentDidCatch(error, errorInfo) {
        if (error.severity && error.severity > 1) {
            setTimeout(() => {
                this.resetState();
            }, 15000);
        }
        if (this.props.notify) {
            this.props.notify(error, errorInfo);
        }
        console.log(JSON.stringify(error));
    }

    render() {
        if (this.state.hasError) {
            return <DefaultDisplay error={ this.state.error }>
                { this.props.children }
            </DefaultDisplay>
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes={
    notify: PropTypes.func,
    displayError: PropTypes.element
}