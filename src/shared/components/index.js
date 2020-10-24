import {WButton} from "./wdg.button";
import WNavbar, {NB} from "./wdg.navbar";
import {APPEARANCE, NB_ITEM_TYPE, SIZE} from "./constants";
import {WDropdown} from "./wdg.dropdown";

export const Widget = {

    Navbar: WNavbar,
    NavbarItem: NB.item,
    Button: WButton,
    Dropdown: WDropdown,


    BUTTON_TYPE: APPEARANCE,
    SIZE: SIZE,
    NAVBAR_ITEM: NB_ITEM_TYPE
}