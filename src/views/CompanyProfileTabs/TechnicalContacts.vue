<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Main Technical Contact</v-card-title>
    <v-card-text>
      <ContactForm contactType="Technical" />
    </v-card-text>
    <v-divider></v-divider>
    <!-- <v-card-title>Additional Technical Contacts</v-card-title>
    <v-card-text>
      <p class="subtitle-1">Technical Contact #2</p>
      <ContactForm />
    </v-card-text>-->
  </v-card>
</template>


<script>
import ContactForm from "../../components/ContactForm";

export default {
  name: "TechnicalContactsTab",
  components: {
    ContactForm
  }
};
</script>