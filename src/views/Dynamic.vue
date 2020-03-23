<template>
  <div>
    <p>{{ $route.params }}</p>
    <!-- <p>{{ queryParams.operationId }}</p> -->
    <!-- <open-api
      v-if="getOpenApi"
      :api="getOpenApi"
      :query-params="queryParams"
      :operation="$route.params.id"
      :headers="headers"
      :key="$route.params.id"
    ></open-api>-->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
// import OpenApi from "@/components/openapis/OpenApi";

export default {
  name: "FormPage",
  components: {
    // OpenApi
  },
  computed: {
    ...mapGetters(["getOpenApi"])
  },
  data: () => ({
    queryParams: {
      userId: "john_doe"
      // operationId: "addPet"
      //   operationId: "addPet"
      //   operationId: this.$route.params.id

      //   operationId: "add_contact_check_add_contact_post"
    },
    headers: {
      api_key: "my_api_key"
    }
  })
};
</script>