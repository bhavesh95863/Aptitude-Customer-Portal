<template lang="html">
    <div  v-if="selectedEntry" >
      <p>{{this.data}}</p>
      <p>{{this.selectedEntry["responses"]["200"]["content"]["application/json"]["schema"]["properties"]["result"]["items"]["properties"]}}</p>
      <!-- <p v-for="item in this.selectedEntry["responses"]["200"]["content"]["application/json"]["schema"]["properties"]["result"]["items"]["properties"]" :key="{{item}}">
        {{item}}  - {{item.title}}

      </p> -->
      <!-- <v-card-title>
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
    <v-data-table :headers="headers" :items="users.super_admin" :search="searchSuperUsers"></v-data-table> -->
    </div>
</template>

<script>
// import VJsonschemaForm from "@koumoul/vuetify-jsonschema-form";
// import toJsonSchema from "@openapi-contrib/openapi-schema-to-json-schema";
// import VueOpenapiForm from "@/components/appscode/components/VueOpenapiForm";
// import Schemas from "@/components/appscode/json-schema";
// import SchemaModel from "@/components/appscode/components/SchemaModel";
import axios from "axios";

export default {
  props: ["selectedEntry", "currentRequest", "api"],
  components: {
    //  VJsonschemaForm,
    // SchemaModel
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
      datagrid: "",
      headers: [
        { text: "User Id", value: "user_id" },
        { text: "Firstname", value: "first_name" },
        { text: "Lastname", value: "last_name" },
        { text: "Status", value: "status" },
        { text: "Role", value: "user_role" }
      ]
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
            phone: "9999999999"
          }
        ],
        emails: [
          {
            account: "gmail",
            email: "asd@gmail.com"
          }
        ],
        notes: "sfdsfds"
      }
    };
    this.datagrid = respo;
    // console.log(respo);
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
