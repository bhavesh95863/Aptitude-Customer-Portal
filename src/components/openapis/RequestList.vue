<template lang="html">
    <div  v-if="selectedEntry" >
      <p>{{this.selectedEntry.path}}</p>
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
      // jsonSchemas: Schemas,
      // selectedJsonSchema: Schemas[0],
      // jsonSchema: {},
      // model: {},
      // formTitle: "ok",
      // modifiedSchema: false
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
    const headers = { "Access-Control-Allow-Origin": true };
    const httpRequest = {
      method: this.selectedEntry.method,
      url: "http://agw.aptitude.cloud" + this.selectedEntry.path,
      data,
      headers
    };
    return axios(httpRequest);
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
