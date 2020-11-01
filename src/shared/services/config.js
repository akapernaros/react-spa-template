import React from "react";

class Config {

    static newInstance() {
        console.log("Initialized Config.")
        return new Config();
    }

    getConfiguration() {
        return {
            baseUrl: 'https://gorest.co.in/public-api'
        }
    }
}

export const configService = Config.newInstance();

export function withConfiguration(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.configurationProvider = configService;
            this.state = {
                config: configService.getConfiguration()
            };
        }

        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent config={this.state.config} {...this.props} />;
        }
    };
}