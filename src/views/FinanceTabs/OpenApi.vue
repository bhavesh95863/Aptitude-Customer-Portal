<template>
  <div>
    <!-- <p>{{getOpenApi}}</p> -->
    <open-api v-if="getOpenApi" :api="getOpenApi" :query-params="queryParams" :headers="headers"></open-api>
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
      operationId: "add_contact_check_add_contact_post"
    },
    headers: {
      api_key: "my_api_key"
    }
  })
};
</script>