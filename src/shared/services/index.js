import {ConfigService, withConfiguration} from "./config";
import {ApiService, withApiService} from "./api";
import { withTranslation } from "react-i18next";

export const initialize = async () => {
   await ConfigService.init();
   await ApiService.init();
}

/**
 * Convenience method adding all "services" for class conponents.
 *
 * @param WrappedComponent mandatory.
 */
export function withAllServices(WrappedComponent) {
   let comp = withConfiguration(WrappedComponent);
   comp = withApiService(comp);
   return withTranslation()(comp);
}
