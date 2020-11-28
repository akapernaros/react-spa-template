import {Widget} from "../../shared/components";
import { Trans, withTranslation } from "react-i18next";
import React from "react";
import { SEVERITY, Message }  from "../../shared/core/errors";
import {EventBus} from "../../shared/services/eventbus";

export class ErrorSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handler = this.handler.bind(this);

        this.state = {
            code: 'ERR-001',
            severity: SEVERITY.WARNING,
            message: '???'
        }

    }

    handler() {
        this.props.eventBus.sendMessage(new Message(this.state.code, this.state.message, this.state.severity));
    }

    handleChange(e) {
        if (e.target.id === 'code') {
            this.setState( {code: e.target.value} );
        } else if (e.target.id === 'message') {
            this.setState( {message: e.target.value} );
        } else if (e.target.id === 'severity') {
            this.setState( {severity: e.target.value} );
        }
    }

    severityValues() {
        let result = [];
        Object.keys(SEVERITY).forEach(k => {
            result.push(<option key={k} value={SEVERITY[k]}>{this.props.t(`app.kitchensink.error.select.${k}`)}</option>)
        })
        return result;
    }

    render() {
        return <div className={"row py-4"}>
            <div className="col">
                <Widget.ExpandableSection title={this.props.t('app.kitchensink.error.title')} expanded={false}>
                    <Widget.ExpandableTabBody>
                        <div className="row pt-2">
                            <div className="input-group input-group-sm col-lg-3">
                                <label className="col-form-label-sm px-2"><Trans>app.kitchensink.error.labels.severity</Trans></label>
                                <Widget.Dropdown id="severity" emptyText={this.props.t('common.message.dropdown')} value={ this.state.severity } onSelect={ this.handleChange }>
                                    { this.severityValues() }
                                </Widget.Dropdown>
                            </div>
                            <div className="input-group input-group-sm col-lg-2">
                                <label className="col-form-label-sm px-2"><Trans>app.kitchensink.error.labels.code</Trans></label>
                                <input id={"code"} type="text" className="form-control" value={ this.state.code } onChange={ this.handleChange }/>
                            </div>
                            <div className="input-group input-group-sm col-lg-4">
                                <label
                                    className="col-form-label-sm px-2"><Trans>app.kitchensink.error.labels.message</Trans></label>
                                <input id={"message"} type="text" className="form-control" value={ this.state.message } onChange={ this.handleChange }/>
                            </div>
                            <div className="col-lg-2">
                                <Widget.Button type={Widget.BUTTON_TYPE.ALERT} onClick={ this.handler }><Trans>app.kitchensink.error.labels.fire</Trans></Widget.Button>
                            </div>
                        </div>
                    </Widget.ExpandableTabBody>
                </Widget.ExpandableSection>
            </div>
        </div>
    }
}

export default withTranslation()(EventBus.withEventBus(ErrorSection));