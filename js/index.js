import '../scss/main.scss';
import './modal';
import './tabs';
import './content-switcher';
import './dropdown';
import Tooltip from './tooltip';

if (window) {
    window.Tooltip = Tooltip;
}