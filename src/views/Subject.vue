<template>
  <ion-page>
    <navbar :title="subject.name"></navbar>

    <ion-content :fullscreen="true" id="content">
      {{ subject }}
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  name: 'Subject',
  components: {
    IonContent,
    IonPage,
    Navbar
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
