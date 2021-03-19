<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Ask me</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      {{ subject }}
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Subject',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data: (): any => ({}),
  methods: {
    ...mapActions(['getSubjectAction'])
  },
  mounted() {
    const route = useRoute()
    const { id } = route.params
    this.getSubjectAction(id)
  },
  computed: {
    ...mapGetters(['subject'])
  }
})
</script>
