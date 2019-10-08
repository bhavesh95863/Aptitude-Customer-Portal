<template>
  <v-alert v-if="getAlertMessage" :type="getAlertType">{{getAlertMessage}}</v-alert>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "Alert",
  computed: mapGetters(['getAlertType', 'getAlertMessage']),
  methods: {
      ...mapActions({
          clearAlert: 'clear' 
      })
  },
  watch: {
    $route (){
        // clear alert on location change
        this.clearAlert();
    }
  } 
};
</script>
