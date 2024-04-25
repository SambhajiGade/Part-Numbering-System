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

        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="text-align: left; font-weight: bold"
              >{{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          :cols="card.flex"
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
            >
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title :inner-text.prop="card.title"></v-card-title>
                <v-card-subtitle
                  :inner-text.prop="card.partnumber"
                ></v-card-subtitle>
              </v-img>

              <v-card-actions>

                <v-dialog v-model="dialog1" persistent max-width="600px" :retain-focus="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="buttonClicked(index, card)"
                    >
                      Open
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <h1>{{ samG }}</h1>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Part Number"
                              v-model="polyM"
                              solo
                              filled
                              outlined
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col>
                          <div v-for="(i,index1) in InputDataArr" :key="index1">
                            <v-text-field
                              :label="i"
                              v-model="inputsarray[index1]"
                              solo
                              outlined
                             disabled
                            ></v-text-field>
                          </div>
                        </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog1 = !dialog1"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      samG: "",
      polyM: "",
      InputDataArr: [],
      pra: "",
      
      poly: [],
      dialog1: false,
      CardData: {},
      inputsarray:[],
      cards: [
      ],
      transparent: "rgba(255, 255, 255, 0)",
      items: [
        { title: "PNS Generator", icon: "mdi-numeric", to: "/pnsapp" },
        { title: "Create Form", icon: "mdi-form-select", to: "/CreateForm" },
        { title: "View", icon: "mdi-view-list", to: "/PNSview" },
      ],
    };
  },

  mounted() {
    this.admindata();
  },
  methods: {
    buttonClicked(index, card) {
      

      this.samG = this.cards[index].title;
      this.polyM = this.cards[index].partnumber;

      

      this.InputDataArr = [];
      for (let i = 2; i < this.CardData[index].sam.length-1; i++) {
        this.InputDataArr.push(this.CardData[index].sam[i]);
      }

      
    },
    async admindata() {
      axios
        .get("http://20.55.43.53:8083/api/items5")
        .then((result) => {
          

          let alldata = result.data;
          this.CardData = result.data;

          for (let i = 0; i < alldata.length; i++) {
            let obj = {
            };

            obj.title=alldata[i].sam[1];
            obj.partnumber= "Part No: " + alldata[i].sam[0];
            obj.src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnVW06t64ntmQJ8q4zfR_wN3CQf3tWZoJTuQ&usqp=CAU";
            obj.flex=4;
            this.cards.push(obj);
          }
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}
</style>