import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import trans_de from './translation.de.json';
import trans_en from './translation.en.json';



i18n
    .use(initReactI18next) // passes i18n down to react-i18next

    .init( {
        lng: "de",
        fallbackLng: "en",

        resources: {
            de: {
                translation: trans_de
            },
            en: {
                translation: trans_en
            }
        },

        keySeparator: '.',

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;