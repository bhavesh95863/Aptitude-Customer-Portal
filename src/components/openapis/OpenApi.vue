<template>
  <div class="openapi">
    <!-- <p>{{tags}}</p> -->
    <!-- <md-list class="md-dense" ref="menu">
          <md-list-item v-for="(entries, tag) in tags" :key="tag" md-expand-multiple>
            <span class="md-title">{{tag}}</span>
            <md-list-expand>
              <md-list>
                <md-list-item
                  v-for="(entry, i) in entries"
                  :key="i"
                  @click.native="select(entry)"
                  style="cursor:pointer"
                >
                  <md-subheader
                    class="md-title"
                    :class="{'md-accent':selectedEntry === entry}"
                    v-html="entry.path.replace(/\//g,'<b>/</b>')"
                  ></md-subheader>
                  <md-subheader :md-theme="entry.method" class="md-primary">{{entry.method}}</md-subheader>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
    </md-list>-->

    <v-col v-if="selectedEntry">
      <v-col class="md-transparent" style="margin-top:-14px">
        <!-- v-if="api.servers && api.servers.length" -->
        <h2 class="title">{{selectedEntry.title || selectedEntry.summary}}</h2>
        <!-- <p>{{selectedEntry}}</p> -->
        <request-form :selectedEntry="selectedEntry" :currentRequest="currentRequest"></request-form>

        <v-btn @click="request">Execute</v-btn>

        <!-- <md-layout md-column md-flex="60">
                <h2>Response</h2>
                <response-display
                  v-if="currentResponse"
                  :entry="selectedEntry"
                  :response="currentResponse"
                ></response-display>
        </md-layout>-->
      </v-col>
    </v-col>
  </div>
</template>

<style scoped>
.openapi {
  position: relative;
  overflow-x: hidden;
  height: 100%;
}

.openapi #request-form {
  padding: 16px;
}

.openapi .md-table .md-table-cell.md-has-action .md-table-cell-container {
  display: inherit;
}

.schema-dialog .md-dialog,
.examples-dialog .md-dialog {
  min-width: 800px;
}

.openapi .entry-description {
  margin: 0;
}
</style>

<script>
import Vue from "vue";
import marked from "marked";
import RequestForm from "./RequestForm.vue";
// import ResponseDisplay from "./ResponseDisplay.vue";
// import ResponsesTable from "./ResponsesTable.vue";
// import ParametersTable from "./ParametersTable.vue";
// import SchemaView from "./SchemaView.vue";
// import VueMaterial from "vue-material";
import deref from "json-schema-ref-parser";
import stringify from "json-stringify-pretty-compact";
import axios from "axios";

// Vue.use(VueMaterial);

export default {
  name: "open-api",
  components: {
    RequestForm
    // ResponseDisplay
    // ResponsesTable,
    // ParametersTable,
    // SchemaView
  },
  props: ["api", "headers", "queryParams"],
  data: () => ({
    selectedEntry: null,
    currentSchema: " ",
    currentExamples: {},
    currentFields: {},
    currentRequest: {
      contentType: "",
      body: "",
      params: {}
    },
    currentResponse: null,
    tags: {}
  }),
  // mounted: function() {
  //   if (this.$refs.menu.$children.length)
  //     this.$refs.menu.$children[0].toggleExpandList();
  // },
  created() {
    getTags(this.api).then(tags => {
      // var str = JSON.stringify(tags, null, 2);
      for (const tagitem in tags) {
        var tagsItem = tags[tagitem];
        for (const tagApi in tagsItem) {
          if (this.queryParams.operationId == tagsItem[tagApi].operationId) {
            /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
            // console.log(JSON.stringify(tagsItem[tagApi], null, 2));
            this.reset(tagsItem[tagApi]);
            this.selectedEntry = tagsItem[tagApi];
          }
        }
      }
      /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
      // console.log(str);
      this.tags = tags;
    });
    // Vue.material.registerTheme({
    //   get: {
    //     primary: "blue"
    //   },
    //   post: {
    //     primary: "green"
    //   },
    //   put: {
    //     primary: "orange"
    //   },
    //   patch: {
    //     primary: "orange"
    //   },
    //   delete: {
    //     primary: "red"
    //   }
    // });
  },
  methods: {
    marked,
    stringify,
    reset(entry) {
      const newParams = {};
      (entry.parameters || []).forEach(p => {
        newParams[p.name] =
          (p.in === "query" && this.queryParams && this.queryParams[p.name]) ||
          (p.in === "header" && this.headers && this.headers[p.name]) ||
          null;
        if (!newParams[p.name]) {
          if (p.schema && p.schema.enum) {
            newParams[p.name] = p.schema.enum[0];
          }
          if (p.schema && p.schema.type === "array") {
            newParams[p.name] = [];
          }
          if (p.example) {
            newParams[p.name] = p.example;
          }
        }
      });
      this.currentRequest.params = newParams;
      if (entry.requestBody) {
        this.currentRequest.contentType = entry.requestBody.selectedType;
        const example =
          entry.requestBody.content[this.currentRequest.contentType].example;
        this.currentRequest.body =
          typeof example === "string" ? example : stringify(example, null, 2);
      }
    },
    select(entry) {
      /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
      // console.log(JSON.stringify(entry, null, 2));
      this.reset(entry);
      this.selectedEntry = entry;
    },
    openSchemaDialog(schema) {
      this.currentSchema = schema;
      this.$refs.schemaDialog.open();
    },
    openExamplesDialog(examples) {
      this.currentExamples = examples;
      this.$refs.examplesDialog.open();
    },
    openFieldsDialog(fields) {
      this.currentFields = fields;
      this.$refs.fieldsDialog.open();
    },
    request() {
      this.currentResponse = null;
      fetch(this.currentRequest, this.selectedEntry, this.api).then(
        res => {
          this.currentResponse = res;
        },
        res => {
          this.currentResponse = res;
        }
      );
    }
  }
};

