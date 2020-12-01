import {Widget} from "../../shared/components";
import {Trans, withTranslation} from "react-i18next";
import React from "react";

class TwoWayDatabingExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: "Text"};
        this.updateField = this.updateField.bind(this);
    }

    updateField(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return <div className="row py-4">
            <div className="col">
                <Widget.ExpandableSection title={this.props.t('app.kitchensink.twoway.title')} expanded={false}>
                    <Widget.ExpandableTabBody>
                        <div className="input-group my-3">
                            <span className="input-group-text"><Trans>app.kitchensink.twoway.text</Trans></span>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"><Trans>app.kitchensink.twoway.label</Trans></span>
                            </div>
                            <input type="text" className="form-control" value={this.state.value}
                                   onChange={this.updateField}/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"><Trans>app.kitchensink.twoway.label</Trans></span>
                            </div>
                            <input type="text" className="form-control" value={this.state.value}
                                   onChange={this.updateField}/>
                        </div>
                    </Widget.ExpandableTabBody>
                </Widget.ExpandableSection>
            </div>
        </div>
    }
}

export default withTranslation()(TwoWayDatabingExample);