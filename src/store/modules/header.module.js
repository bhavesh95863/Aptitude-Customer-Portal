import store from '../../store'

const state = {
    Menus: [
        { id: 0, text: 'Profile Settings', path: 'profile-setting' },
        { id: 1, text: 'Company Profile', path: 'company-profile' },
        { id: 2, text: 'Company Settings' },
        { id: 3, text: 'Company Users' },
        { id: 4, text: 'Platform Groups and Users' },
        { id: 5, text: 'Finance', path: 'finance' },
        { id: 6, text: 'Subscriptions & services' },
        { id: 7, text: 'Insfrastructures Management' },
        { id: 8, text: 'Tickets' },
        { id: 9, text: 'Action History' }
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
