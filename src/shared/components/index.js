import { WButton } from './wdg.button';
import WNavbar, { NB } from './wdg.navbar';
import { APPEARANCE, NB_ITEM_TYPE, SIZE } from './constants';
import { WDropdown } from './wdg.dropdown';
import { WExpandableSection } from './wdg.expandable-tab';
import { WList } from './wdg.list';
import { WModal } from './wdg.modal';

export const Widget = {

    Navbar: WNavbar,
    NavbarItem: NB.item,

    Button: WButton,
    Dropdown: WDropdown,
    ExpandableSection: WExpandableSection,
    List: WList,

    Modal: WModal,

    BUTTON_TYPE: APPEARANCE,
    SIZE: SIZE,
    NAVBAR_ITEM: NB_ITEM_TYPE
}