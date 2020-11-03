import React from "react";

/**
 * Loads and returns static configuration.
 *
 * @type {{init(): Promise<void>, configuration: {}}}
 */
export const ConfigService = {


    configuration: {},


    async init() {
        console.log("Initializing Config.")
        this.configuration = await fetch('data/configuration.json')
            .then(value => value.json())
            .then(out => {
                console.log("Config loaded." + JSON.stringify(out));
                return out;
            });
    },
}

/**
 * Returns the (High order) component offering access to app configuration (this.props.config).
 *
 * @param WrappedComponent - madatory.
 * @returns Wrapper class.
 */
export function withConfiguration(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.configurationProvider = ConfigService;
            this.state = {
                config: ConfigService.configuration
            };
        }

        render() {
            return <WrappedComponent config={this.state.config} {...this.props} />;
        }
    };
}
