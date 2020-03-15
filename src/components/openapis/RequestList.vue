<template lang="html">
    <div  v-if="selectedEntry" >
      <p>{{this.selectedEntry.path}}</p>
      <p>{{getApiPath}}</p>
      <p>{{this.buttons}}</p>
      <div v-for="(parameter, i) in this.buttons" :key="i">
        
      <v-btn class="ma-2" tile color="indigo" :key="i" :to="'/form/'+parameter.btn_link" dark>{{parameter.btn_label}}</v-btn>
        
      </div>
      <!-- <p>{{this.datagrid}}</p> -->
      <!-- <p>{{this.headers}}</p> -->
      <!-- <p>{{this.selectedEntry["responses"]["200"]["content"]["application/json"]["schema"]["properties"]["result"]["items"]["properties"]}}</p> -->
      <!-- <p v-for="item in this.selectedEntry["responses"]["200"]["content"]["application/json"]["schema"]["properties"]["result"]["items"]["properties"]" :key="{{item}}">
        {{item}}  - {{item.title}}

      </p> -->
      <v-card-title>
      Super Admin
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchSuperUsers"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="datagrid" :search="searchSuperUsers"></v-data-table>
    </div>
</template>

<script>
// import VJsonschemaForm from "@koumoul/vuetify-jsonschema-form";
// import toJsonSchema from "@openapi-contrib/openapi-schema-to-json-schema";
// import VueOpenapiForm from "@/components/appscode/components/VueOpenapiForm";
// import Schemas from "@/components/appscode/json-schema";
// import SchemaModel from "@/components/appscode/components/SchemaModel";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: ["selectedEntry", "currentRequest", "api"],
  components: {
    //  VJsonschemaForm,
    // SchemaModel
  },
  computed: {
    ...mapGetters([
      "getCustomerEmail",
      "getLoggedIn",
      "getMenuItems",
      "getOpenApiTags",
      "getOpenApi",
      "getApiPath"
    ])
  },
  data() {
    return {
      searchSuperUsers: "",
      // jsonSchemas: Schemas,
      // selectedJsonSchema: Schemas[0],
      // jsonSchema: {},
      // model: {},
      // formTitle: "ok",
      // modifiedSchema: false
      datagrid: [],
      headers: [],
      buttons: []
      // headers: [
      //   { text: "User Id", value: "user_id" },
      //   { text: "Firstname", value: "first_name" },
      //   { text: "Lastname", value: "last_name" },
      //   { text: "Status", value: "status" },
      //   { text: "Role", value: "user_role" }
      // ]
    };
    // return {
    //   dataObject: {},
    //   formValid: false,
    //   JsonSchema: "",
    //   options: {
    //     debug: false,
    //     disableAll: false,
    //     autoFoldObjects: true
    //   }
    // };
  },
  created() {
    Object.entries(
      this.selectedEntry["responses"]["200"]["content"]["application/json"][
        "schema"
      ]["properties"]["result"]["items"]["properties"]
    ).forEach(element => {
      // console.log(element[0] + );
      this.headers.push({ text: element[1]["title"], value: element[0] });
    });

    const data = {
      jsonrpc: this.selectedEntry["requestBody"]["content"]["application/json"][
        "schema"
      ]["properties"]["jsonrpc"]["example"],
      id: this.selectedEntry["requestBody"]["content"]["application/json"][
        "schema"
      ]["properties"]["id"]["example"],
      method: this.selectedEntry["requestBody"]["content"]["application/json"][
        "schema"
      ]["properties"]["method"]["example"],
      params: this.selectedEntry["requestBody"]["content"]["application/json"][
        "schema"
      ]["properties"]["params"]["properties"]
    };
    this.datagrid = data;
    const headers = { "Access-Control-Allow-Origin": true };
    const httpRequest = {
      method: this.selectedEntry.method,
      url: "http://agw.aptitude.cloud" + this.selectedEntry.path,
      data,
      headers
    };
    axios(httpRequest);
    const respo = {
      jsonrpc: "2.0",
      id: 0,
      result: {
        id: -1,
        name: "bhavesh",
        phones: [
          {
            type: "mobile",
            name: "my mobile",
            phone: "9999999999"
          }
        ],
        emails: [
          {
            account: "gmail",
            name: "my email",
            email: "asd@gmail.com"
          }
        ],
        notes: "sfdsfds"
      }
    };
    const temp_grid = [];
    Object.entries(respo["result"]).forEach(element => {
      if (typeof element[1] == "object") {
        // console.log(element[0] + " " + element[1][0]["name"]);
        temp_grid[element[0]] = element[1][0]["name"];
      } else {
        // console.log(element[0] + " " + element[1]);
        temp_grid[element[0]] = element[1];
        // this.datagrid.push({element[0]:element[1]});
      }
    });
    this.datagrid = [temp_grid];
    // console.log(respo);
    //for adding button
      this.buttons.push({ "btn_label": "Static", "btn_path": "check/add_contact", "btn_link": "add_contact_check_add_contact_post" })
      this.getApiPath.forEach(p => {
        console.log(this.selectedEntry.path)
        //console.log(p[0])
        if(p[0].indexOf(this.selectedEntry.path.substring(1)+'/') === 0 && p[0].split('/').length == 3)
        {
          const dict = {}
          dict.btn_label = p[1]
          dict.btn_path = p[0]
          dict.btn_link = p[2]
          this.buttons.push(dict)
        }
      })
      


  },
  methods: {
    onValid() {
      /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
      // console.log(JSON.stringify(this.model, null, 2));
      // const data = this.model;
      // const headers = { "Access-Control-Allow-Origin": true };
      // const httpRequest = {
      //   method: this.selectedEntry.method,
      //   url: "http://agw.aptitude.cloud" + this.selectedEntry.path,
      //   data,
      //   headers
      // };
      // return axios(httpRequest);
    }
  }
};
</script>

<style lang="css">
</style>
