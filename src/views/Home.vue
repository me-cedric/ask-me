<template>
  <ion-page>
    <navbar title="Ask me"></navbar>

    <ion-content :fullscreen="true" id="content">
      <div v-if="isUserAuth" class="section">
        Welcome {{ user.displayName }}
      </div>

      <ion-list>
        <ion-item
          lines="none"
          detail="false"
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
  IonPage,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonItem,
    Navbar
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
