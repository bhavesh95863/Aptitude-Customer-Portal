import store from '../../store'

const state = {
    SuperAdminMenus: [
        { id: 0, text: 'Profile Settings' },
        { id: 1, text: 'Company Profile' },
        { id: 2, text: 'Company Settings' },
        { id: 3, text: 'Company Users' },
        { id: 4, text: 'Platform Groups and Users' },
        { id: 5, text: 'Finance' },
        { id: 6, text: 'Subscriptions & services' },
        { id: 7, text: 'Insfrastructures Management' },
        { id: 8, text: 'Tickets' },
        { id: 9, text: 'Action History' }
    ],
    AdminMenus: [
        { id: 0, text: 'Profile Settings' },
        { id: 1, text: 'Company Profile' },
        { id: 2, text: 'Company Settings' },
        { id: 3, text: 'Company Users' },
        { id: 4, text: 'Platform Groups and Users' },
        { id: 6, text: 'Subscriptions & services' },
        { id: 7, text: 'Insfrastructures Management' },
        { id: 8, text: 'Tickets' },
        { id: 9, text: 'Action History' }
    ],
    AccountUserMenu: [
        { id: 0, text: 'Profile Settings' },
        { id: 1, text: 'Company Profile', path: 'company-profile' },
        { id: 2, text: 'Finance' },
        { id: 3, text: 'Subscriptions & services' },
        { id: 4, text: 'Action History' }
    ],
    NormalUserMenu: [
        { id: 0, text: 'Profile Settings' },
        { id: 1, text: 'Subscriptions & services' },
        { id: 2, text: 'Insfrastructures Management' },
        { id: 3, text: 'Tickets' },
        { id: 4, text: 'Action History' }
    ],
    UserTypes: [
        { id: 0, name: 'Super Admin' },
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Account User' },
        { id: 3, name: 'Normal User' }
    ]
};

const getters = {
    // getMenuItems: (state) => {
    //     return state.SuperAdminMenus;        
    // },
    getMenuItems(state) {
        let UserType = store.getters.getUserType;
        // alert(UserType);
        if (UserType == 'Super Admin') {
            return state.SuperAdminMenus;
            // return 'hello';
        } else if (UserType == 'Admin') {
            return state.AdminMenus;
        } else if (UserType == 'Account User') {
            return state.AccountUserMenu;
        } else if (UserType == 'Normal User') {
            return state.NormalUserMenu;
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
