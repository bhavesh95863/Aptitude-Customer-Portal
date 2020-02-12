<template>
  <open-api v-if="getOpenApi" :api="getOpenApi" :query-params="queryParams" :headers="headers"></open-api>
</template>


<script>
import { mapGetters } from "vuex";
import OpenApi from "@/components/openapis/OpenApi";

export default {
  name: "OpenApiDemo",
  components: {
    OpenApi
  },
  computed: {
    ...mapGetters(["getOpenApi"])
  },
  data: () => ({
    queryParams: {
      userId: "john_doe",
      operationId: "postGeocode"
    },
    headers: {
      api_key: "my_api_key"
    }
  })
};
</script>