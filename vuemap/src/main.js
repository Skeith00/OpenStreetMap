import Vue from 'vue'
import FinalMap from './FinalMap.vue';
import Language from './Language.vue';
require("bulma/css/bulma.css");
require("leaflet/dist/leaflet.css");

new Vue({
  el: '#app',
  data: {
      currentLanguage: "en",
      defaultLanguage: "en",
  },
  components: {
    'v-finalmap': FinalMap,
    'language': Language,
  }
});
