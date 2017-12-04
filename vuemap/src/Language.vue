<template>
      <div class="tabs is-centered is-boxed">
        <ul>
          <li :class="{'is-active': language.code == $parent.currentLanguage }" v-for="language in languages">
            <a @click="selectLanguage(language)">
              <span><img v-bind:src="'assets/'+language.img" style="width:32px;height:32px;"></span>
              <span>{{ language.languagename }}</span>
            </a>
          </li>
        </ul>
      </div>
</template>
<script>
export default {
  name: 'Language',
  data() {
    return {
      languages: [
				{ languagename:"English", code:"en", img: "flag_uk.png"},
				{ languagename:"Spanish", code:"sp", img: "flag_spain.png"},
				{ languagename:"French", code:"fr", img: "flag_france.png" },
				{ languagename:"German", code:"gr", img: "flag_germany.png" },
				{ languagename:"Dutch", code:"du",img: "flag_netherlands.png" }]
    }
  },
  methods: {
    /*modifyLanguage(selectedLang) {
			this.languages.forEach(lang => {
				tab.isActive = (tab.name == selectedTab.name);
			})
		},*/
    selectLanguage(selectedLanguage) {     
      if(this.$parent.currentLanguage != selectedLanguage.code) {
        this.$parent.currentLanguage = selectedLanguage.code;
        this.$root.$emit('closePopup', this);      
      }
    }
  }
}
</script>