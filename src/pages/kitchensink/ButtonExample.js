import {Widget} from "../../shared/components";
import {Trans, useTranslation } from "react-i18next";
import React from "react";

export default function ButtonExample(props) {
    const { t } = useTranslation();

    return <div className="row py-4">
        <div className="col">
            <Widget.Button type={Widget.BUTTON_TYPE.INFO} onClick={props.handler}>
                <Trans>app.kitchensink.button.label</Trans>
            </Widget.Button>
        </div>
        <div className="col">
            <Widget.Button type={Widget.BUTTON_TYPE.NORMAL} onClick={props.handler}
                           fullWidth={true} title={t('app.kitchensink.button.label-block')}>
                <Trans>app.kitchensink.button.label-block</Trans>
            </Widget.Button>
        </div>
    </div>

}

