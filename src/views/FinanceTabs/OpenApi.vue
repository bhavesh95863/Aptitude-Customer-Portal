<template>
  <open-api
    v-if="jsonApi"
    :api="jsonApi"
    md-theme="\'default\'"
    :query-params="queryParams"
    :headers="headers"
  ></open-api>
</template>


<script>
import OpenApi from "@/components/openapis/OpenApi";
import jsonApi from "@/api-docs.json";
// import OpenApi from "vue-openapi";
// import RequestForm from "vue-openapi/src/RequestForm";
// import jsonApi from "@/api-docs.json";
// import VueFormJsonSchema from "vue-form-json-schema";

export default {
  name: "OpenApiDemo",
  components: {
    OpenApi
  },
  data: () => ({
    jsonApi: jsonApi,
    queryParams: {
      userId: "john_doe",
      operationId: "postGeocode"
    },
    // Need to pass this id to component
    // operationId: "postGeocode"
    // operationId: "getPetById"
    headers: {
      api_key: "my_api_key"
    }
  })
};
</script>