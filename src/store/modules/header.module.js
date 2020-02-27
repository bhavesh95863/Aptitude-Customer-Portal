import store from '../../store'

const state = {
    Menus: [
        { id: 0, text: 'Profile Settings', path: '/profile-setting', icon: 'mdi-account-edit' },
        { id: 1, text: 'Company Profile', path: '/company-profile', icon: 'mdi-factory' },
        { id: 2, text: 'Company Settings', path: '/company-settings', icon: 'mdi-settings' },
        { id: 3, text: 'Company Users', icon: 'mdi-account-multiple' },
        { id: 4, text: 'Platform Groups and Users', path: '/platform-groups-and-users', icon: 'mdi-account-network' },
        { id: 5, text: 'Finance', path: '/finance', icon: 'mdi-cash-usd' },
        { id: 6, text: 'Subscriptions & services', path: '/subscriptions-services', icon: 'mdi-server-network' },
        { id: 7, text: 'Insfrastructures Management', icon: 'mdi-desktop-tower' },
        { id: 8, text: 'Tickets', icon: 'mdi-ticket' },
        { id: 9, text: 'Action History', icon: 'mdi-history' }
    ],
    SuperAdminMenus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    AdminMenus: [0, 1, 2, 3, 4, 6, 7, 8, 9],
    AccountUserMenu: [0, 1, 5, 6, 9],
    NormalUserMenu: [0, 6, 7, 8, 9],
    UserTypes: [
        { id: 0, name: 'Super Admin' },
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Account User' },
        { id: 3, name: 'Normal User' }
    ]
};

const getters = {
    getMenuItems(state) {
        let UserType = store.getters.getUserType;
        if (UserType == 'Super Admin') {
            let menuItems = Array();
            state.SuperAdminMenus.forEach((item) => {
                menuItems.push(state.Menus[item]);
            });
            return menuItems;
        } else if (UserType == 'Admin') {
            let menuItems = Array();
            state.AdminMenus.forEach((item) => {
                menuItems.push(state.Menus[item]);
            });
            return menuItems;
        } else if (UserType == 'Finance User') {
            let menuItems = Array();
            state.AccountUserMenu.forEach((item) => {
                menuItems.push(state.Menus[item]);
            });
            return menuItems;
        } else if (UserType == 'Normal User') {
            let menuItems = Array();
            state.NormalUserMenu.forEach((item) => {
                menuItems.push(state.Menus[item]);
            });
            return menuItems;
        }
    },

};

const actions = {

};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};
