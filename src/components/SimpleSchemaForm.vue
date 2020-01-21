<template>
  <v-card class="mx-auto">
    <v-card-title>Simple Schema Form</v-card-title>
    <v-card-text>
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";

export default {
  name: "SimpleSchemaForm",
  data() {
    return {
      model: {
        id: 1,
        name: "John Doe",
        password: "J0hnD03!x4",
        skills: ["Javascript", "VueJS"],
        email: "john.doe@gmail.com",
        status: true
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "ID (disabled text field)",
            model: "id",
            readonly: true,
            disabled: true
          },
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            placeholder: "Your name",
            featured: true,
            required: true
          },
          {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            required: true,
            hint: "Minimum 6 characters",
            validator: VueFormGenerator.validators.string
          },
          {
            type: "select",
            label: "Skills",
            model: "skills",
            values: ["Javascript", "VueJS", "CSS3", "HTML5"]
          },
          {
            type: "input",
            inputType: "email",
            label: "E-mail",
            model: "email",
            placeholder: "User's e-mail address"
          },
          {
            type: "checkbox",
            label: "Status",
            model: "status",
            default: true
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    };
  }
};
</script>