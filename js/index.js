import '../scss/main.scss';
import './event-manager';
import './modal';
import './tabs';
import './content-switcher';
import './dropdown';
import Tooltip from './tooltip';

if (window) {
    window.Tooltip = Tooltip;
}