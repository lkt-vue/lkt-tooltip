import {App, Plugin} from "vue";
import "../style.css";
import {default as libComponent} from "./lib-components/LktTooltip.vue";


const LktTooltip: Plugin = {
    install: (app: App) => {
        if (app.component('lkt-tooltip') === undefined) app.component('lkt-tooltip', libComponent)
    },
};

export default LktTooltip;