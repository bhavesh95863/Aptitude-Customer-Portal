import { openapi } from '../../api';
import deref from "json-schema-ref-parser";
const state = {
    open_api: '',
    tags: ''
};
const getters = {
    getOpenApi: state => state.open_api,
    getOpenApiTags: state => state.tags
};
const actions = {

    /**
     * call server api to get openapi spec
     * once get open api spec, call getTags to process api and extract paths from the openapi spec
     */
    async initOpenApi({ dispatch, commit }) {
        return openapi.getOpenApifromApi()
            .then(response => {
                // return response
                // if (typeof response !== 'undefined' && response.status == 200) {
                commit('setOpenApi', response);
                dispatch('getTags', response, { root: true });
                //     return true;
                // }
            })
    },

    /**
     * 
     * @param {*} param0 
     * @param {*} api 
     * 
     * used to process openapi spec and extract paths from it.
     */
    async getTags({ commit }, api) {

        const derefAPI = await deref.dereference(api);
        const tags = {};
        Object.keys(derefAPI.paths).forEach(path => {
            Object.keys(derefAPI.paths[path])
                .filter(
                    method =>
                        [
                            "get",
                            "put",
                            "post",
                            "delete",
                            "options",
                            "head",
                            "patch",
                            "trace"
                        ].indexOf(method.toLowerCase()) !== -1
                )
                .forEach(method => {
                    const entry = derefAPI.paths[path][method];
                    entry.method = method;
                    entry.path = path;
                    // Filling tags entries
                    entry.tags = entry.tags || [];
                    if (!entry.tags.length) {
                        entry.tags.push("No category");
                    }
                    entry.tags.forEach(tag => {
                        tags[tag] = tags[tag] || [];
                        tags[tag].push(entry);
                    });

                });
        });
        /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
        // console.log(JSON.stringify(tags));

        // get pathname in mypaths arreay
        const mypaths = [];
        for (const tagitem in tags) {
            var tagsItem = tags[tagitem];
            for (const tagApi in tagsItem) {
                if (!tagsItem[tagApi].parameters)
                    mypaths.push([tagsItem[tagApi].path.substring(1), tagsItem[tagApi].summary, tagsItem[tagApi].operationId]);
            }
        }

        // split mypaths array to remove / and explode
        // console.log(mypaths);
        // const finalMenu = [];
        let openapimenu_test = [];
        mypaths.forEach(menuPath => {
            const path = menuPath[0].split("/");
            if (path.length > 2)
                return;
            path.push(menuPath[1]);
            path.push(menuPath[2]);
            if (path[0].length > 0) openapimenu_test.push(path);
        });


        // console.log(JSON.stringify(openapimenu_test));
        console.log(openapimenu_test);
        //iterate openapimenu_test to make parent child paths
        let pathname = {};
        openapimenu_test.forEach(path => {
            if (typeof pathname[path[0]] == "undefined") {
                pathname[path[0]] = [[path[1], path[2], "mdi-account-edit", path[3]]];
            } else {
                pathname[path[0]].push([path[1].toString(), path[2], "mdi-account-edit", path[3]]);
            }
        });
        // final required object is ready

        /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
        // console.log(JSON.stringify(pathname));

        // commit paths object so that it can be called from navigation component.
        commit('setTags', pathname);
    },
};

const mutations = {
    setOpenApi: (state, OpenAPi) => {
        state.open_api = OpenAPi;
    },
    setTags: (state, tags) => {
        state.tags = tags;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};