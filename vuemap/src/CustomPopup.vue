<template>
    <v-popup :content="title" :maxWidth='auto'><h3>{{title}}</h3><span>{{body}}</span></v-popup>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'CustomPopup',
  components: {
    'v-popup': Vue2Leaflet.Popup,
    'language': Language,
  },
  props: ['title', 'body']
}
</script>