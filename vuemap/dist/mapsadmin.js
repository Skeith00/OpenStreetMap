var bus = new Vue();
/*
 * https://github.com/Haixing-Hu/vue-html-editor 
 * Package to include Rich TextBox Editor 
 * It would be interesting to include in future versions
 */

Vue.component('admin', {
	template: `
	<div class="columns is-multiline">
		<adminpanelmarks/></adminpanelmarks>
		<adminpanelinsert/></adminpanelinsert>
	</div>
	`,
});

Vue.component('adminpanelinsert', {
	template: `
	<form id="form" class="column is-half">
		<div class="box">
			<div class="field">
				<label class="label">Latitude</label>
				<div class="control">
					<input :class="['input', validations.latitude?'':'is-danger']" type="number" placeholder="e.g 41.3851" v-model="markerInsert.latitude">
					<p class="help is-danger" v-show="!validations.latitude">Valid latitude is required</p>
				</div>
			</div>
			<div class="field">
				<label class="label">Longitude</label>
				<div class="control">
					<input :class="['input', validations.longitude?'':'is-danger']" type="number" placeholder="e.g 2.1734" v-model="markerInsert.longitude">
				</div>
				<p class="help is-danger" v-show="!validations.longitude">Valid longitude is required</p>
			</div>
			<div class="field">
				<div class="control">
					<label class="label">Category</label>
					<label class="radio">
						<input type="radio" name="category" value="wineIcon" v-model="markerInsert.type">
						<img src="assets/wine-icon.png">
					</label>
					<label class="radio">
						<input type="radio" name="category" value="cheeseIcon" v-model="markerInsert.type">
						<img src="assets/cheese-icon.png">
					</label>
					<p class="help is-danger" v-show="!validations.type">Category is required</p>				
				</div>
			</div>			
			<div class="field box" style="margin-top: 8px;">
				<div class="control">
					<div class="select">
						<select v-model="selected">
							<option v-bind:value="language.code" v-for="language in languages" :disabled="(language.code=='en'||!multilanguageDisabled)?false:true">
								{{language.languagename}}
							</option>
						</select>
					</div>
					<languageForm :languagecode="selected">
					</languageForm>
				</div>
			</div>				
		</div>
		<label style="float: right;">
			<a @click="addMark"><i class="ion-plus-circled" style="font-size:40px;color:grey;"></i></a>		
		</label>
	</form>
	`,
	methods: {
		addMark() {
			if(this.validateFields()) {
				bus.$emit('addingRow', this.markerInsert);
				this.reset();
			}
		},
		reset() {
			this.markerInsert = { latitude:"", longitude:"", languages:{}, type:""};
			this.validations = {latitude:true, longitude:true, type:true, title:true, desc:true};		
			for(index in this.languages) {
				this.markerInsert.languages[this.languages[index].code] = {};
			}
		},
		validateFields() {
			this.validations = {latitude:true, longitude:true, type:true, title:true, desc:true};
			if(function(lat){return !isFinite(lat)||Math.abs(lat)>90||lat==""}(this.markerInsert.latitude))
				this.validations.latitude = false;
			if(function(long){return !isFinite(long)||Math.abs(long)>180||long==""}(this.markerInsert.longitude)) 
				this.validations.longitude = false;
			if(this.markerInsert.type=="")
				this.validations.type = false;
			if(this.markerInsert.languages[this.$root.defaultLanguage].description==""||this.markerInsert.languages[this.$root.defaultLanguage].description==null)
				this.validations.title = false;
			if(this.markerInsert.languages[this.$root.defaultLanguage].title==""||this.markerInsert.languages[this.$root.defaultLanguage].description==null)
				this.validations.desc = false;			
			
			return this.validations.latitude&&this.validations.longitude&&this.validations.type&&this.validations.title&&this.validations.desc;
		},
		checkDropdown(){
			this.multilanguageDisabled = (this.markerInsert.languages[this.$root.defaultLanguage].description==""||this.markerInsert.languages[this.$root.defaultLanguage].title=="");
		}
	},
	data() {
		return { 
			markerInsert: { latitude:"", longitude:"", languages:{}},
			languages: [
				{ languagename:"English", code:"en", img: "flag_uk.png"},
				{ languagename:"Spanish", code:"sp", img: "flag_spain.png"},
				{ languagename:"French", code:"fr", img: "flag_france.png" },
				{ languagename:"German", code:"gr", img: "flag_germany.png" },
				{ languagename:"Dutch", code:"du", img: "flag_netherlands.png" }],
			selected: 'en',
			validations: {latitude:true, longitude:true, type:true, title:true, desc:true},
			multilanguageDisabled:true,
		}
	},
	created() {
		bus.$on('loadRow', function(marker){
			this.markerInsert = marker;
		}.bind(this));
		this.reset();
	}
});

