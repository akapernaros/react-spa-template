import { Widget } from '../../shared/components';
import {Trans, useTranslation} from "react-i18next";
import React from "react";

export default function ExpandableSectionExample(props) {

    const { t } = useTranslation();

    return <div className={"row py-4"}>
        <div className="col">
            <Widget.ExpandableSection title={t('app.kitchensink.expandable.title')} expanded={true}>
                <div className="py-2">
                    {t('app.kitchensink.expandable.text')}
                </div>
            </Widget.ExpandableSection>
        </div>
        <div className="col">
            <Widget.ExpandableSection title={t('app.kitchensink.expandable.title')} expanded={false}>
                <div className="py-2">
                    {t('app.kitchensink.expandable.text')}
                </div>
                <div className="py-2">
                    <Widget.Button type={Widget.BUTTON_TYPE.NORMAL} onClick={props.handler}
                                   fullWidth={true} title={t('app.kitchensink.button.label-block')}>
                        <Trans>app.kitchensink.button.label-block</Trans>
                    </Widget.Button>
                </div>
            </Widget.ExpandableSection>
        </div>
    </div>
}