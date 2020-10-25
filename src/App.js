import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Trans, withTranslation } from "react-i18next";
import { Widget } from "./shared/components";
import Header from './components/header/header'


export class App extends React.Component {


  test() {
    alert("Test");
  }

  render() {

    return (
        <div>
          <Header/>
          <div className="App container-lg">
            <div className="row pt-4">
              <div className="input-group input-group-sm col">
                <label className="col-form-label-sm px-2"><Trans>app.labels.dropdown</Trans></label>
                <Widget.Dropdown emptyText={ this.props.t('common.message.dropdown') }>
                  <option value="1">{ this.props.t('app.select.one') }</option>
                  <option value="2">{ this.props.t('app.select.two') }</option>
                  <option value="3">{ this.props.t('app.select.three') }</option>
                </Widget.Dropdown>
              </div>
            </div>
            <div className="row py-4">
              <div className="col">
                  <Widget.Button type={Widget.BUTTON_TYPE.INFO} onClick={this.test}>
                    <Trans>app.labels.button</Trans>
                  </Widget.Button>
              </div>
              <div className="col">
                <Widget.Button type={Widget.BUTTON_TYPE.NORMAL} onClick={this.test}
                               fullWidth={ true } title={ this.props.t('app.labels.button-block') }>
                  <Trans>app.labels.button-block</Trans>
                </Widget.Button>
              </div>
            </div>
            <div className={"row py-4"}>
               <div className="col">
                   <Widget.ExpandableSection title={ this.props.t('app.labels.expandable') } expanded={ false }>
                     <Widget.ExpandableTabBody>
                         <div className="py-2">
                            { this.props.t('app.text.tabbody') }
                         </div>
                     </Widget.ExpandableTabBody>
                   </Widget.ExpandableSection>
               </div>
                <div className="col">
                    <Widget.ExpandableSection title={ this.props.t('app.labels.expandable') } expanded={ false }>
                        <Widget.ExpandableTabBody>
                            <div className="py-2">
                                { this.props.t('app.text.tabbody') }
                            </div>
                            <div className="py-2">
                                <Widget.Button type={Widget.BUTTON_TYPE.NORMAL} onClick={this.test}
                                               fullWidth={ true } title={ this.props.t('app.labels.button-block') }>
                                    <Trans>app.labels.button-block</Trans>
                                </Widget.Button>
                            </div>
                        </Widget.ExpandableTabBody>
                    </Widget.ExpandableSection>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

export default withTranslation()(App);
