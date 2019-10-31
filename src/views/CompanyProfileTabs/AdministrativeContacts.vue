<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Administrative Contacts</v-card-title>
    <v-card-text>
      <ContactForm contactType="Administrative" />
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
</template>


<script>
import ContactForm from "../../components/ContactForm";
export default {
  name: "AdministrativeContactTabs",
  components: {
    ContactForm
  }
};
</script>