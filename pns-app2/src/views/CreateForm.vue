<template>
  <v-app>
    <v-app-bar color="dark-white" dark max-height="70">
      <v-toolbar-title>Admin</v-toolbar-title><v-spacer></v-spacer>
      <v-btn color="primary" to="/admin">Log Out</v-btn>
    </v-app-bar>
    <v-navigation-drawer app>
      <v-divider length="0">h</v-divider>

      <v-list dense nav>

        <v-divider></v-divider>

        <v-list-item v-for="item in ite" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="text-align: left; font-weight: bold">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid>
      <v-form @submit.prevent="submitFields">
        <v-overflow-btn
          class="my-2"
          v-model="selectedItem"
          :items="poly1"
          label="Select Part Number"
          @change="partSelected"
          editable
          item-value="text"
        ></v-overflow-btn>
        <v-col md="5">
          <v-text-field
            v-model="title"
            label="Enter the Title of Form"
            outlined
          ></v-text-field>
        </v-col>
        <v-btn @click="addField(), (d = true)">Add Input</v-btn>
        <v-col md="5">
          <div v-for="(field, index) in fields" :key="index">
            <v-text-field
              disabled
              solo
              :label="'Input' + (index + 1)"
            ></v-text-field>
            <v-text-field
              solo
              v-model="field.value"
              :label="'For Label' + (index + 1)"
            ></v-text-field>
          </div>
        </v-col>
        <v-btn
          v-if="d"
          type="submit"
          @click="(d = false), (snackbar = true), submitFields()"
          >Submit</v-btn
        >
        <v-snackbar v-model="snackbar">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="(snackbar = false), Clearfields()"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-btn v-if="d" @click="Clearfields(), (d = false)">Clear</v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      selectedItem: "",
      title: "",
      snackbar: false,
      text: `Form Created Successful`,
      fields: [],
      real: [],
      poly: [],
      poly1: [],
      multilist: [],
      finallist: [],
      resultArray: [],
      PolyData: {},
      RealEle: [],
      userdataupdate: [],
      Postuserdata1: [],
      FormData: {
        partno: "",
        formdataarray: [],
      },
      samformdata: [],
      SamFormData: {
        FormD: "",
      },

      d: false,
      UData: "",
      fieldValues: [],
      sam: false,
      drawer: null,
      ite: [
        { title: "PNS Generator", icon: "mdi-numeric", to: "/pnsapp" },
        { title: "Create Form", icon: "mdi-form-select", to: "/CreateForm" },
        { title: "View", icon: "mdi-view-list", to: "/PNSview" },
      ],
    };
  },
  mounted() {
    this.admindata();
    this.getdata();
    this.realdata();
  },
  methods: {
    partSelected() {
      let index = this.poly1.indexOf(this.selectedItem);
      let postuserdata = this.userdataupdate[index].UserData;
      this.Postuserdata1 = postuserdata;
      let realarr = this.real[index].realtime[0];
      this.RealEle = realarr;
    },
    addField() {
      this.fields.push({ value: "" });
    },
    Clearfields() {
      this.fields = [];
    },
    submitFields() {
      this.fieldValues = this.fields.map((field) => field.value);

      this.FormData.partno = this.selectedItem;
      this.FormData.formdataarray = this.fieldValues;
      this.AddFormData();
    },

    async AddFormData() {
      let samdata = {
        sam: [],
      };
      samdata.sam.push(this.FormData.partno);

      samdata.sam.push(this.title);

      for (let i = 0; i < this.FormData.formdataarray.length; i++) {
        samdata.sam.push(this.FormData.formdataarray[i]);
      }

      samdata.sam.push(this.RealEle);
      samdata.sam.push(this.Postuserdata1);

      this.SamFormData.FormD = this.samformdata;
      await axios
        .post("http://20.55.43.53:8083/api/items5", samdata)
        .then((result) => {
          location.reload();
        })
        .catch((err) => {});
    },

    clear() {
      this.multilist = [];
    },
    async admindata() {
      axios
        .get("http://20.55.43.53:8083/api/items")
        .then((result) => {
          for (let i = 0; i < result.data.length; i++) {
            this.poly[i] = result.data[i].Sdata;
          }

          this.sam = true;
          this.poly1 = this.poly;
        })
        .catch((err) => {});
      return this.poly;
    },

    async getdata() {
      axios
        .get("http://20.55.43.53:8083/api/items2")
        .then((result) => {
          this.userdataupdate = result.data;
        })
        .catch((err) => {});
    },

    async postdata() {
      await axios
        .post("http://20.55.43.53:8083/api/items3", this.PolyData)
        .then((result) => {})
        .catch((err) => {});
    },
    async realdata() {
      await axios
        .get("http://20.55.43.53:8083/api/items6")
        .then((result) => {
          this.real = result.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
