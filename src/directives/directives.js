// 导入Vue
import Vue from "vue";
// 导入 Store
import store from "../store/store.js";

// 只需要保证执行即可
Vue.directive("power", {
    inserted: function (el, binding) {
        window.console.log(el);
        window.console.log(binding.value);
        if (binding.value.includes(store.state.userInfo.role)) {
            // 配置的规则中 存在当前这个角色，就移除他
            el.parentNode.removeChild(el);
        }
    }
});
