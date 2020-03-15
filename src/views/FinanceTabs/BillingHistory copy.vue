<template>
  <div id="BillingHistory" class="container mb-3 mt-3">
    <vue-form-json-schema
      v-model="model"
      :schema="schema"
      :ui-schema="uiSchema"
      :options="options"
      v-on:state-change="onChangeState"
      v-on:validated="onValidated"
      data-app
    ></vue-form-json-schema>
  </div>
</template>


<script>
import VueFormJsonSchema from "vue-form-json-schema";

export default {
  name: "BillingHistory",
  components: {
    "vue-form-json-schema": VueFormJsonSchema
  },
  data() {
    return {
      model: {},
      state: {},
      options: {
        showValidationErrors: true,
        validate: true,
        validateOnLoad: true
      },
      valid: false,
      schema: {
        type: "object",
        required: ["type"],
        properties: {
          type: {
            type: "string"
          }
        }
      },
      uiSchema: [
        {
          component: "v-select",
          model: "type",
          errorOptions: {
            class: ["error-options"],
            attrs: {
              error: true,
              "error-messages": "This field is required"
            }
          },
          fieldOptions: {
            class: ["xs12"],
            on: ["input"],
            attrs: {
              placeholder: "Please select a audit type",
              label: "Audit Type",
              disabled: false,
              readonly: false,
              items: ["Audit 1", "Audit 2", "Audit 3"]
            }
          }
        }
      ]
    };
  },
  methods: {
    onChangeState(value) {
      this.state = value;
    },
    onValidated(value) {
      this.valid = value;
    },
    onSubmit() {
      this.options = {
        ...this.options,
        showValidationErrors: true
      };
    }
  }
};
</script>