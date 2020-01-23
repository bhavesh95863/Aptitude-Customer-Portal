<template>
  <v-form @submit.prevent="onSubmit" :disabled="submitStatus === 'PENDING'">
    <vue-form-json-schema
      v-model="model"
      :schema="schema"
      :ui-schema="uiSchema"
      :options="options"
      v-on:state-change="onChangeState"
      v-on:validated="onValidated"
      data-app
    ></vue-form-json-schema>
    <v-card-actions>
      <v-btn :disabled="submitStatus == 'PENDING'" type="submit">Create</v-btn>
    </v-card-actions>
  </v-form>
</template>



<script>
import VueFormJsonSchema from "vue-form-json-schema";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SimpleSchemaForm",
  components: {
    "vue-form-json-schema": VueFormJsonSchema
  },
  data() {
    return {
      submitStatus: null,
      model: {},
      state: {},
      options: {},
      valid: false,
      schema: {},
      uiSchema: {}
      // schema: {
      // options: {
      //   showValidationErrors: true,
      //   validate: true,
      //   validateOnLoad: false
      // },
      //   type: "object",
      //   required: ["type", "name", "email", "notify"],
      //   properties: {
      //     name: {
      //       type: "string",
      //       minLength: 5,
      //       maxLength: 10
      //     },
      //     email: {
      //       type: "string",
      //       format: "email"
      //     },
      //     type: {
      //       type: "string"
      //     },
      //     notify: {
      //       type: "boolean",
      //       const: true
      //     }
      //   }
      // },
      // uiSchema: [
      //   {
      //     component: "v-text-field",
      //     model: "name",
      //     errorOptions: {
      //       class: ["error-options"],
      //       attrs: {
      //         error: true,
      //         "error-messages": "This field is required"
      //       }
      //     },
      //     fieldOptions: {
      //       class: ["xs12"],
      //       on: ["input"],
      //       attrs: {
      //         placeholder: "Enter your fullame",
      //         label: "Name",
      //         disabled: false,
      //         readonly: false
      //       }
      //     }
      //   },
      //   {
      //     component: "v-text-field",
      //     model: "email",
      //     errorOptions: {
      //       class: ["error-options"],
      //       attrs: {
      //         error: true,
      //         "error-messages": "This field is required"
      //       }
      //     },
      //     fieldOptions: {
      //       class: ["xs12"],
      //       on: ["input"],
      //       attrs: {
      //         placeholder: "Enter your email id",
      //         label: "Email",
      //         disabled: false,
      //         readonly: false
      //       }
      //     }
      //   },
      //   {
      //     component: "v-select",
      //     model: "type",
      //     errorOptions: {
      //       class: ["error-options"],
      //       attrs: {
      //         error: true,
      //         "error-messages": "This field is required"
      //       }
      //     },
      //     fieldOptions: {
      //       class: ["xs12"],
      //       on: ["input"],
      //       attrs: {
      //         placeholder: "Please select a audit type",
      //         label: "Audit Type",
      //         disabled: false,
      //         readonly: false,
      //         items: ["Audit 1", "Audit 2", "Audit 3"]
      //       }
      //     }
      //   },
      //   {
      //     component: "v-checkbox",
      //     model: "notify",
      //     errorOptions: {
      //       class: ["error-options"],
      //       attrs: {
      //         error: true,
      //         "error-messages": "Please select this to submit data."
      //       }
      //     },
      //     fieldOptions: {
      //       class: ["xs12"],
      //       on: ["change"],
      //       attrs: {
      //         placeholder: "Please select this to submit data..",
      //         label: "Notify Me",
      //         disabled: false
      //       }
      //     }
      //   }
      // ]
    };
  },
  methods: {
    ...mapActions(["getJsonSchema"]),
    InitJsonSchema() {
      setTimeout(() => {
        this.getJsonSchema()
          .then(schema => {
            this.options = schema.options;
            this.schema = schema.schema;
            this.uiSchema = schema.uiSchema;
          })
          .catch(() => {
            this.submitStatus = "ERROR";
          });
      });
    },
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
  },
  created() {
    this.InitJsonSchema();
  }
};
</script>