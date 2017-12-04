<template>
	<v-map :zoom="zoom" :center="center" 
    :min-zoom="4" 
    :max-zoom="8"
    ref="map">
		<v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
    <v-marker v-for="marker in markers"
        :lat-lng="[marker.latitude, marker.longitude]"
        :draggable="false"
        :icon="icons[marker.type]==null ?'': icons[marker.type]">
        <v-popup v-if="checkLanguageIfDefined(marker)">
          <h2>{{marker.languages[$parent.currentLanguage].title}}</h2><span>{{marker.languages[$parent.currentLanguage].description}}</span></v-popup>
        <v-popup v-else><h2>{{marker.languages[$parent.defaultLanguage].title}}</h2><span>{{marker.languages[$parent.defaultLanguage].description}}</span></v-popup>
    </v-marker>
  </v-map>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'FinalMap',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup,
  },
  data() {
    return {
      zoom: 4,
      center: [51.1079, 17.0385],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      //url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Europe_location.png/1200px-Europe_location.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [],
      icons: {
        wineIcon : L.icon({
          iconUrl: 'assets/wine-icon.png',
          iconSize:     [21, 21], // size of the icon
        }),
        cheeseIcon : L.icon({
          iconUrl: 'assets/cheese-icon.png',
          iconSize:     [21, 21], // size of the icon
        })
      },
      maxBounds : L.latLngBounds(L.latLng(27.797124, -40.783573), L.latLng(74.406476, 37.218277)),
    }
  },
  mounted() {
    var mapLeaftlet = this.$refs.map.mapObject;
    let maxBounds = this.maxBounds;
    mapLeaftlet.fitBounds(maxBounds);
    mapLeaftlet.setMaxBounds(maxBounds);
    mapLeaftlet.on('drag', function() {
    mapLeaftlet.panInsideBounds(maxBounds, { animate: false });
    });
    axios.get('http://localhost:8080/marks')
          .then(response => {this.markers = response.data, console.log(this.markers)})
          .catch(error => { console.log(error)});
    this.$root.$on('closePopup', function () {
      mapLeaftlet.closePopup();
    })
  },
  methods: {
    checkLanguageIfDefined(marker){
      if(typeof marker.languages[this.$parent.currentLanguage]!=='undefined'&& marker.languages[this.$parent.currentLanguage]!=null)
        if((typeof marker.languages[this.$parent.currentLanguage].title!=='undefined' && marker.languages[this.$parent.currentLanguage].title!=null)
          &&(typeof marker.languages[this.$parent.currentLanguage].description!=='undefined'&& marker.languages[this.$parent.currentLanguage].description!=null))
          return true;
      return false;
    },
    chooseIcon(type) {
      if(type==null)
        return "";
      window.type;
      return 'wineIcon';
    }    
  }
}
</script>