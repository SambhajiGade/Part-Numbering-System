<template>
  <v-app>
    <v-app-bar color="dark-white" dark max-height="70">
      <v-toolbar-title>User</v-toolbar-title><v-spacer></v-spacer>
      <v-btn color="primary" to="/">Log Out</v-btn>
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
          :key="card.title"
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
              </v-img>

              <v-card-actions>

                <v-dialog
                  v-model="dialog1"
                  persistent
                  max-width="600px"
                  :retain-focus="false"
                >
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
                          <v-row>
                            <div class="text-overline mb-1">
                              Enter Details of Part Number
                            </div>
                          </v-row>
                          <v-row>
                            <v-col>
                              <!-- <div v-if=this.polyarr[0].alphabetical> -->
                              <div v-for="index in count" :key="index">
                                <v-text-field
                                  label="Enter text"
                                  v-model="textarray[Path[index - 1]]"
                                  solo
                                  outlined
                                  dense
                                  :rules="filteredRules"
                                  type="text"
                                  @click="textclicked(index)"
                                  clearable
                                  v-if="isDisabledsss"
                                >
                                </v-text-field>
                              </div>

                              <!-- </div> -->
                            </v-col>
                            <v-col>
                              <div v-for="index1 in checkcount" :key="index1">
                                <v-select
                                  v-model="lovs[CheckPath[index1 - 1]]"
                                  label="Choose an Option"
                                  :items="SamArr[index1 - 1]"
                                  dense
                                  solo
                                  v-if="isDisabledarr"
                                ></v-select>
                              </div>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <div
                                v-for="(i, index) in InputDataArr"
                                :key="index"
                              >
                                <v-text-field
                                  :label="i"
                                  v-model="inputsarray[index]"
                                  placeholder=""
                                  dense
                                  outlined
                                ></v-text-field>
                              </div>
                            </v-col>
                          </v-row>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="(dialog1 = false), submit()"
                      >
                        Submit
                      </v-btn>
                      <v-btn text @click="dialog1 = false"> Cancel </v-btn>
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
export default{
  data() {
    return {
      samG: "",
      lovs: [],
      textarray: [],
      click: false,
      ava: true,
      polyM: "",
      dig: [],
      year: "",
      day: "",
      month: "",
      time: "",
      Date: "",
      InputDataArr: [],
      nor: [],
      inputsarray: [],
      InputArr: [],
      InputArray: [],
      pra: "",
      checklength: {},
      count: null,
      checkcount: null,
      isDisabledsss: false,
      isDisabledarr: false,
      CheckPath: [],
      CheckPath1: [],
      mainindex: null,
      mainSeq: [],
      AllSeq: [],
      mainPolyObj: {},
      MainFinalString: {
        FinalString: "",
      },
      textindex: null,
      poly: [],
      realobject: {},
      polyarr: [],
      dialog1: false,
      CardData: {},
      textindex1: 0,
      resultdata: [],
      realdata: [],
      ifcon: false,
      SamArr: [],
      textlen: [],
      extrapolyarr: [],
      Path: [],
      rules: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      cards: [],
      transparent: "rgba(255, 255, 255, 0)",
      items: [{ title: "Forms", icon: "mdi-form-select", to: "/LoginPage" }],
    };
  },
  watch: {
    inputsarray() {},
    lovs() {},
  },
  mounted() {
    this.admindata();
    this.getdata();
  },

  computed: {
    filteredRules() {
      if (
        this.extrapolyarr[this.textindex1].alphabetical &&
        !this.extrapolyarr[this.textindex1].numerical &&
        !this.extrapolyarr[this.textindex1].symbols
      ) {
        return [this.rules[0]];
      } else if (
        !this.extrapolyarr[this.textindex1].alphabetical &&
        this.extrapolyarr[this.textindex1].numerical &&
        !this.extrapolyarr[this.textindex1].symbols
      ) {
        return [this.rules[1]];
      } else if (
        !this.extrapolyarr[this.textindex1].alphabetical &&
        !this.extrapolyarr[this.textindex1].numerical &&
        this.extrapolyarr[this.textindex1].symbols
      ) {
        return [this.rules[2]];
      } else if (
        this.extrapolyarr[this.textindex1].alphabetical &&
        this.extrapolyarr[this.textindex1].numerical &&
        !this.extrapolyarr[this.textindex1].symbols
      ) {
        return [
          (v) =>
            /^[a-zA-Z0-9]+$/.test(v) ||
            "Only alphabets and numbers are allowed",
        ];
      } else if (
        this.extrapolyarr[this.textindex1].alphabetical &&
        !this.extrapolyarr[this.textindex1].numerical &&
        this.extrapolyarr[this.textindex1].symbols
      ) {
        return [
          (v) =>
            /^[a-zA-Z\W]+$/.test(v) || "Only alphabets and symbols are allowed",
        ];
      } else if (
        !this.extrapolyarr[this.textindex1].alphabetical &&
        this.extrapolyarr[this.textindex1].numerical &&
        this.extrapolyarr[this.textindex1].symbols
      ) {
        return [
          (v) => /^[0-9\W]+$/.test(v) || "Only numbers and symbols are allowed",
        ];
      } else if (
        this.extrapolyarr[this.textindex1].alphabetical &&
        this.extrapolyarr[this.textindex1].numerical &&
        this.extrapolyarr[this.textindex1].symbols
      ) {
        return [
          (v) =>
            /^[a-zA-Z0-9\W]+$/.test(v) ||
            "Only alphabets, numbers, and symbols are allowed",
        ];
      } else {
        return [];
      }
    },
  },

  methods: {
    textclicked(index) {
      this.textindex = index;

      this.textindex1 = this.textindex - 1;
    },

    submit() {
      let len = this.mainSeq.length;
      this.textarray = this.textarray.map((str) => str.toUpperCase());

      let mainarray = new Array(len);

      if (this.Path.length) {


        for (let j = 0; j < this.Path.length; j++) {

          mainarray[this.Path[j]] = this.textarray[this.Path[j]];
        }
      }

      if (this.CheckPath.length) {
        for (let j = 0; j < this.CheckPath.length; j++) {
          mainarray[this.CheckPath[j]] = this.lovs[this.CheckPath[j]];
        }
      }

      let len1 = this.CardData[this.mainindex].sam.length - 1;
      let realobj = this.CardData[this.mainindex].sam[len1];
      for (let i = 0; i < this.mainSeq.length; i++) {
        if (mainarray[i]) {
        } else {
          if (this.mainSeq[i] === "prefix") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "suffix") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "text1") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "text2") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "text3") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "text4") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "text5") {
            mainarray[i] = realobj[i];
          }
          if (this.mainSeq[i] === "date") {
            mainarray[i] = this.Date;
          }
          if (this.mainSeq[i] === "day") {
            mainarray[i] = this.day;
          }
          if (this.mainSeq[i] === "month") {
            mainarray[i] = this.month;
          }
          if (this.mainSeq[i] === "time") {
            mainarray[i] = this.time;
          }
          if (this.mainSeq[i] === "year") {
            mainarray[i] = this.year;
          }
          if (this.mainSeq[i] === "sequence") {
            mainarray[i] = this.AllSeq.sequence;
          }
        }
      }

      let MainArray = "";
      for (let l = 0; l < mainarray.length; l++) {
        MainArray += mainarray[l];
      }

      this.MainFinalString.PartString = MainArray;
      this.MainFinalString.sequence = this.AllSeq.sequence;

      this.postdata();
    },

    async postdata() {
      await axios
        .post("http://20.55.43.53:8083/api/items7", this.MainFinalString)
        .then((result) => {
          location.reload();
        })
        .catch((err) => {});
    },

    checklen(result) {

      for (const key in result) {
        if (result.hasOwnProperty(key)) {
          const value = result[key];
          const isInt = Number.isInteger(Number(value));
          if (isInt) {
            this.checklength[key] = value;
          }
        }
      }
      delete this.checklength.sequence;
      for (const key in this.checklength) {
        this.textlen.push(this.checklength[key]);
      }
      this.textlen = this.textlen.map(Number);
    },

    cancel() {
      this.InputArray = [];
    },

    buttonClicked(index, card) {
      this.mainindex = index;
      let len1 = this.CardData[index].sam.length - 2;
      this.realobject = this.CardData[index].sam[len1];

      this.checklen(this.realobject);
      this.click = true;

      this.isDisabledsss = false;
      this.SamArr = [];
      this.checkcount = null;
      this.count = null;
      this.isDisabledarr = false;

      this.samG = this.cards[index].title;
      this.polyM = this.cards[index].partnumber;

      let polyobj = {
        alphabetical: false,
        numerical: false,
        symbols: false,
      };
      let i1 = this.CardData[index].sam.length - 1;
  
      let path = [];
      this.Path = [];
      for (let p = 0; p < this.CardData[index].sam[i1].length - 1; p++) {
        let polyobj = {
          alphabetical: false,
          numerical: false,
          symbols: false,
        };

        let filteredarr1 =
          this.CardData[index].sam[i1][p].includes("alphabetical");
        let filteredarr2 =
          this.CardData[index].sam[i1][p].includes("numerical");
        let filteredarr3 = this.CardData[index].sam[i1][p].includes("symbols");
    
        if (filteredarr1) {
          polyobj.alphabetical = true;
        }
        if (filteredarr2) {
          polyobj.numerical = true;
        }
        if (filteredarr3) {
          polyobj.symbols = true;
        }

        if (filteredarr1 || filteredarr2 || filteredarr3) {
          this.polyarr.push(polyobj);
          path.push(p);
        }
      }
      this.Path = path;

      this.extrapolyarr = this.polyarr;
      this.count = this.Path.length;

      polyobj = {
        alphabetical: false,
        numerical: true,
        symbols: false,
      };
      this.mainPolyObj = polyobj;


      let len4 = this.CardData[index].sam.length - 2;
      let allseq = this.CardData[index].sam[len4];
      //
      //
      let sequenced = [];
      sequenced = allseq.seq;
      delete allseq.seq;

      this.mainSeq = [];
      this.AllSeq = [];
      this.mainSeq = sequenced;
      this.AllSeq = allseq;

      this.Date = null;
      this.time = null;
      this.day = null;
      this.month = null;
      this.year = null;
      this.finalDate(allseq.date);
      this.finalDay(allseq.day);
      this.finalMonth(allseq.month);
      this.finalTime(allseq.time);
      this.finalYear(allseq.year);

      this.InputDataArr = [];
      let len = this.CardData[index].sam.length - 2;
      for (let i = 2; i < len; i++) {
        this.InputDataArr.push(this.CardData[index].sam[i]);
      }
      if (this.polyarr[0].symbols) {
        
        this.isDisabledsss = true;
      } else if (this.polyarr[0].alphabetical) {
        
        this.isDisabledsss = true;
      } else if (this.polyarr[0].numerical) {
        
        this.isDisabledsss = true;
      }
      this.polyarr = [];
      
      this.checkforcheckbox(index);
      
      this.checklength = {};
      this.textlen = [];
    },

    checkforcheckbox(index) {
      let i2 = this.CardData[index].sam.length - 1;
      let count = 0;
      let checkpath = [];
      this.CheckPath = [];

      for (let i = 0; i <= i2; i++) {
        if (Array.isArray(this.CardData[index].sam[i2][i])) {
          this.SamArr.push(this.CardData[index].sam[i2][i]);
          checkpath.push(i);
          count++;
        }
      }

      this.CheckPath = checkpath;

      if (this.SamArr.length) {
        this.isDisabledarr = true;
        this.checkcount = count;
      }

    },
    async getdata() {
      axios
        .get("http://20.55.43.53:8083/api/items2")
        .then((result) => {
          this.resultdata = result.data;
        })
        .catch((err) => {});

    },

    async admindata() {
      axios
        .get("http://20.55.43.53:8083/api/items5")
        .then((result) => {
          let alldata = result.data;
          this.CardData = result.data;

          for (let i = 0; i < alldata.length; i++) {
            let obj = {
              title: alldata[i].sam[1],
              partnumber: "Part No: " + alldata[i].sam[0],
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnVW06t64ntmQJ8q4zfR_wN3CQf3tWZoJTuQ&usqp=CAU",
              flex: 4,
            };
            this.cards.push(obj);
          }
        })
        .catch((err) => {});
    },

    finalDate(date) {
      const month = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];
      const weekday = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];
      const current = new Date();

      let onlyday = `${current.getDate()}`;
      let tempday = "0" + onlyday;


      let fullday = tempday.slice(-2);

      let halfmonth = `${current.getMonth() + 1}`;

      let tempmonth = "0" + halfmonth;

      let fullmonth = tempmonth.slice(-2);

      let letmonth = month[current.getMonth()];

      let letmonth3 = letmonth.substring(0, 3);

      let letdayfull = weekday[current.getDay()];
    
      let letday = fullday.substring(0, 3);
    
      let fullyear = `${current.getFullYear()}`;
      
      let halfyear = fullyear.slice(-2);

      if (date === "DMY1") {
        this.Date = fullday + fullmonth + fullyear;
      } else if (date === "DMY2") {
        this.Date = `${fullday}${fullmonth}${halfyear}`;
      } else if (date === "DMY3") {
        this.Date = `${onlyday}${fullmonth}${halfyear}`;
      } else if (date === "DMY4") {
        this.Date = `${onlyday}${halfmonth}${halfyear}`;
      } else if (date === "DMY5") {
        this.Date = `${onlyday}${halfmonth}${fullyear}`;
      } else if (date === "DMY6") {
        this.Date = `${onlyday}${fullmonth}${fullyear}`;
      } else if (date === "DMY7") {
        this.Date = `${fullday}${halfmonth}${fullyear}`;
      } else if (date === "DMY8") {
        this.Date = `${fullday}${halfmonth}${halfyear}`;
      } else if (date === "DMY9") {
        this.Date = `${onlyday}${halfmonth}${halfyear}`;
      }

      else if (date === "DMY10") {
        this.Date = `${letday}${letmonth3}${fullyear}`;
      } else if (date === "DMY11") {
        this.Date = `${letday}${letmonth3}${halfyear}`;
      } else if (date === "DMY12") {
        this.Date = `${letday}${fullmonth}${fullyear}`;
      } else if (date === "DMY13") {
        this.Date = `${letday}${fullmonth}${halfyear}`;
      } else if (date === "DMY14") {
        this.Date = `${letday}${halfmonth}${fullyear}`;
      } else if (date === "DMY15") {
        this.Date = `${letday}${halfmonth}${halfyear}`;
      } else if (date === "DMY16") {
        this.Date = `${fullday}${letmonth3}${halfyear}`;
      } else if (date === "DMY17") {
        this.Date = `${onlyday}${letmonth3}${halfyear}`;
      } else if (date === "DMY18") {
        this.Date = `${fullday}${letmonth3}${fullyear}`;
      } else if (date === "DMY19") {
        this.Date = `${onlyday}${letmonth3}${fullyear}`;
      } else if (date === "DMY20") {
        this.Date = `${letdayfull}${letmonth}${fullyear}`;
      } else if (date === "DMY21") {
        this.Date = `${letdayfull}${letmonth}${halfyear}`;
      } else if (date === "DMY22") {
        this.Date = `${fullday}${letmonth}${halfyear}`;
      } else if (date === "DMY23") {
        this.Date = `${fullday}${letmonth}${fullyear}`;
      } else if (date === "DMY24") {
        this.Date = `${onlyday}${letmonth}${fullyear}`;
      } else if (date === "DMY25") {
        this.Date = `${onlyday}${letmonth}${halfyear}`;
      } else if (date === "DMY26") {
        this.Date = `${letdayfull}${fullmonth}${halfyear}`;
      } else if (date === "DMY27") {
        this.Date = `${letdayfull}${fullmonth}${fullyear}`;
      } else if (date === "DMY28") {
        this.Date = `${letdayfull}${halfmonth}${halfyear}`;
      } else if (date === "DMY29") {
        this.Date = `${letdayfull}${halfmonth}${fullyear}`;
      }
    },
    finalYear(year2) {
      const current = new Date();
      if (year2 === "YYYY") {
        this.year = `${current.getFullYear()}`;
      } else if (year2 === "YY") {
        const fullyear = `${current.getFullYear()}`;
        this.year = fullyear.slice(-2);
      } else if (year2 === "YYY") {
        const fullyear = `${current.getFullYear()}`;
        this.year = fullyear.slice(-2);
        this.year = Number(this.year).toString();
      }
    },
    finalDay(day2) {
      const current = new Date();
      const weekday = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];
      if (day2 === "DDDDD") {
        this.day = weekday[current.getDay()];
      } else if (day2 === "DDD") {
        let any = weekday[current.getDay()];
        this.day = any.substring(0, 3);
      } else if (day2 === "DDDD") {
        this.day = `${current.getDate()}`;
      } else if (day2 === "DD") {
        var temp = "";
        temp = `${current.getDate()}`;
        temp = "0" + temp;
        this.day = temp.slice(-2);
      }
    },
    finalMonth(month2) {
      const current = new Date();
      const month = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];
      if (month2 === "MMMM") {
        this.month = month[current.getMonth()];
      } else if (month2 === "MMM") {
        let anymonth = month[current.getMonth()];
        this.month = anymonth.substring(0, 3);
      } else if (month2 === "MM") {
        var temp = "";
        temp = `${current.getMonth() + 1}`;
        temp = "0" + temp;
        this.month = temp.slice(-2);
      } else if (month2 === "M") {
        const any = current.getMonth() + 1;
        this.month = `${any}`;
      }
    },
    finalTime(time2) {
      const current = new Date();
      if (time2 === "t1") {
        this.time = `${current.getHours()}${current.getMinutes()}${current.getSeconds()}`;
      } else if (time2 === "t2") {
        this.time = `${current.getHours()}${current.getMinutes()}`;
      } else if (time2 === "t3") {
        this.time = `${current.getHours()}${current.getSeconds()}`;
      } else if (time2 === "t4") {
        this.time = `${current.getMinutes()}${current.getSeconds()}`;
      } else if (time2 === "t5") {
        this.time = `${current.getHours()}`;
      } else if (time2 === "t6") {
        this.time = `${current.getMinutes()}`;
      } else if (time2 === "t7") {
        this.time = `${current.getSeconds()}`;
      }
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