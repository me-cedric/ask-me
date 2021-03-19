<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Ask me</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-if="isUserAuth" class="section">
        Welcome {{ user.displayName }}
      </div>

      <ion-list>
        <ion-item
          v-for="subject in subjects"
          :key="subject"
          :href="'/subject/' + subject.id"
        >
          <ion-card>
            <img :src="subject.image" />
            <ion-card-header>
              <ion-card-title>{{ subject.name }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              {{ getQCount(subject) }} question{{
                getQCount(subject) > 1 ? 's' : ''
              }}
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Subject } from '@/data/subject'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonItem
  },
  data: (): any => ({}),
  methods: {
    ...mapActions(['getSubjectsAction']),
    getQCount(subject: Subject) {
      return subject.questions.length
    }
  },
  mounted() {
    this.getSubjectsAction()
  },
  computed: {
    ...mapGetters(['user', 'isUserAuth', 'subjects'])
  }
})
</script>
