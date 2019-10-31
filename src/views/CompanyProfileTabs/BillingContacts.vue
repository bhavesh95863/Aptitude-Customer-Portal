<template>
  <v-card light flat class="mx-auto">
    <v-card-title>Billing Contacts</v-card-title>
    <v-card-text>
      <ContactForm contactType="Billing" />
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
</template>


<script>
import ContactForm from "../../components/ContactForm";

export default {
  name: "BillingContactTabs",
  components: {
    ContactForm
  }
};
</script>