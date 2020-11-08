import {Widget} from "../../shared/components";
import {Trans, useTranslation } from "react-i18next";
import React, {useState} from "react";
import {string} from "prop-types";

export default function ButtonExample(props) {
    const { t } = useTranslation();
    const [ show, setShow ] = useState(false);
    const [ message, setMessage ] = useState();

    const buttons = [{ title: t('common.actions.cancel'), value: 'CANCEL' },
        { title: t('common.actions.save'), value: 'SAVE'},
        { title: t('common.actions.ok'), value: 'OK'}];

    const testMessage = () => {
        setShow(true);
    }
    const handleClose = (value) => {
        if (value && value instanceof string) {
            setMessage(value)
        }
        setShow(false);
    }

    return <div className="row py-4">
        <Widget.Modal title={t('app.kitchensink.modal.title')}
                      show={ show }
                      headerClose={ false }
                      footerButtons={ buttons }
                      closeFunction={ handleClose }>
            <div className="row">
                <span className="p-3"><Trans>app.kitchensink.modal.content</Trans></span>
            </div>

            <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                    <span className="input-group-text">EMail</span>
                </div>
                <input type="text" className="form-control" />
            </div>

        </Widget.Modal>

        <div className="col">
            <Widget.Button type={Widget.BUTTON_TYPE.INFO} onClick={props.handler}>
                <Trans>app.kitchensink.button.label</Trans>
            </Widget.Button>
        </div>
        <div className="col">
            <Widget.Button type={Widget.BUTTON_TYPE.INFO} onClick={ testMessage }>
                <Trans>app.kitchensink.modal.title</Trans>
            </Widget.Button>
            <span className="pl-2"><Trans>app.kitchensink.modal.returned</Trans> { message }</span>
        </div>
        <div className="col">
            <Widget.Button type={Widget.BUTTON_TYPE.NORMAL} onClick={props.handler}
                           fullWidth={true} title={t('app.kitchensink.button.label-block')}>
                <Trans>app.kitchensink.button.label-block</Trans>
            </Widget.Button>
        </div>
    </div>

}

