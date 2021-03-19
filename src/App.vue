<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data: (): any => ({
    path: null
  }),
  methods: {
    ...mapActions(['authAction'])
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
