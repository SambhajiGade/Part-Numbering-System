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
      <v-stepper v-model="e1">
        <v-app-bar color="deep-purple" dark>
          <v-app-bar-title>Part Numbering System</v-app-bar-title>
        </v-app-bar>
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Set The Sequence
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Enter The values of Sequence
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Generate the Part Number </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card height="630">
              <v-spacer></v-spacer>
              <v-row>
                <v-col>
                  <v-list-item-group
                    class="draggable-list"
                    v-model="selectedItem"
                    color="primary"
                  >
                    <v-card height="500" :elevation="4">
                      <draggable :list="list" :group="{ put: true }">
                        <v-list-item
                          v-for="i in list"
                          :key="list[i]"
                          :class="{ selected: todos.includes(i) }"
                          color="primary"
                          @click="selectItem(i)"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              :inner-text.prop="i"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </draggable>
                      <draggable
                        :list="list2"
                        :group="{ pull: 'clone', put: false }"
                      >
                        <v-list-item v-for="i in list2" :key="list2[i]">
                          <v-list-item-content>
                            <v-list-item-title
                              :inner-text.prop="i"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </draggable>
                    </v-card>
                  </v-list-item-group>
                </v-col>
                <v-col>
                  <v-list-item-group v-model="selectedItem2" color="primary">
                    <v-card height="500" :elevation="4">
                      <draggable
                        class="draggable-list"
                        :list="todos"
                        :group="{ put: true }"
                      >
                        <v-list-item v-for="i in todos" :key="todos[i]">
                          <v-list-item-content>
                            <v-list-item-title
                              :inner-text.prop="i"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </draggable>
                    </v-card>
                  </v-list-item-group>
                </v-col>
              </v-row>
              <!-- <p>{{ this.newtodos }}</p> -->
              <v-row>
                <v-col>
                  <v-btn
                    color="deep-purple"
                    dark
                    @click="(e1 = 2), Adam(), finalist()"
                  >
                    Continue
                  </v-btn>
                  <v-btn text @click="clear"> Clear </v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="moveItem">Move Items --></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card min-height="500">
              <pre></pre>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row class="mb-6">
                  <v-col sm="5" md="6">
                    <div v-for="i in newtodos" :key="newtodos[i]">
                      <v-layout>
                        <template v-if="i === 'Prefix'">
                          <v-textarea
                            label="Prefix :"
                            :value="PrefixLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Prefix</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio"
                                            @input="selectedRadio = $event"
                                            :value="selectedRadio"
                                            @change="radioselectedvalue1"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Prefix Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  @click="
                                                    (disableCheckbox = false),
                                                      (enabled = false),
                                                      (enable = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message1"
                                                  solo
                                                  :maxlength="selectedRadio"
                                                  :disabled="!enable"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  v-model="radio"
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox = true),
                                                      (enabled = false),
                                                      (enable = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="pre1"
                                                  label="Alphabetical"
                                                  value="alphabetical"
                                                  @click="knock = true"
                                                  :disabled="!disableCheckbox"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="pre1"
                                                  @click="knock = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="pre1"
                                                  @click="knock = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad3"
                                                  @click="
                                                    (disableCheckbox = false),
                                                      (enabled = true),
                                                      (enable = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="inputs"
                                                  @input="onInput"
                                                  :disabled="!enabled"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog = false), finalPrefix()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Suffix'">
                          <v-textarea
                            label="Suffix :"
                            :value="SuffixLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog2"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog2 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Suffix</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio2"
                                            @input="selectedRadio2 = $event"
                                            :value="selectedRadio2"
                                            @change="radioselectedvalue2"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Suffix Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad1"
                                                  @click="
                                                    (disableCheckbox2 = false),
                                                      (enabled2 = false),
                                                      (enable2 = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message2"
                                                  solo
                                                  :maxlength="selectedRadio2"
                                                  :disabled="!enable2"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox2 = true),
                                                      (enabled2 = false),
                                                      (enable2 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="suff1"
                                                  label="Alphabetical"
                                                  value="alphabetical"
                                                  @click="knock2 = true"
                                                  :disabled="!disableCheckbox2"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="suff1"
                                                  @click="knock2 = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox2"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="suff1"
                                                  @click="knock2 = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox2"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad3"
                                                  @click="
                                                    (disableCheckbox2 = false),
                                                      (enabled2 = true),
                                                      (enable2 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules2="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="input2"
                                                  @input="onInput2"
                                                  :disabled="!enabled2"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog2 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog2 = false), finalSuffix()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Year'">
                          <v-textarea
                            label="Year :"
                            :value="YearLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog3"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog3 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn></template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Suffix</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Year Format
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio3"
                                            :value="selectedRadio3"
                                            column
                                          >
                                            <v-radio
                                              label="YYYY(2002)"
                                              value="YYYY"
                                            ></v-radio>
                                            <v-radio
                                              label="YY(02)"
                                              value="YY"
                                            ></v-radio>

                                            <v-radio
                                              label="YY/Y(02,2)"
                                              value="YYY"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog3 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog3 = false), finalYear()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card></v-dialog
                          >
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Month'">
                          <v-textarea
                            label="Month :"
                            :value="MonthLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog4"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog4 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn></template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Month</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Month format
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio4"
                                            :value="selectedRadio4"
                                            column
                                          >
                                            <v-subheader
                                              >Month in word format</v-subheader
                                            >
                                            <v-radio
                                              label="3 letters(Jan,Dec)"
                                              value="MMM"
                                            ></v-radio>
                                            <v-radio
                                              label="All letters(January,December)"
                                              value="MMMM"
                                            ></v-radio>
                                            <v-subheader
                                              >Month in number
                                              format</v-subheader
                                            >
                                            <v-radio
                                              label="MM(01,12)"
                                              value="MM"
                                            ></v-radio>
                                            <v-radio
                                              label="M/MM(1,12)"
                                              value="M"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog4 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog4 = false), finalMonth()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card></v-dialog
                          >
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Day'">
                          <v-textarea
                            label="Day :"
                            :value="DayLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog5"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog5 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn></template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Day</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Day format
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio5"
                                            :value="selectedRadio5"
                                            column
                                          >
                                            <v-subheader
                                              >Alphabetical day
                                              format</v-subheader
                                            >
                                            <v-radio
                                              label="3 letters(Mon,Sun)"
                                              value="DDD"
                                            ></v-radio>
                                            <v-radio
                                              label="All letters(Monday)"
                                              value="DDDDD"
                                            ></v-radio>
                                            <v-subheader
                                              >Numerical day format</v-subheader
                                            >
                                            <v-radio
                                              label="DD(01,31)"
                                              value="DD"
                                            ></v-radio>
                                            <v-radio
                                              label="D/DD(1,31)"
                                              value="DDDD"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog5 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog5 = false), finalDay()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card></v-dialog
                          >
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Date'">
                          <v-textarea
                            label="Date :"
                            :value="DateLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog6"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog6 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn></template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Day</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Date format
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio6"
                                            :value="selectedRadio6"
                                            column
                                          >
                                            <v-subheader
                                              >Date format in
                                              Numerical</v-subheader
                                            >
                                            <v-radio
                                              label="DD/MM/YYYY"
                                              value="DMY1"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/MM/YY"
                                              value="DMY2"
                                            ></v-radio>
                                            <v-radio
                                              label="D/MM/YY"
                                              value="DMY3"
                                            ></v-radio>
                                            <v-radio
                                              label="D/M/YY"
                                              value="DMY4"
                                            ></v-radio>
                                            <v-radio
                                              label="D/M/YYYY"
                                              value="DMY5"
                                            ></v-radio>
                                            <v-radio
                                              label="D/MM/YYYY"
                                              value="DMY6"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/M/YYYY"
                                              value="DMY7"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/M/YY"
                                              value="DMY8"
                                            ></v-radio>
                                            <v-radio
                                              label="D/M/YY"
                                              value="DMY9"
                                            ></v-radio>
                                            <v-subheader
                                              >Date in Alpha Numerical format(3
                                              Letters i.e. Jan)</v-subheader
                                            >
                                            <v-radio
                                              label="Day/Month/YYYY"
                                              value="DMY10"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/Month/YY"
                                              value="DMY11"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/MM/YYYY"
                                              value="DMY12"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/MM/YY"
                                              value="DMY13"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/M/YYYY"
                                              value="DMY14"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/M/YY"
                                              value="DMY15"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/Month/YY"
                                              value="DMY16"
                                            ></v-radio>
                                            <v-radio
                                              label="D/Month/YY"
                                              value="DMY17"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/Month/YYYY"
                                              value="DMY18"
                                            ></v-radio>
                                            <v-radio
                                              label="D/Month/YY"
                                              value="DMY19"
                                            ></v-radio>
                                            <v-subheader
                                              >Date in Alpha Numerical
                                              format(All Letters i.e.
                                              January)</v-subheader
                                            >
                                            <v-radio
                                              label="Day/Month/YYYY"
                                              value="DMY20"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/Month/YY"
                                              value="DMY21"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/Month/YY"
                                              value="DMY22"
                                            ></v-radio>
                                            <v-radio
                                              label="DD/Month/YYYY"
                                              value="DMY23"
                                            ></v-radio>
                                            <v-radio
                                              label="D/Month/YYYY"
                                              value="DMY24"
                                            ></v-radio>
                                            <v-radio
                                              label="D/Month/YY"
                                              value="DMY25"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/MM/YY"
                                              value="DMY26"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/MM/YYYY"
                                              value="DMY27"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/M/YY"
                                              value="DMY28"
                                            ></v-radio>
                                            <v-radio
                                              label="Day/M/YYYY"
                                              value="DMY29"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog6 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog6 = false), finalDate()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card></v-dialog
                          >
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Time'">
                          <v-textarea
                            label="Time :"
                            :value="TimeLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog7"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog7 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn></template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Time</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Time Format
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio7"
                                            :value="selectedRadio7"
                                            column
                                          >
                                            <v-radio
                                              label="HH/MM/SS"
                                              value="t1"
                                            ></v-radio>
                                            <v-radio
                                              label="HH/MM"
                                              value="t2"
                                            ></v-radio>
                                            <v-radio
                                              label="HH/SS"
                                              value="t3"
                                            ></v-radio>
                                            <v-radio
                                              label="MM/SS"
                                              value="t4"
                                            ></v-radio>
                                            <v-radio
                                              label="HH"
                                              value="t5"
                                            ></v-radio>
                                            <v-radio
                                              label="MM"
                                              value="t6"
                                            ></v-radio>
                                            <v-radio
                                              label="SS"
                                              value="t7"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog7 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog7 = false), finalTime()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card></v-dialog
                          >
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Text1'">
                          <v-textarea
                            label="Text1 :"
                            :value="Text1Label()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog8"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog8 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Text</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio8"
                                            @input="selectedRadio8 = $event"
                                            :value="selectedRadio8"
                                            @change="radioselectedvalue3"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Text Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad1"
                                                  @click="
                                                    (disableCheckbox3 = false),
                                                      (enabled3 = false),
                                                      (enable3 = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message3"
                                                  solo
                                                  :maxlength="selectedRadio8"
                                                  :disabled="!enable3"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox3 = true),
                                                      (enabled3 = false),
                                                      (enable3 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="tex1"
                                                  label="Alphabetical"
                                                  value="alphabetical"
                                                  @click="knock3 = true"
                                                  :disabled="!disableCheckbox3"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex1"
                                                  @click="knock3 = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox3"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex1"
                                                  @click="knock3 = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox3"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad3"
                                                  @click="
                                                    (disableCheckbox3 = false),
                                                      (enabled3 = true),
                                                      (enable3 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules3="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="input3"
                                                  @input="onInput3"
                                                  :disabled="!enabled3"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog8 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog8 = false), finalText1()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Text2'">
                          <v-textarea
                            label="Text2 :"
                            :value="Text2Label()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog9"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog9 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Text</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio9"
                                            @input="selectedRadio9 = $event"
                                            :value="selectedRadio9"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Text Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad1"
                                                  @click="
                                                    (disableCheckbox4 = false),
                                                      (enabled4 = false),
                                                      (enable4 = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message4"
                                                  solo
                                                  :maxlength="selectedRadio9"
                                                  :disabled="!enable4"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox4 = true),
                                                      (enabled4 = false),
                                                      (enable4 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="tex2"
                                                  label="Alphabetical"
                                                  value="Alphabetical4"
                                                  @click="knock4 = true"
                                                  :disabled="!disableCheckbox4"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex2"
                                                  @click="knock4 = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox4"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex2"
                                                  @click="knock4 = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox4"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad4"
                                                  @click="
                                                    (disableCheckbox4 = false),
                                                      (enabled4 = true),
                                                      (enable4 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules3="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="input4"
                                                  @input="onInput4"
                                                  :disabled="!enabled4"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog9 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog9 = false), finalText2()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Text3'">
                          <v-textarea
                            label="Text3 :"
                            :value="Text3Label()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog10"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog10 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Text</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio10"
                                            @input="selectedRadio10 = $event"
                                            :value="selectedRadio10"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Text Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad1"
                                                  @click="
                                                    (disableCheckbox5 = false),
                                                      (enabled5 = false),
                                                      (enable5 = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message5"
                                                  solo
                                                  :maxlength="selectedRadio10"
                                                  :disabled="!enable5"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox5 = true),
                                                      (enabled5 = false),
                                                      (enable5 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="tex3"
                                                  label="Alphabetical"
                                                  value="alphabetical"
                                                  @click="knock5 = true"
                                                  :disabled="!disableCheckbox5"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex3"
                                                  @click="knock5 = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox5"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex3"
                                                  @click="knock5 = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox5"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad3"
                                                  @click="
                                                    (disableCheckbox5 = false),
                                                      (enabled5 = true),
                                                      (enable5 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules3="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="input5"
                                                  @input="onInput5"
                                                  :disabled="!enabled5"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog10 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog10 = false), finalText3()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Text4'">
                          <v-textarea
                            label="Text4 :"
                            :value="Text4Label()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog11"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog11 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Text</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio11"
                                            @input="selectedRadio11 = $event"
                                            :value="selectedRadio11"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Text Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad1"
                                                  @click="
                                                    (disableCheckbox6 = false),
                                                      (enabled6 = false),
                                                      (enable6 = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message6"
                                                  solo
                                                  :maxlength="selectedRadio11"
                                                  :disabled="!enable6"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox6 = true),
                                                      (enabled6 = false),
                                                      (enable6 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="tex4"
                                                  label="Alphabetical"
                                                  value="alphabetical"
                                                  @click="knock6 = true"
                                                  :disabled="!disableCheckbox6"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex4"
                                                  @click="knock6 = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox6"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex4"
                                                  @click="knock6 = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox6"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad3"
                                                  @click="
                                                    (disableCheckbox6 = false),
                                                      (enabled6 = true),
                                                      (enable6 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules3="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="input6"
                                                  @input="onInput6"
                                                  :disabled="!enabled6"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog11 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog11 = false), finalText4()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Text5'">
                          <v-textarea
                            label="Text5 :"
                            :value="Text5Label()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog12"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog12 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Text</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <template>
                                    <v-expansion-panels :value="opened">
                                      <v-expansion-panel>
                                        <v-expansion-panel-header>
                                          Length
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group
                                            v-model="selectedRadio12"
                                            @input="selectedRadio12 = $event"
                                            :value="selectedRadio12"
                                            column
                                          >
                                            <v-radio
                                              label="1"
                                              value="1"
                                            ></v-radio>
                                            <v-radio
                                              label="2"
                                              value="2"
                                            ></v-radio>

                                            <v-radio
                                              label="3"
                                              value="3"
                                            ></v-radio>
                                            <v-radio
                                              label="4"
                                              value="4"
                                            ></v-radio>
                                            <v-radio
                                              label="5"
                                              value="5"
                                            ></v-radio>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-divider></v-divider>
                                      <v-expansion-panel hoverable>
                                        <v-expansion-panel-header>
                                          Text Conditions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-radio-group column>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad1"
                                                  @click="
                                                    (disableCheckbox7 = false),
                                                      (enabled7 = false),
                                                      (enable7 = true)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="5">
                                                <v-text-field
                                                  v-model="message7"
                                                  solo
                                                  :maxlength="selectedRadio12"
                                                  :disabled="!enable7"
                                                  label="Enter"
                                                  type="text"
                                                  clearable
                                                ></v-text-field>
                                              </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <pre></pre>

                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  label=""
                                                  :value="true"
                                                  @click="
                                                    (disableCheckbox7 = true),
                                                      (enabled7 = false),
                                                      (enable7 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>

                                              <v-col md="4">
                                                <v-checkbox
                                                  v-model="tex5"
                                                  label="Alphabetical"
                                                  value="alphabetical"
                                                  @click="knock7 = true"
                                                  :disabled="!disableCheckbox7"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex5"
                                                  @click="knock7 = true"
                                                  label="Numerical"
                                                  value="numerical"
                                                  :disabled="!disableCheckbox7"
                                                  dense
                                                ></v-checkbox>
                                                <v-checkbox
                                                  v-model="tex5"
                                                  @click="knock7 = true"
                                                  label="Symbols"
                                                  value="symbols"
                                                  :disabled="!disableCheckbox7"
                                                  dense
                                                ></v-checkbox>
                                              </v-col>
                                            </v-row>

                                            <v-divider></v-divider>
                                            <v-row>
                                              <v-col md="1">
                                                <v-radio
                                                  value="rad3"
                                                  @click="
                                                    (disableCheckbox7 = false),
                                                      (enabled7 = true),
                                                      (enable7 = false)
                                                  "
                                                ></v-radio>
                                              </v-col>
                                              <v-col md="3">
                                                <v-textarea
                                                  clearable
                                                  :rules3="[
                                                    (v) =>
                                                      (!/[ ]/.test(v) &&
                                                        v.split(';')) ||
                                                      'space is not allowed instead use [;]',
                                                  ]"
                                                  outlined
                                                  auto-grow
                                                  rows="2"
                                                  rows-height="15"
                                                  clear-icon="mdi-close-circle"
                                                  label="Text"
                                                  v-model="input7"
                                                  @input="onInput7"
                                                  :disabled="!enabled7"
                                                >
                                                </v-textarea>
                                              </v-col>
                                            </v-row>
                                          </v-radio-group>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </template>
                                  <v-btn text @click="dialog12 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog12 = false), finalText5()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                      <v-layout>
                        <template v-if="i === 'Sequence'">
                          <v-textarea
                            label="Sequence :"
                            :value="SequenceLabel()"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="10"
                            disabled
                          ></v-textarea>
                          <v-dialog
                            v-model="dialog13"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="dialog13 = true"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                color="indigo"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn> </template
                            ><v-card style="overflow: hidden">
                              <v-card-title>
                                <span class="text-h5">Sequence</span>
                              </v-card-title>

                              <v-row>
                                <v-col>
                                  <v-text-field
                                    v-model="message8"
                                    solo
                                    label="Enter Sequence Number"
                                    type="number"
                                    clearable
                                    required
                                  ></v-text-field>
                                  <v-btn text @click="dialog13 = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="(dialog13 = false), finalSequence()"
                                  >
                                    Save
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-layout>
                    </div>
                  </v-col>
                </v-row>
                <v-btn color="error" class="mr-4" @click="reset"> Clear </v-btn>
              </v-form>
            </v-card>
            <v-btn color="deep-purple" dark @click="(e1 = 3), notfinal()">
              Continue
            </v-btn>
            <v-btn text @click="e1 = 1"> Back </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card height="500">
              <h2 class="text-center">{{ this.ans }}</h2>
            </v-card>
            <v-btn color="red" @click="(e1 = 1), online(), clear(), reset()">
              Restart
            </v-btn>
            <v-btn
              text
              @click="
                (e1 = 2),
                  online(),
                  finalTime(),
                  finalDate(),
                  finalDay(),
                  finalMonth(),
                  finalYear()
              "
            >
              Back
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>



<script>
/* eslint-disable */
import draggable from "vuedraggable";
import axios from "axios";
export default{
  components: {
    draggable,
  },
  data() {
    return {
      drawer: null,
      ite: [
        { title: "PNS Generator", icon: "mdi-numeric", to: "/pnsapp" },
        { title: "Create Form", icon: "mdi-form-select", to: "/CreateForm" },
        { title: "View", icon: "mdi-view-list", to: "/PNSview" },
      ],
      show: false,
      selectedItem2: "",
      prefix: "",
      suffix: "",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      Sequence: "",
      year: "",
      day: "",
      month: "",
      time: "",
      Date: "",
      showresult: "",
      SamData: {
        SData: "",
      },
      radioarray: [],
      PolyData: {
        UserData: "",
        Textlength: "",
      },
      realtime: {},
      ans: "",
      e1: 1,
      opened: 0,
      count1: 0,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      dialog9: false,
      dialog10: false,
      dialog11: false,
      dialog12: false,
      dialog13: false,
      message1: "",
      message2: "",
      message3: "",
      message4: "",
      message5: "",
      message6: "",
      message7: "",
      message8: "",
      enabled: false,
      enabled2: false,
      enabled3: false,
      enabled4: false,
      enabled5: false,
      enabled6: false,
      enabled7: false,
      enable: false,
      enable2: false,
      enable3: false,
      enable4: false,
      enable5: false,
      enable6: false,
      enable7: false,
      hidden: true,
      items: [],
      list: [
        "Prefix",
        "Suffix",
        "Year",
        "Month",
        "Day",
        "Date",
        "Time",
        "Sequence",
      ],
      list2: ["Text"],
      valid: true,
      column: null,
      listArr: [],
      finallist: [],
      listArr2: [],
      listArr3: [],
      listArr4: [],
      listArr5: [],
      listArr6: [],
      listArr7: [],
      Lovs: "",
      Lovs2: "",
      Lovs3: "",
      todos: [],
      selectedItems: [],
      newtodos: [],
      radio: false,
      selectedItem: null,
      disableCheckbox: false,
      disableCheckbox3: false,
      disableCheckbox2: false,
      disableCheckbox4: false,
      disableCheckbox5: false,
      disableCheckbox6: false,
      disableCheckbox7: false,
      selectedRadio: 0,
      selectedRadio2: 0,
      selectedRadio3: 0,
      selectedRadio4: 0,
      selectedRadio5: 0,
      selectedRadio6: 0,
      selectedRadio7: 0,
      selectedRadio8: 0,
      selectedRadio9: 0,
      selectedRadio10: 0,
      selectedRadio11: 0,
      selectedRadio12: 0,
      inputs: ";",
      input2: ";",
      input3: ";",
      input4: ";",
      input5: ";",
      input6: ";",
      input7: ";",
      check: "",
      check2: "",
      check3: "",
      check4: "",
      check5: "",
      check6: "",
      check7: "",
      knock: false,
      knock2: false,
      knock3: false,
      knock4: false,
      knock5: false,
      knock6: false,
      knock7: false,
      pre1: [],
      pretext: [],
      suff1: [],
      sufftext: [],
      tex1: [],
      textext1: [],
      tex2: [],
      textext2: [],
      tex3: [],
      textext3: [],
      tex4: [],
      textext4: [],
      tex5: [],
      textext5: [],
      sequence1: "",
      finalarray: [],
      finalarr: [],
      polyarr: {},
      rules: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      rules2: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      rules3: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      rules4: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      rules5: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      rules6: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
      rules7: [
        (v) => /^[a-zA-Z]+$/.test(v) || "Only alphabets are allowed",
        (v) => /^[0-9]+$/.test(v) || "Only numbers are allowed",
        (v) => /^[\W]+$/.test(v) || "Only symbols are allowed",
      ],
    };
  },
  watch: {
    selectedRadio: function (newValue) {
      this.input = newValue.split("").join(";");
    },
  },
  computed: {
    arrToText() {
      return this.listArr.join(";");
    },
    arrToText2() {
      return this.listArr2.join(";");
    },
    arrToText3() {
      return this.listArr3.join(";");
    },
    arrToText4() {
      return this.listArr4.join(";");
    },
    arrToText5() {
      return this.listArr5.join(";");
    },
    arrToText6() {
      return this.listArr6.join(";");
    },
    arrToText7() {
      return this.listArr7.join(";");
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    clear() {
      this.list = [
        "Prefix",
        "Suffix",
        "Year",
        "Month",
        "Day",
        "Date",
        "Time",
        "Sequence",
      ];
      this.list2 = ["Text"];
      this.todos = [];
      this.selectedItem = [];
      this.radioarray = [];
    },
    reset() {
      this.$refs.form.reset();
    },
    online() {
      this.finalarray = [];
      this.showresult = "";
      this.finalarr = [];
      location.reload();
    },

    PrefixLabel() {
      let poly = "";
      if (this.enable === true) {
        poly =
          "Length :" +
          this.selectedRadio +
          "     Prefix Condition :" +
          this.prefix;
      }
      if (this.disableCheckbox === true) {
        poly =
          "Length :" +
          this.selectedRadio +
          "     Prefix Condition :" +
          this.pre1;
      }
      if (this.enabled === true) {
        poly = "Length :" + this.selectedRadio + "     Prefix Condition : LOVS";
      }
      return poly;
    },
    SuffixLabel() {
      let poly = "";
      if (this.enable2 === true) {
        poly =
          "Length :" +
          this.selectedRadio2 +
          "     Suffix Condition :" +
          this.suffix;
      }
      if (this.disableCheckbox2 === true) {
        poly =
          "Length :" +
          this.selectedRadio2 +
          "     Suffix Condition :" +
          this.suff1;
      }
      if (this.enabled2 === true) {
        poly =
          "Length :" + this.selectedRadio2 + "     Suffix Condition : LOVS";
      }
      return poly;
    },
    Text1Label() {
      let poly = "";
      if (this.enable3 === true) {
        poly =
          "Length :" +
          this.selectedRadio8 +
          "     Text Condition :" +
          this.text1;
      }
      if (this.disableCheckbox3 === true) {
        poly =
          "Length :" +
          this.selectedRadio8 +
          "     Text Condition :" +
          this.tex1;
      }
      if (this.enabled3 === true) {
        poly = "Length :" + this.selectedRadio8 + "     Text Condition : LOVS";
      }
      return poly;
    },
    Text2Label() {
      let poly = "";
      if (this.enable4 === true) {
        poly =
          "Length :" +
          this.selectedRadio9 +
          "     Text Condition :" +
          this.text2;
      }
      if (this.disableCheckbox4 === true) {
        poly =
          "Length :" +
          this.selectedRadio9 +
          "     Text Condition :" +
          this.tex2;
      }
      if (this.enabled4 === true) {
        poly = "Length :" + this.selectedRadio9 + "     Text Condition : LOVS";
      }
      return poly;
    },
    Text3Label() {
      let poly = "";
      if (this.enable5 === true) {
        poly =
          "Length :" +
          this.selectedRadio10 +
          "     Text Condition :" +
          this.text3;
      }
      if (this.disableCheckbox5 === true) {
        poly =
          "Length :" +
          this.selectedRadio10 +
          "     Text Condition :" +
          this.tex3;
      }
      if (this.enabled5 === true) {
        poly = "Length :" + this.selectedRadio10 + "     Text Condition : LOVS";
      }
      return poly;
    },
    Text4Label() {
      let poly = "";
      if (this.enable6 === true) {
        poly =
          "Length :" +
          this.selectedRadio11 +
          "     Text Condition :" +
          this.text4;
      }
      if (this.disableCheckbox6 === true) {
        poly =
          "Length :" +
          this.selectedRadio11 +
          "     Text Condition :" +
          this.tex4;
      }
      if (this.enabled6 === true) {
        poly = "Length :" + this.selectedRadio11 + "     Text Condition : LOVS";
      }
      return poly;
    },
    Text5Label() {
      let poly = "";
      if (this.enable7 === true) {
        poly =
          "Length :" +
          this.selectedRadio12 +
          "     Text Condition :" +
          this.text5;
      }
      if (this.disableCheckbox7 === true) {
        poly =
          "Length :" +
          this.selectedRadio12 +
          "     Text Condition :" +
          this.tex5;
      }
      if (this.enabled7 === true) {
        poly = "Length :" + this.selectedRadio12 + "     Text Condition : LOVS";
      }
      return poly;
    },
    SequenceLabel() {
      let poly = "";
      if (this.dialog13 === false) {
        poly = "Sequence :" + this.message8;
      }

      return poly;
    },
    YearLabel() {
      let poly = "";
      if (this.selectedRadio3 === "YYYY") {
        poly = "Format of Year :YYYY(2002)";
      }
      if (this.selectedRadio3 === "YY") {
        poly = "Format of Year :YY(02)";
      }
      if (this.selectedRadio3 === "YYY") {
        poly = "Format of Year :Y/YY(2)";
      }
      return poly;
    },
    DateLabel() {
      let poly = "";
      if (this.selectedRadio6 === "DMY1") {
        poly = "Date format in Numerical: DD/MM/YYYY";
      }
      if (this.selectedRadio6 === "DMY2") {
        poly = "Date format in Numerical: DD/MM/YY";
      }
      if (this.selectedRadio6 === "DMY3") {
        poly = "Date format in Numerical: D/MM/YY";
      }
      if (this.selectedRadio6 === "DMY4") {
        poly = "Date format in Numerical: D/M/YY";
      }
      if (this.selectedRadio6 === "DMY5") {
        poly = "Date format in Numerical: D/M/YYYY";
      }
      if (this.selectedRadio6 === "DMY6") {
        poly = "Date format in Numerical: D/MM/YYYY";
      }
      if (this.selectedRadio6 === "DMY7") {
        poly = "Date format in Numerical: DD/M/YYYY";
      }
      if (this.selectedRadio6 === "DMY8") {
        poly = "Date format in Numerical: DD/M/YY";
      }
      if (this.selectedRadio6 === "DMY9") {
        poly = "Date format in Numerical: D/M/YY";
      }
      //3 letter
      if (this.selectedRadio6 === "DMY10") {
        poly =
          "Date in Alpha Numerical format(3 Letters i.e. Jan): Day/Month/YYYY";
      }
      if (this.selectedRadio6 === "DMY11") {
        poly =
          "Date in Alpha Numerical format(3 Letters i.e. Jan): Day/Month/YY";
      }
      if (this.selectedRadio6 === "DMY12") {
        poly =
          "Date in Alpha Numerical format(3 Letters i.e. Jan): Day/MM/YYYY";
      }
      if (this.selectedRadio6 === "DMY13") {
        poly = "Date in Alpha Numerical format(3 Letters i.e. Jan): Day/MM/YY";
      }
      if (this.selectedRadio6 === "DMY14") {
        poly = "Date in Alpha Numerical format(3 Letters i.e. Jan): Day/M/YYYY";
      }
      if (this.selectedRadio6 === "DMY15") {
        poly = "Date in Alpha Numerical format(3 Letters i.e. Jan): Day/M/YY";
      }
      if (this.selectedRadio6 === "DMY16") {
        poly =
          "Date in Alpha Numerical format(3 Letters i.e. Jan): DD/Month/YY";
      }
      if (this.selectedRadio6 === "DMY17") {
        poly = "Date in Alpha Numerical format(3 Letters i.e. Jan): D/Month/YY";
      }
      if (this.selectedRadio6 === "DMY18") {
        poly =
          "Date in Alpha Numerical format(3 Letters i.e. Jan): DD/Month/YYYY";
      }
      if (this.selectedRadio6 === "DMY19") {
        poly = "Date in Alpha Numerical format(3 Letters i.e. Jan): D/Month/YY";
      }
      if (this.selectedRadio6 === "DMY20") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): Day/Month/YYYY";
      }
      if (this.selectedRadio6 === "DMY21") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): Day/Month/YY";
      }
      if (this.selectedRadio6 === "DMY22") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): DD/Month/YY";
      }
      if (this.selectedRadio6 === "DMY23") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): DD/Month/YYYY";
      }
      if (this.selectedRadio6 === "DMY24") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): D/Month/YYYY";
      }
      if (this.selectedRadio6 === "DMY25") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): D/Month/YY";
      }
      if (this.selectedRadio6 === "DMY26") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): Day/MM/YY";
      }
      if (this.selectedRadio6 === "DMY27") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): Day/MM/YYYY";
      }
      if (this.selectedRadio6 === "DMY28") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): Day/M/YY";
      }
      if (this.selectedRadio6 === "DMY29") {
        poly =
          "Date in Alpha Numerical format(All Letters i.e. January): Day/M/YYYY";
      }
      return poly;
    },
    DayLabel() {
      let poly = "";
      if (this.selectedRadio5 === "DDDDD") {
        poly = "Alphabetical Day Format :3 letters(Mon,Sun)";
      }
      if (this.selectedRadio5 === "DDD") {
        poly = "Alphabetical Day Format :All letters(Monday)";
      }
      if (this.selectedRadio5 === "DDDD") {
        poly = "Numerical Day Format :DD(01,31)";
      }
      if (this.selectedRadio5 === "DD") {
        poly = "Numerical Day Format :D/DD(1,31)";
      }
      return poly;
    },
    MonthLabel() {
      let poly = "";
      if (this.selectedRadio4 === "MMMM") {
        poly = "All letters(January,December)";
      }
      if (this.selectedRadio4 === "MMM") {
        poly = "3 letters(Jan,Dec)";
      }
      if (this.selectedRadio4 === "MM") {
        poly = "MM(01,12)";
      }
      if (this.selectedRadio4 === "M") {
        poly = "M/MM(1,12)";
      }
      return poly;
    },
    TimeLabel() {
      let poly = "";
      if (this.selectedRadio7 === "t1") {
        poly = "Time :HH/MM/SS";
      }
      if (this.selectedRadio7 === "t2") {
        poly = "Time :HH/MM";
      }
      if (this.selectedRadio7 === "t3") {
        poly = "Time :HH/SS";
      }
      if (this.selectedRadio7 === "t4") {
        poly = "Time :MM/SS";
      }
      if (this.selectedRadio7 === "t5") {
        poly = "Time :HH";
      }
      if (this.selectedRadio7 === "t6") {
        poly = "Time :MM";
      }
      if (this.selectedRadio7 === "t7") {
        poly = "Time :SS";
      }
      return poly;
    },
    textToArr(value) {
      this.listArr = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    textToArr2(value) {
      this.listArr2 = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    textToArr3(value) {
      this.listArr3 = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    textToArr4(value) {
      this.listArr4 = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    textToArr5(value) {
      this.listArr5 = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    textToArr6(value) {
      this.listArr6 = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    textToArr7(value) {
      this.listArr7 = value
        .split(";")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    finalDate() {
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

      if (this.selectedRadio6 === "DMY1") {
        this.Date = fullday + fullmonth + fullyear;
      }
      if (this.selectedRadio6 === "DMY2") {
        this.Date = `${fullday}${fullmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY3") {
        this.Date = `${onlyday}${fullmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY4") {
        this.Date = `${onlyday}${halfmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY5") {
        this.Date = `${onlyday}${halfmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY6") {
        this.Date = `${onlyday}${fullmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY7") {
        this.Date = `${fullday}${halfmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY8") {
        this.Date = `${fullday}${halfmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY9") {
        this.Date = `${onlyday}${halfmonth}${halfyear}`;
      }
   
      if (this.selectedRadio6 === "DMY10") {
        this.Date = `${letday}${letmonth3}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY11") {
        this.Date = `${letday}${letmonth3}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY12") {
        this.Date = `${letday}${fullmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY13") {
        this.Date = `${letday}${fullmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY14") {
        this.Date = `${letday}${halfmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY15") {
        this.Date = `${letday}${halfmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY16") {
        this.Date = `${fullday}${letmonth3}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY17") {
        this.Date = `${onlyday}${letmonth3}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY18") {
        this.Date = `${fullday}${letmonth3}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY19") {
        this.Date = `${onlyday}${letmonth3}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY20") {
        this.Date = `${letdayfull}${letmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY21") {
        this.Date = `${letdayfull}${letmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY22") {
        this.Date = `${fullday}${letmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY23") {
        this.Date = `${fullday}${letmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY24") {
        this.Date = `${onlyday}${letmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY25") {
        this.Date = `${onlyday}${letmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY26") {
        this.Date = `${letdayfull}${fullmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY27") {
        this.Date = `${letdayfull}${fullmonth}${fullyear}`;
      }
      if (this.selectedRadio6 === "DMY28") {
        this.Date = `${letdayfull}${halfmonth}${halfyear}`;
      }
      if (this.selectedRadio6 === "DMY29") {
        this.Date = `${letdayfull}${halfmonth}${fullyear}`;
      }
    },
    finalYear() {
      const current = new Date();
      if (this.selectedRadio3 === "YYYY") {
        this.year = `${current.getFullYear()}`;
      }
      if (this.selectedRadio3 === "YY") {
        const fullyear = `${current.getFullYear()}`;
        this.year = fullyear.slice(-2);
      }
      if (this.selectedRadio3 === "YYY") {
        const fullyear = `${current.getFullYear()}`;
        this.year = fullyear.slice(-2);
        this.year = Number(this.year).toString();
      }
    },
    finalDay() {
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
      if (this.selectedRadio5 === "DDDDD") {
        this.day = weekday[current.getDay()];
      }
      if (this.selectedRadio5 === "DDD") {
        let any = weekday[current.getDay()];
        this.day = any.substring(0, 3);
      }
      if (this.selectedRadio5 === "DDDD") {
        this.day = `${current.getDate()}`;
      }
      if (this.selectedRadio5 === "DD") {
        var temp = "";
        temp = `${current.getDate()}`;
        temp = "0" + temp;
        this.day = temp.slice(-2);
      }
    },
    finalMonth() {
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
      if (this.selectedRadio4 === "MMMM") {
        this.month = month[current.getMonth()];
      }
      if (this.selectedRadio4 === "MMM") {
        let anymonth = month[current.getMonth()];
        this.month = anymonth.substring(0, 3);
      }
      if (this.selectedRadio4 === "MM") {
        var temp = "";
        temp = `${current.getMonth() + 1}`;
        temp = "0" + temp;
        this.month = temp.slice(-2);
      }
      if (this.selectedRadio4 === "M") {
        const any = current.getMonth() + 1;
        this.month = `${any}`;
      }
    },
    finalTime() {
      const current = new Date();
      if (this.selectedRadio7 === "t1") {
        this.time = `${current.getHours()}${current.getMinutes()}${current.getSeconds()}`;
      }
      if (this.selectedRadio7 === "t2") {
        this.time = `${current.getHours()}${current.getMinutes()}`;
      }
      if (this.selectedRadio7 === "t3") {
        this.time = `${current.getHours()}${current.getSeconds()}`;
      }
      if (this.selectedRadio7 === "t4") {
        this.time = `${current.getMinutes()}${current.getSeconds()}`;
      }
      if (this.selectedRadio7 === "t5") {
        this.time = `${current.getHours()}`;
      }
      if (this.selectedRadio7 === "t6") {
        this.time = `${current.getMinutes()}`;
      }
      if (this.selectedRadio7 === "t7") {
        this.time = `${current.getSeconds()}`;
      }
    },
    finalPrefix() {
      let abc = "";
      this.radioarray.push(this.selectedRadio);
      if (this.enable === true) {
        this.prefix = this.message1.toUpperCase();
        this.pretext = this.message1.toUpperCase();
      }
      if (this.disableCheckbox === true) {
        abc = `${"_".repeat(this.selectedRadio)}`;
        this.pretext = this.pre1.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.prefix = abc;
      }
      if (this.enabled === true) {
        abc = `${"_".repeat(this.selectedRadio)}`;
        this.pretext = this.listArr.map((str) =>
          str.substring(0, this.selectedRadio)
        );
        this.pretext = this.pretext.map((str) => str.toUpperCase());
        this.prefix = abc;
      }
    },
    finalSuffix() {
      let abc = "";
      this.radioarray.push(this.selectedRadio2);
      if (this.enable2 === true) {
        this.suffix = this.message2.toUpperCase();
        this.sufftext = this.message2.toUpperCase();
      }
      if (this.disableCheckbox2 === true) {
        abc = `${"_".repeat(this.selectedRadio2)}`;
        this.sufftext = this.suff1.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.suffix = abc;
      }
      if (this.enabled2 === true) {
        abc = `${"_".repeat(this.selectedRadio2)}`;
        this.sufftext = this.listArr2.map((str) =>
          str.substring(0, this.selectedRadio2)
        );
        this.sufftext = this.sufftext.map((str) => str.toUpperCase());
        this.suffix = abc;
      }
    },
    finalText1() {
      let abc = "";
      this.radioarray.push(this.selectedRadio8);
      if (this.enable3 === true) {
        this.text1 = this.message3.toUpperCase();
        this.textext1 = this.message3.toUpperCase();
      }
      if (this.disableCheckbox3 === true) {
        abc = `${"_".repeat(this.selectedRadio8)}`;
        this.textext1 = this.tex1.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.text1 = abc;
      }
      if (this.enabled3 === true) {
        abc = `${"_".repeat(this.selectedRadio8)}`;
        this.textext1 = this.listArr3.map((str) =>
          str.substring(0, this.selectedRadio8)
        );
        this.textext1 = this.textext1.map((str) => str.toUpperCase());
        this.text1 = abc;
      }
    },
    finalText2() {
      let abc = "";
      this.radioarray.push(this.selectedRadio9);
      if (this.enable4 === true) {
        this.text2 = this.message4.toUpperCase();
        this.textext2 = this.message4.toUpperCase();
      }
      if (this.disableCheckbox4 === true) {
        abc = `${"_".repeat(this.selectedRadio9)}`;
        this.textext2 = this.tex2.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.text2 = abc;
      }
      if (this.enabled4 === true) {
        abc = `${"_".repeat(this.selectedRadio9)}`;
        this.textext2 = this.listArr4.map((str) =>
          str.substring(0, this.selectedRadio9)
        );
        this.textext2 = this.textext2.map((str) => str.toUpperCase());
        this.text2 = abc;
      }
    },
    finalText3() {
      let abc = "";
      this.radioarray.push(this.selectedRadio10);
      if (this.enable5 === true) {
        this.text3 = this.message5.toUpperCase();
        this.textext3 = this.message5.toUpperCase();
      }
      if (this.disableCheckbox5 === true) {
        abc = `${"_".repeat(this.selectedRadio10)}`;
        this.textext3 = this.tex3.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.text3 = abc;
      }
      if (this.enabled5 === true) {
        abc = `${"_".repeat(this.selectedRadio10)}`;
        this.textext3 = this.listArr5.map((str) =>
          str.substring(0, this.selectedRadio10)
        );
        this.textext3 = this.textext3.map((str) => str.toUpperCase());
        this.text3 = abc;
      }
    },
    finalText4() {
      let abc = "";
      this.radioarray.push(this.selectedRadio11);
      if (this.enable6 === true) {
        this.text4 = this.message6.toUpperCase();
        this.textext4 = this.message6.toUpperCase();
      }
      if (this.disableCheckbox6 === true) {
        abc = `${"_".repeat(this.selectedRadio11)}`;
        this.textext4 = this.tex4.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.text4 = abc;
      }
      if (this.enabled6 === true) {
        abc = `${"_".repeat(this.selectedRadio11)}`;
        this.textext4 = this.listArr6.map((str) =>
          str.substring(0, this.selectedRadio11)
        );
        this.textext4 = this.textext4.map((str) => str.toUpperCase());
        this.text4 = abc;
      }
    },
    finalText5() {
      let abc = "";
      this.radioarray.push(this.selectedRadio12);
      if (this.enable7 === true) {
        this.text5 = this.message7.toUpperCase();
        this.textext5 = this.message7.toUpperCase();
      }
      if (this.disableCheckbox7 === true) {
        abc = `${"_".repeat(this.selectedRadio12)}`;
        this.textext5 = this.tex5.reduce(
          (accumulator, currentValue) => accumulator + currentValue.toString(),
          ""
        );
        this.text5 = abc;
      }
      if (this.enabled7 === true) {
        abc = `${"_".repeat(this.selectedRadio12)}`;
        this.textext5 = this.listArr7.map((str) =>
          str.substring(0, this.selectedRadio12)
        );
        this.textext5 = this.textext5.map((str) => str.toUpperCase());
        this.text5 = abc;
      }
    },
    finalSequence() {
      this.sequence1 = this.message8;
    },
    notfinal() {
      let abc = {};
      for (let index = 0; index < this.newtodos.length; index++) {
        switch (this.newtodos[index]) {
          case "Prefix":
            this.finalarray.push(this.prefix);
            this.finalarr.push(this.pretext);
            if (this.pretext.length === this.selectedradio) {
              abc.prefix = this.pretext;
            } else if (typeof this.pretext === "object") {
              abc.prefix = "lovs1";
            } else {
              abc.prefix = parseInt(this.selectedRadio);
            }
            break;

          case "Suffix":
            this.finalarray.push(this.suffix);
            this.finalarr.push(this.sufftext);
            if (this.pretext.length === this.selectedRadio2) {
              abc.suffix = this.sufftext;
            } else if (typeof this.sufftext === "object") {
              abc.suffix = "lovs2";
            } else {
              abc.suffix = parseInt(this.selectedRadio2);
            }
            break;

          case "Year":
            this.finalarray.push(this.year);
            this.finalarr.push(this.selectedRadio3);
            abc.year = this.selectedRadio3;
            break;

          case "Month":
            this.finalarray.push(this.month);
            this.finalarr.push(this.selectedRadio4);
            abc.month = this.selectedRadio4;
            break;

          case "Day":
            this.finalarray.push(this.day);
            this.finalarr.push(this.selectedRadio5);
            abc.day = this.selectedRadio5;
            break;

          case "Date":
            this.finalarray.push(this.Date);
            this.finalarr.push(this.selectedRadio6);
            abc.date = this.selectedRadio6;
            break;

          case "Time":
            this.finalarray.push(this.time);
            this.finalarr.push(this.selectedRadio7);
            abc.time = this.selectedRadio7;
            break;

          case "Text1":
            this.finalarray.push(this.text1);
            this.finalarr.push(this.textext1);
            if (this.textext1.length === this.selectedRadio8) {
              abc.text1 = this.textext1;
            } else if (typeof this.textext1 === "object") {
              abc.text1 = "lovs3";
            } else {
              abc.text1 = parseInt(this.selectedRadio8);
            }
            break;

          case "Text2":
            this.finalarray.push(this.text2);
            this.finalarr.push(this.textext2);
            if (this.textext2.length === this.selectedRadio9) {
              abc.text2 = this.textext2;
            } else if (typeof this.textext2 === "object") {
              abc.text2 = "lovs4";
            } else {
              abc.text2 = parseInt(this.selectedRadio9);
            }
            break;

          case "Text3":
            this.finalarray.push(this.text3);
            this.finalarr.push(this.textext3);
            if (this.textext3.length === this.selectedRadio10) {
              abc.text3 = this.textext3;
            } else if (typeof this.textext3 === "object") {
              abc.text3 = "lovs5";
            } else {
              abc.text3 = parseInt(this.selectedRadio10);
            }
            break;

          case "Text4":
            this.finalarray.push(this.text4);
            this.finalarr.push(this.textext4);
            if (this.textext4.length === this.selectedRadio11) {
              abc.text4 = this.textext4;
            } else if (typeof this.textext4 === "object") {
              abc.text4 = "lovs6";
            } else {
              abc.text4 = parseInt(this.selectedRadio11);
            }
            break;

          case "Text5":
            this.finalarray.push(this.text5);
            this.finalarr.push(this.textext5);
            if (this.textext5.length === this.selectedRadio12) {
              abc.text5 = this.textext5;
            } else if (typeof this.textext5 === "object") {
              abc.text5 = "lovs7";
            } else {
              abc.text5 = parseInt(this.selectedRadio12);
            }
            break;

          case "Sequence":
            this.finalarray.push(this.sequence1);
            this.finalarr.push(this.sequence1);
            abc.sequence = this.sequence1;
            break;
        }
      }
      this.polyarr = abc;

      this.final();
      this.postdata();
      this.data();
    },
    final() {
      for (let i = 0; i < this.finalarray.length; i++) {
        this.showresult += this.finalarray[i];
      }
      this.SamData.SData = this.showresult;
      this.PolyData.UserData = this.finalarr;
      this.realtime = this.polyarr;
    },

    async postdata() {
      this.PolyData.Textlength = this.radioarray;
      this.radioarray = [];
      await axios
        .post("http://20.55.43.53:8083/api/items", this.SamData)
        .then((result) => {
          axios
            .post("http://20.55.43.53:8083/api/items2", this.PolyData)
            .then((result) => {
              this.getdata();
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
    async data() {
      this.PolyData.Textlength = this.radioarray;
      this.radioarray = [];

      let realtimearray = [];
      realtimearray.push(this.realtime);
      await axios
        .post("http://20.55.43.53:8083/api/items6", realtimearray)
        .then((result) => {
        })
        .catch((err) => {});
    },

    async getdata() {
      axios
        .get("http://20.55.43.53:8083/api/items")
        .then((result) => {
          let len = result.data.length - 1;
          this.ans = result.data[len].Sdata;
        })
        .catch((err) => {});
    },
    onInput() {
      this.listArr = this.inputs.split(";");
    },
    onInput2() {
      this.listArr2 = this.input2.split(";");
    },
    onInput3() {
      this.listArr3 = this.input3.split(";");
    },
    onInput4() {
      this.listArr4 = this.input4.split(";");
    },
    onInput5() {
      this.listArr5 = this.input5.split(";");
    },
    onInput6() {
      this.listArr6 = this.input6.split(";");
    },
    onInput7() {
      this.listArr7 = this.input7.split(";");
    },
    finalist() {
      let count = {};
      this.newtodos = this.todos.map(function (item) {
        if (item === "Text") {
          count[item] = (count[item] || 0) + 1;
          return `Text${count[item]}`;
        } else {
          return item;
        }
      });
      let arr = this.newtodos;
      const filteredArr = arr.filter(
        (item) => !["Prefix", "Suffix", "Sequence"].includes(item)
      );

      filteredArr.unshift("Prefix");

      filteredArr.push("Suffix", "Sequence");

      this.newtodos = filteredArr;
    },
    selectItem(i) {
      this.selectedItems.push(i);
    },
    moveItem() {
      this.todos = [...this.selectedItems];
    },
    Adam() {
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i] === "Text") this.count1++;
      }
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
<style scoped>
.draggable-list {
  background: white;
  color: #fff;
  border: 1px;
  height: 60vh;
}

html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>