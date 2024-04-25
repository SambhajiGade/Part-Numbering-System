<template>
  <v-app id="inspire" class="blue lighten-5">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Admin</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-icon left> mdi-account </v-icon>
                    <v-text-field
                      name="login"
                      label="Login"
                      type="text"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-icon left> mdi-lock </v-icon>
                    <v-text-field
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" to="/pnsapp">Login</v-btn>
              
                <v-spacer></v-spacer>
                <div class="orange--text">Are you User?</div>
                <v-btn text to="/">Click Here</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>