import {Trans, useTranslation} from "react-i18next";
import {Widget} from "../../shared/components";
import React from "react";


export default function DropDownExample(props) {
    const { t } = useTranslation();
    return <div className="row pt-4">
        <div className="input-group input-group-sm col">
            <label className="col-form-label-sm px-2"><Trans>app.kitchensink.dropdown.label</Trans></label>
            <Widget.Dropdown emptyText={t('common.message.dropdown')}>
                <option value="1">{t('app.kitchensink.dropdown.select.one')}</option>
                <option value="2">{t('app.kitchensink.dropdown.select.two')}</option>
                <option value="3">{t('app.kitchensink.dropdown.select.three')}</option>
            </Widget.Dropdown>
        </div>
    </div>
}