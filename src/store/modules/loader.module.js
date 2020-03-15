const state = {
    overlay: false
};

const getters = {
    getOverlay: state => state.overlay
};

const actions = {
    showLoader({ commit }) {
        commit('showLoader');
    },
    hideLoader({ commit }) {
        commit('hideLoader');
    }
};

const mutations = {
    showLoader(state) {
        state.overlay = true;
    },
    hideLoader(state) {
        state.overlay = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
