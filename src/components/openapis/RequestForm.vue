<template lang="html">
  <form novalidate @submit.stop.prevent="submit" v-if="selectedEntry" id="request-form" class="pa-0">
    <!-- <md-input-container v-if="selectedEntry.requestBody">
      <label for="payload">Payload ({{selectedEntry.requestBody.selectedType}})</label>
      <md-textarea name="payload" v-model="currentRequest.body"></md-textarea>
    </md-input-container> -->

    <div v-for="(parameter, i) in selectedEntry.parameters" :key="i">
      <!-- <md-input-container v-if="(parameter.schema.type === 'string' || parameter.schema.type === 'integer' || parameter.schema.type === 'number') && !parameter.schema.enum">
        <label>{{parameter.name}}</label>
        <md-input v-model="currentRequest.params[parameter.name]" :type="parameter.schema.type === 'string' ? 'text' : 'number'"></md-input>
      </md-input-container> -->

    
      <v-col class="pa-0" v-if="(parameter.schema.type === 'string' || parameter.schema.type === 'integer' || parameter.schema.type === 'number') && !parameter.schema.enum">
      <v-text-field
        v-bind:label="parameter.name"
        v-model="currentRequest.params[parameter.name]"
        :type="parameter.schema.type === 'string' ? 'text' : 'number'"
      />
      </v-col>

      <!-- <md-input-container v-if="parameter.schema.enum">
        <label>{{parameter.name}}</label>
        <md-select v-model="currentRequest.params[parameter.name]">
          <md-option v-for="val in parameter.schema.enum" :key="val" :value="val">{{val}}</md-option>
        </md-select>
      </md-input-container> -->
      <v-col class="pa-0" v-if="parameter.schema.enum">
        <v-select :items="parameter.schema.enum" v-bind:label="parameter.name"></v-select>
      </v-col>


      <!-- <md-input-container v-if="parameter.schema.type === 'array' && parameter.schema.items.enum">
        <label>{{parameter.name}}</label>
        <md-select v-model="currentRequest.params[parameter.name]" multiple>
          <md-option v-for="val in parameter.schema.items.enum" :key="val" :value="val">{{val}}</md-option>
        </md-select>
      </md-input-container> -->
      <v-col v-if="parameter.schema.type === 'array' && parameter.schema.items.enum" class="pa-0">
        <v-select multiple :items="parameter.schema.items.enum" v-bind:label="parameter.name"></v-select>  
      </v-col>

      <!-- <md-chips v-model="currentRequest.params[parameter.name]" :md-input-placeholder="parameter.name" :md-input-type="parameter.schema.items.type" v-if="parameter.schema.type === 'array' && !parameter.schema.items.enum">
        <template scope="chip">{{ chip.value }}</template>
      </md-chips> -->
      <v-col class="pa-0" v-model="currentRequest.params[parameter.name]" :md-input-placeholder="parameter.name" :md-input-type="parameter.schema.items.type" v-if="parameter.schema.type === 'array' && !parameter.schema.items.enum">
        <v-chip class="ma-2"> {{ chip.value }} </v-chip>
      </v-col>


      <!-- <md-checkbox v-if="parameter.schema.type === 'boolean'" v-model="currentRequest.params[parameter.name]">{{parameter.name}}</md-checkbox> -->
      <v-checkbox v-if="parameter.schema.type === 'boolean'" v-model="currentRequest.params[parameter.name]" v-bind:label="parameter.name"></v-checkbox>

    </div>
  </form>
</template>

<script>
export default {
  props: ["selectedEntry", "currentRequest"]
};
</script>

<style lang="css">
</style>
