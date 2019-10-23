<template>
  <div>
    <v-overlay :value="getOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Loader",
  computed: mapGetters(["getOverlay"]),
  mounted() {
    this.enableInterceptor();
  },
  methods: {
    ...mapActions(["showLoader", "hideLoader"]),
    enableInterceptor() {
      axios.interceptors.request.use(
        config => {
          this.showLoader();
          return config;
        },
        error => {
          this.showLoader();
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        response => {
          this.hideLoader();
          return response;
        },
        error => {
          this.hideLoader();
          return Promise.reject(error);
        }
      );
    },
    disableInterceptor() {
      axios.interceptors.request.eject(this.axiosInterceptor);
    }
  }
};
</script>
