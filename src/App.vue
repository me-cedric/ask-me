<template>
  <ion-app>
    <ion-menu side="start" menu-id="first" content-id="content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Start Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet :openMenu="openFirst()" />
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  menuController
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem
  },
  data: (): any => ({
    path: null
  }),
  methods: {
    ...mapActions(['authAction']),
    openFirst() {
      menuController.enable(true, 'first')
      menuController.open('first')
    }
  },
  computed: {
    ...mapGetters(['user', 'isUserNotAuthed']),
    notAuthed() {
      return this.isUserNotAuthed
    }
  },
  mounted() {
    const route = useRoute()
    this.path = route.path
    this.authAction()
  },
  watch: {
    notAuthed(newNotAuthed) {
      if (newNotAuthed && this.path != '/login') {
        this.$router.push('/login')
      } else if (!newNotAuthed && this.path == '/login') {
        this.$router.push('/')
      }
    }
  }
})
</script>
