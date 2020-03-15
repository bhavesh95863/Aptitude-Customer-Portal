<template>
  <div>
    <open-api
      v-if="getOpenApi"
      :api="getOpenApi"
      :query-params="queryParams"
      operation="create_aws_instances_create_post"
      :headers="headers"
    ></open-api>
  </div>
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
      // operationId: "addPet"
      // operationId: "addPet"
      // operationId: "findPetsByStatus"
      operationId: "create_aws_instances_create_post"
    },
    headers: {
      api_key: "my_api_key"
    }
  })
};
</script>