Vue.component('languageForm', {
	template: `
	<div style="margin-top: 10px;">
		<div v-for="language in $parent.languages" v-show="(language.code == languagecode)">
			<div class="field">
				<label class="label">Title in {{language.languagename}}</label>
				<div class="control">
					<input :class="['input', $parent.validations.title?'':'is-danger']" type="text" placeholder="e.g Barcelona Winery" v-model="$parent.markerInsert.languages[language.code].title" @keyup="$parent.checkDropdown">
				</div>
				<p class="help is-danger" v-show="((language.code==$root.defaultLanguage)&&(!$parent.validations.title))">English Title is required</p>
			</div>
			<div class="field">
				<div class="control">
					<label class="label">Description in {{language.languagename}}</label>
					<textarea :class="['textarea', $parent.validations.desc?'':'is-danger']" placeholder="e.g Winery powered by TBSCG"
						rows="4" cols="50" v-model="$parent.markerInsert.languages[language.code].description" @keyup="$parent.checkDropdown">
					</textarea>
					<p class="help is-danger" v-show="((language.code==$root.defaultLanguage)&&(!$parent.validations.desc))">English Description is required</p>														
				</div>
			</div>
		</div>
	</div>
	`,
	props: ['languagecode'],
});


Vue.component('adminpanelmarks', {
	template: `
	 <div class="column is-half">
		<table class="table">
			<thead>
				<tr>
				<th>Latitude</th>
				  <th>Longitude</th>
				  <th>Title</th>
  				  <th>Options</th>
				</tr>
			</thead>
			<markermaps></markermaps>
		</table>
	  </div>
	`
});

Vue.component('markermaps', {
	template: `
		<tbody>
			<tr v-for="(marker, index) in markersArr">
			  <td>{{marker.latitude}}</td>
			  <td>{{marker.longitude}}</td>
			  <td width=150px><a :href="'http://www.openstreetmap.org/?lat='+marker.latitude+'&lon='+marker.longitude+'&zoom=13&layers=H'" target="_blank">{{marker.languages.en.title}}</a></td>
			  <td>
				<a><i class="ion-edit" style="font-size:20px;color:grey;" @click=loadMarker(index)></i></a>
				<a @click="eliminateMark(marker)">
					<i class="ion-close-circled" style="font-size:20px;color:grey;"></i>
				</a>
			  </td>
			</tr>
			<a @click="saveMarks" v-if="saveIcon"><i class="ion-bookmark" style="font-size:30px;color:grey;"></i></a>
		</tbody>
	`,
	data(){
		return {
			markersArr: [],
			saveIcon: true
		}
	},
	created() {
		this.getMarks();
		bus.$on('addingRow', function(markerInsert){
			this.markersArr.push(markerInsert);
			this.saveIcon = true;			
		}.bind(this));
	},
	methods: {
		getMarks() {
		$.get( "http://localhost:8080/marks")
			.done( function(data){
			// Create markers.
				this.markersArr = data;
			}.bind(this)).fail( function(){
				alert("It has been a problem loading map markers from JSON");
			});	
		},
		eliminateMark(marker) {
			const index = this.markersArr.indexOf(marker);
			if (index !== -1) {
				this.markersArr.splice(index, 1);
				this.saveIcon = true;
			}
		},
		saveMarks() {
			$.ajax({
				origin: "*",
				type: "POST",
				url: "http://localhost:8080/marks",
				data: JSON.stringify(this.markersArr),
				contentType: "application/json"
			})
			.done( function(data){
				// Create markers.
				alert(data);
				this.saveIcon = false;
			}.bind(this)).fail( function(err) {
				alert("It has been a problem loading map markers from JSON");
			});
		},
		loadMarker(index) {
			var r = confirm("Do you want to load Marker? You will lose all data in the form");
			if (r == true) {
				let tempmarker = this.markersArr[index];				
				this.markersArr.splice(index, 1);
				bus.$emit('loadRow', tempmarker);
			}
		}
	}
});

new Vue({
	el: '#main',
	data: {
		defaultLanguage: "en",			
	}
});