/*
 * HTTP requests utils
 */

function fetch(request, entry, api) {
  let params = Object.assign(
    {},
    ...(entry.parameters || [])
      .filter(
        p =>
          p.in === "query" &&
          (p.schema.type === "array"
            ? request.params[p.name].length
            : request.params[p.name])
      )
      .map(p => ({
        // TODO : join character for array should depend of p.style
        [p.name]:
          p.schema.type === "array"
            ? request.params[p.name].join(",")
            : request.params[p.name]
      }))
  );
  let headers = Object.assign(
    {},
    ...(entry.parameters || [])
      .filter(
        p =>
          p.in === "header" &&
          (p.schema.type === "array"
            ? request.params[p.name].length
            : request.params[p.name])
      )
      .map(p => ({
        // TODO : join character for array should depend of p.style
        [p.name]:
          p.schema.type === "array"
            ? request.params[p.name].join(",")
            : request.params[p.name]
      }))
  );
  const data = params;
  const httpRequest = {
    method: entry.method,
    url:
      api.servers.length &&
      api.servers[0].url +
        entry.path.replace(/{(\w*)}/g, (m, key) => {
          return request.params[key];
        }),
    data,
    headers
  };
  if (entry.requestBody) {
    // console.log(JSON.stringify(entry.requestBody));
    httpRequest.headers["Content-type"] = entry.requestBody.selectedType;
    httpRequest.body = request.body;
  }

  // console.log(JSON.stringify(httpRequest));
  return axios(httpRequest);
  // return Vue.http(httpRequest);
}

/*
 * Tags management utils
 */

const defaultStyle = {
  query: "form",
  path: "simple",
  header: "simple",
  cookie: "form"
};

function processContent(contentType) {
  // Spec allow examples as an item or an array. In the API or in the schema
  // we always fall back on an array
  if (contentType.schema) {
    contentType.examples = contentType.examples || contentType.schema.examples;
    contentType.example = contentType.example || contentType.schema.example;
  }

  if (contentType.example) {
    contentType.examples = [contentType.example];
  }
}

async function getTags(api) {
  const derefAPI = await deref.dereference(api);
  const tags = {};
  Object.keys(derefAPI.paths).forEach(path => {
    Object.keys(derefAPI.paths[path])
      .filter(
        method =>
          [
            "get",
            "put",
            "post",
            "delete",
            "options",
            "head",
            "patch",
            "trace"
          ].indexOf(method.toLowerCase()) !== -1
      )
      .forEach(method => {
        const entry = derefAPI.paths[path][method];
        entry.method = method;
        entry.path = path;
        // Filling tags entries
        entry.tags = entry.tags || [];
        if (!entry.tags.length) {
          entry.tags.push("No category");
        }
        entry.tags.forEach(tag => {
          tags[tag] = tags[tag] || [];
          tags[tag].push(entry);
        });

        entry.parameters = entry.parameters || [];
        if (derefAPI.paths[path].parameters) {
          entry.parameters = derefAPI.paths[path].parameters.concat(
            entry.parameters
          );
        }
        if (entry.parameters) {
          entry.parameters.forEach(p => {
            p.style = p.style || defaultStyle[p.in];
            p.explode = p.explode || p.style === "form";
            p.schema = p.schema || { type: "string" };
          });
        }
        if (entry.requestBody) {
          if (entry.requestBody.content) {
            Vue.set(
              entry.requestBody,
              "selectedType",
              Object.keys(entry.requestBody.content)[0]
            );
            entry.requestBody.required = true;
            Object.values(entry.requestBody.content).forEach(contentType =>
              processContent(contentType, api)
            );
          }
        }

        // Some preprocessing with responses
        entry.responses = entry.responses || {};
        Object.values(entry.responses).forEach(response => {
          if (response.content) {
            // preselecting responses mime-type
            Vue.set(response, "selectedType", Object.keys(response.content)[0]);
            Object.values(response.content).forEach(contentType =>
              processContent(contentType, api)
            );
          }
        });
      });
  });
  /* eslint no-console: ["error", { allow: ["warn", "log"] }] */
  // console.log(tags);
  return tags;
}
</script>