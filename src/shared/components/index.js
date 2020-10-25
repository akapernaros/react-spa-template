import {WButton} from "./wdg.button";
import WNavbar, {NB} from "./wdg.navbar";
import {APPEARANCE, NB_ITEM_TYPE, SIZE} from "./constants";
import {WDropdown} from "./wdg.dropdown";
import {WExpandableBody, WExpandableSection} from "./wdg.expandable-tab";

export const Widget = {

    Navbar: WNavbar,
    NavbarItem: NB.item,
    Button: WButton,
    Dropdown: WDropdown,
    ExpandableSection: WExpandableSection,
    ExpandableTabBody: WExpandableBody,

    BUTTON_TYPE: APPEARANCE,
    SIZE: SIZE,
    NAVBAR_ITEM: NB_ITEM_TYPE
}