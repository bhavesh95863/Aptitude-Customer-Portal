<template>
  <!-- <div id="containerabcd" class="container mb-3 mt-3"></div> -->
  <div>
    <md-layout md-column md-flex="40">
      <h2>Request</h2>
      <request-form :selectedEntry="selectedEntry" :currentRequest="currentRequest"></request-form>
      <div>
        <md-button class="md-raised md-accent" @click.native="request">Execute</md-button>
      </div>
    </md-layout>
  </div>
  <!-- <open-api
    v-if="jsonApi"
    :api="jsonApi"
    md-theme="\'default\'"
    :query-params="queryParams"
    :headers="headers"
  ></open-api>-->
</template>


<script>
// import OpenApi from "vue-openapi";
import RequestForm from "vue-openapi/src/RequestForm";
import jsonApi from "@/api-docs.json";
// import VueFormJsonSchema from "vue-form-json-schema";

export default {
  name: "BillingHistory",
  components: {
    RequestForm
  },
  data: () => ({
    selectedEntry: null,
    currentRequest: {
      contentType: "",
      body: "",
      params: {}
    }
  })
  //   jsonApi: jsonApi,
  //   queryParams: {
  //     userId: "john_doe"
  //   },
  //   headers: {
  //     api_key: "my_api_key"
  //   }
  // }),
  // mounted() {
  //   var schema = { type: "boolean" };
  //   var BrutusinForms = brutusin["json-forms"];
  //   var bf = BrutusinForms.create(schema);
  //   var container = document.getElementById("containerabcd");
  //   bf.render(container);
  // }
};
</script>