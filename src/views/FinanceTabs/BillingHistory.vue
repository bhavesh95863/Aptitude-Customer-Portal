<template>
  <div id="containerabcd" class="container mb-3 mt-3"></div>
</template>


<script>
import VueFormJsonSchema from "vue-form-json-schema";

export default {
  name: "BillingHistory",
  mounted() {
    var schema = { type: "boolean" };
    var BrutusinForms = brutusin["json-forms"];
    var bf = BrutusinForms.create(schema);
    var container = document.getElementById("containerabcd");
    bf.render(container);
  }
};
</script>