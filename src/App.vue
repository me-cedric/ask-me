<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
    ...mapActions(['authAction'])
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth']),
    authed() {
      return this.isUserAuth
    }
  },
  mounted() {
    this.authAction()
  },
  watch: {
    authed(newAuthed) {
      this.$router.push(newAuthed ? '/' : '/login')
    }
  }
})
</script>
