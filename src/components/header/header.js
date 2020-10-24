import React from 'react';
import {withTranslation} from "react-i18next";
import { Widget } from "../../shared/components";



class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event);
        this.props.i18n.changeLanguage(event.target.value);
    }


    render() {

        return <Widget.Navbar>

            <Widget.NavbarItem type={Widget.NAVBAR_ITEM.TITLE} >
                <img src="/logo192.png" width="13%" alt="logo"/>
                {this.props.t('common.title')}
            </Widget.NavbarItem>

            <div className="col-lg-8">
            </div>


            <Widget.NavbarItem type={Widget.NAVBAR_ITEM.TEXT}>
                <div className="input-group-sm input-group-prepend">
                    <label className="col-form-label-sm text-white px-2">{ this.props.t('common.labels.language') }</label>
                    <Widget.Dropdown onSelect={ this.handleChange }>
                        <option value="de">{ this.props.t('common.languages.de') }</option>
                        <option value="en">{ this.props.t('common.languages.en') }</option>
                    </Widget.Dropdown>
                </div>
            </Widget.NavbarItem>
        </Widget.Navbar>;
    }
}

export default withTranslation()(Header);