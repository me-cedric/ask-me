<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Inbox</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Register</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-content>
          <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
            <ion-button @click="resetError()" class="delete"></ion-button>
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="margin-top:0.3em; margin-left: 1em">
                <li
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
            </div>
          </div>
          <form>
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <ion-button
                  @click.prevent="validate()"
                  class="button is-success"
                >
                  Login
                </ion-button>
              </p>
            </div>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data: (): any => ({
    email: null,
    password: null,
    validationErrors: []
  }),
  methods: {
    ...mapActions(['signInAction']),
    resetError() {
      this.validationErrors = []
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError()

      // email validation
      if (!this.email) {
        this.validationErrors.push('<strong>E-mail</strong> cannot be empty.')
      }
      if (/.+@.+/.test(this.email) != true) {
        this.validationErrors.push('<strong>E-mail</strong> must be valid.')
      }
      // password validation
      if (!this.password) {
        this.validationErrors.push('<strong>Password</strong> cannot be empty')
      }
      if (/.{6,}/.test(this.password) != true) {
        this.validationErrors.push(
          '<strong>Password</strong> must be at least 6 characters long'
        )
      }
      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signIn()
      }
    },
    signIn() {
      this.signInAction({ email: this.email, password: this.password })
    }
  }
})
</script>
