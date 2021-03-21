<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button
          :onclick="openMenu()"
          auto-hide="false"
        ></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  menuController
} from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton
  },
  props: {
    title: String
  },
  methods: {
    openMenu() {
      this.$emit('openMenu')
    }
  }
})
</script>
