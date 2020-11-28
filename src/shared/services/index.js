import {ConfigService, withConfiguration} from "./config";
import {ApiService, withApiService} from "./api";
import { withTranslation } from "react-i18next";
import {EventBus} from "./eventbus";
import {FatalError} from "../core/errors";

export const initialize = async () => {
   await ConfigService.init().catch(() => { throw new FatalError("CONFIG") });
   await ApiService.init().catch(() => { throw new FatalError("REST") });
}

/**
 * Convenience method adding all "services" for class components.
 *
 * @param WrappedComponent mandatory.
 */
export function withAllServices(WrappedComponent) {
   let comp = withConfiguration(WrappedComponent);
   comp = withApiService(comp);
   comp = EventBus.withEventBus(comp);
   return withTranslation()(comp);
}
