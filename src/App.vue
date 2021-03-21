<template>
  <ion-app>
    <ion-menu
      side="start"
      menu-id="first"
      content-id="content"
      id="menu-avatar"
    >
      <ion-content>
        <ion-grid id="header">
          <ion-row class="ion-justify-content-center">
            <ion-avatar>
              <img :src="chosenPicture || placeholder" />
            </ion-avatar>
          </ion-row>
          <ion-row>
            <ion-col size="12" class="ion-text-center">
              <h3>{{ user?.displayName }}</h3>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-list>
          <ion-item detail="false" v-for="p of pages" :key="p" :href="p.link">
            <ion-icon slot="start" :icon="p.icon"></ion-icon>
            <ion-label> {{ p.title }} </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonList,
  IonCol,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { useRoute } from 'vue-router'
import { User } from './data/user'
import { addOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonCol,
    IonGrid,
    IonRow,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon
  },
  data: (): any => ({
    path: null,
    pages: [
      { title: 'Subject', icon: addOutline, link: '/add/subject' },
      { title: 'Question', icon: addOutline, link: '/add/question' }
    ],
    placeholder:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  }),
  methods: {
    ...mapActions(['authAction'])
  },
  computed: {
    ...mapGetters(['user', 'isUserNotAuthed']),
    notAuthed() {
      return this.isUserNotAuthed
    },
    chosenPicture() {
      return ((this.user as unknown) as User)?.photoURL
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

<style lang="scss" scoped>
// Sidemenu with avatar
#menu-avatar {
  .icon-badge {
    top: 0px;
    right: 0px;
    background: #ff5d5d;
    color: white;
    font-size: 12px;
    position: absolute;
    padding: 5px 8px;
    border-radius: 15px;
  }

  .user-avatar {
    padding: 0.5em;
  }
  h3,
  .label {
    color: white;
    font-weight: bold;
  }
  .item {
    background: transparent;
  }
  ion-content {
    background: linear-gradient(
      48deg,
      rgba(157, 72, 173, 0.8) 0%,
      rgba(157, 72, 173, 0.86) 28%,
      rgba(0, 168, 168, 0.98) 93%,
      rgba(0, 168, 168, 1) 100%
    );
  }
  .menu-inner {
    background: rgba(255, 255, 255, 0.3);
  }
}

// Material Design Sidemenu
#menu-material {
  .menu-header {
    padding: 5px 15px;
    // background-image: url('../assets/img/misc/material-design-background.jpg');
    background-size: cover;
    color: white;
    .name {
      font-weight: 500;
      margin-bottom: 3px;
    }
    .e-mail {
      margin-top: 0;
      margin-bottom: 5px;
    }
  }
  .user-avatar {
    padding: 0.5em;
    height: 12vh;
  }
  h3,
  .label {
    color: #999;
    font-weight: 400;
  }
  ion-icon {
    color: #777;
  }
}
</style>
