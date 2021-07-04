<template>
  <b-container fluid>
    <b-row>
      <b-col md="9">
        <h1>Discover the top series around the world</h1>
        <b-row class="content-wrapper">
          <b-col md="2">
            <h3>Select movie genres</h3>
            <div v-for="(genre,index) in genres" :key="'genre-'+index"
                 :class="['genre',{'selected' : selectedGenres.includes(genre.name)}]" @click="toggleGenre(genre.name)">
              <div class="circle" :style="'background-color: '+ genre.color + ';'"/>
              {{ genre.name }}
            </div>
            <label class="switch">
              <input type="checkbox" v-model="customizeGenres">
              <div class="slider round">
                <span class="on">Customize</span>
                <span class="off">All</span>
              </div>
            </label>
          </b-col>
          <b-col md="10">
            <div class="show-place-wrapper">
                <div :class="['show-place',{'active': showNumber},{'between': showNumberbetween}]" key="11">
                  <h1>{{ topNumber }}</h1>
                  <h5 v-if="selectedShow">{{ selectedShow.SeriesName }}</h5>
                  <h5 v-else>Not available</h5>
                </div>
              <transition name="fade" mode="out-in">
                <img :src="require('../assets/images/top-1.png')" usemap="#image-map" v-if="topNumber===1" key="1">
                <img :src="require('../assets/images/top-2.png')" usemap="#image-map" v-else-if="topNumber===2" key="2">
                <img :src="require('../assets/images/top-3.png')" usemap="#image-map" v-else-if="topNumber===3" key="3">
                <img :src="require('../assets/images/top-4.png')" usemap="#image-map" v-else-if="topNumber===4" key="4">
                <img :src="require('../assets/images/top-5.png')" usemap="#image-map" v-else-if="topNumber===5" key="5">
                <img :src="require('../assets/images/top-6.png')" usemap="#image-map" v-else-if="topNumber===6" key="6">
                <img :src="require('../assets/images/top-7.png')" usemap="#image-map" v-else-if="topNumber===7" key="7">
                <img :src="require('../assets/images/top-8.png')" usemap="#image-map" v-else-if="topNumber===8" key="8">
                <img :src="require('../assets/images/top-9.png')" usemap="#image-map" v-else-if="topNumber===9" key="9">
                <img :src="require('../assets/images/top-10.png')" usemap="#image-map" v-else-if="topNumber===10" key="10">
              </transition>
              <map name="image-map">
                <area target="" alt="10" title="10" coords="242,252,148" shape="circle" @click="displayShow(10)">
                <area target="" alt="9" title="9" coords="240,255,163" shape="circle" @click="displayShow(9)">
                <area target="" alt="8" title="8" coords="242,254,173" shape="circle" @click="displayShow(8)">
                <area target="" alt="7" title="7" coords="243,251,183" shape="circle" @click="displayShow(7)">
                <area target="" alt="6" title="6" coords="244,251,192" shape="circle" @click="displayShow(6)">
                <area target="" alt="5" title="5" coords="248,248,199" shape="circle" @click="displayShow(5)">
                <area target="" alt="4" title="4" coords="245,249,213" shape="circle" @click="displayShow(4)">
                <area target="" alt="3" title="3" coords="248,249,223" shape="circle" @click="displayShow(3)">
                <area target="" alt="2" title="2" coords="249,251,233" shape="circle" @click="displayShow(2)">
                <area target="" alt="1" title="1" coords="245,251,249" shape="circle" @click="displayShow(1)">
              </map>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="3">
        <b-col md="4" @click="selectYear(series.year)" v-for="series in Series" :key="series.year"
               :class="['year',{'selected' : selectedYear === series.year}]">
          <span>
          {{ series.year }}
          </span>
        </b-col>
        <b-col md="12" style="margin-top: 6em;">
          <h3>Available countries to explore</h3>
          <b-col md="4" v-for="(country,index) in countries"
                 :class="['country',{'selected' : selectedCountries.includes(country)}]" :key="'country-'+index"
                 @click="toggleCountry(country)">
            {{ country }}
          </b-col>
          <b-col md="12">
            <label class="switch">
              <input type="checkbox" v-model="customizeCountries">
              <div class="slider round">
                <span class="on">Customize</span>
                <span class="off">All</span>
              </div>
            </label>
          </b-col>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    // import Vue from 'vue'
    // import graphBubblecloud from 'vue-graph/src/components/bubblecloud'
    // import Tooltip from 'vue-graph/src/widgets/tooltip'
    // Vue.use(tooltip)
    export default {
        name: "TopShows",
        props: ["show"],
        components: {
            // graphBubblecloud,
            // Tooltip
        },
        computed: {
            selectedShow() {
                if (this.topNumber > 0) {
                    if (this.top10List[this.topNumber - 1]) {
                        return this.top10List[this.topNumber - 1];
                    }
                }
                return null;
            },
            Formatted() {
                let vm = this;
                let series = [];
                (this.Series.find(element => element.year === this.selectedYear)).children.forEach(function (property) {
                    let exists = series.find(element => element[0] === property.SeriesName);
                    if (exists === undefined) {
                        let compatibleGenres = true;
                        let compatibleCountries = true;
                        if (vm.customizeGenres) {
                            const result = vm.selectedGenres.find(genre => property.Genre.includes(genre));
                            if (result === undefined) {
                                compatibleGenres = false;
                            }
                        }
                        if (vm.customizeCountries) {
                            const result = vm.selectedCountries.find(country => country.includes(property.Country));
                            if (result === undefined) {
                                compatibleCountries = false;
                            }
                        }
                        if (compatibleGenres && compatibleCountries) {
                            series.push(property)
                        }
                    } else {
                        let exists = series.findIndex(element => element[0] === property.SeriesName);
                        series[exists][1] += property.AverageDailyDEx;
                    }
                });

                let uniqueChars = [];
                series.forEach((c) => {
                    if (uniqueChars.findIndex(element => element.SeriesName === c.SeriesName) === -1) {
                        uniqueChars.push(c);
                    }
                });
                return uniqueChars;
            },
            top10List() {
                return this.Formatted.slice(0, 10);
            },
            countries() {
                return (this.Series.find(element => element.year === this.selectedYear)).countries;
            },
            genres() {
                return (this.Series.find(element => element.year === this.selectedYear)).genres;
            }
        },
        methods: {
            displayShow(place) {
                let vm = this;
                this.showNumber = false;
                this.showNumberbetween = false;
                this.topNumber = place;
                setTimeout(function(){ vm.showNumberbetween = true; }, 500);
                setTimeout(function(){ vm.showNumber = true; }, 1000);

            },
            clickSeries(e) {
                let vm = this;
                let finalList = [];
                let showList = (this.Series.find(element => element.year === this.selectedYear)).children.filter(function (obj) {
                    return obj.SeriesName === e.data[0];
                });
                showList.forEach(show => {
                    let showsInCountry = (this.Series.find(element => element.year === this.selectedYear)).children.filter(function (obj) {
                        return show.Country === obj.Country;
                    });
                    finalList.push({
                        name: show.SeriesName,
                        place: showsInCountry.findIndex(element => element.SeriesName === e.data[0]) + 1,
                        country: show.Country,
                        genre: vm.Genres.find(element => show.Genre.includes(element.name)),
                    });
                });
                this.$router.push({name: 'Details', params: {mapData: finalList}})
            },
            selectYear(year) {
                this.selectedYear = year;
                this.selectedCountries = [];
                this.selectedGenres = [];
            },
            toggleGenre(genre) {
                if (this.selectedGenres.includes(genre)) {
                    this.selectedGenres = this.selectedGenres.filter(e => e !== genre);
                } else {
                    this.selectedGenres.push(genre);
                }
            },
            toggleCountry(country) {
                if (this.selectedCountries.includes(country)) {
                    this.selectedCountries = this.selectedCountries.filter(e => e !== country);
                } else {
                    this.selectedCountries.push(country);
                }
            },
            colors: function (data) {
                const genre = this.Genres.find(element => data[2].includes(element.name));
                return genre.color;
            },
            hoverEffect(obj) {
                console.log(obj)
            }
        },
        data() {
            return {
                // top10List: [],
                showNumber: true,
                showNumberbetween: true,
                topNumber: 0,
                customizeGenres: false,
                customizeCountries: false,
                selectedGenres: [],
                selectedYear: 2018,
                selectedCountries: [],
                styles: {
                    titleFontSize: 0,
                    titleFontWeight: 'bold',
                    backgroundColor: "black",
                    // bubbleCloudFontSize: 0,
                },
                Genres: [
                    {name: "Horror", color: "#88334e"},
                    {name: "Sci-Fi", color: "#ffffff"},
                    {name: "Action", color: "#ff6237"},
                    {name: "Adventure", color: "#66a75f"},
                    {name: "Comedy", color: "#383838"},
                    {name: "Drama", color: "#e30914"},
                    {name: "Children", color: "#303e92"},
                    {name: "Reality", color: "#cfeea8"},
                    {name: "Fiction", color: "#a35d7d"},
                    {name: "Crime", color: "#8ed420"},
                    {name: "Animation", color: "#d3ba0c"},
                    {name: "Thriller", color: "#805713"},
                    {name: "Fantasy", color: "#159644"},
                    {name: "Documentary", color: "#fb7c9c"},
                    {name: "Sitcom", color: "#03f88b"},
                    {name: "Mystery", color: "#6f49dc"},
                    {name: "Game Show", color: "#fc368e"},
                    {name: "Telenovela", color: "#1d2b2f"},
                    {name: "Serial", color: "#fe1a10"},
                    {name: "Manga Series", color: "#8c9d4a"},
                    {name: "Romantic", color: "#63c1bb"},
                    {name: "Science Fantasy", color: "#270354"},
                    {name: "Musical", color: "#18cf04"}
                ],
                Series: [
                    {
                        "year": 2018,
                        "countries": ["Australia", "Brazil", "Canada", "France", "Germany", "Italy", "Mexico", "South Africa", "Spain", "United Kingdom", "United States"],
                        "genres": [
                            {name: "Horror", color: "#88334e"},
                            {name: "Sci-Fi", color: "#ffffff"},
                            {name: "Action", color: "#ff6237"},
                            {name: "Adventure", color: "#66a75f"},
                            {name: "Comedy", color: "#383838"},
                            {name: "Drama", color: "#e30914"},
                            {name: "Children", color: "#303e92"},
                            {name: "Reality", color: "#cfeea8"},
                            {name: "Fiction", color: "#a35d7d"},
                            {name: "Crime", color: "#8ed420"},
                        ],
                        "children":
                            [{
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 23759174.070641015
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 7783469.591918295
                            }, {
                                "SeriesName": "Titans",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 34380967.09957407
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 20563103.176917877
                            }, {
                                "SeriesName": "Star Trek: Discovery",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "CBS All Access",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 2725607.182894077
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 8129719.959956639
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 24884459.676661734
                            }, {
                                "SeriesName": "Marvel's Daredevil",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 3418517.250014456
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 16637005.246034643
                            }, {
                                "SeriesName": "Altered Carbon",
                                "Country": "Australia",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 34570361.00366438
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 20692636.224094156
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 3233848.912226216
                            }, {
                                "SeriesName": "Voltron: Legendary Defender",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Children",
                                "AverageDailyDEx": 12068851.945054939
                            }, {
                                "SeriesName": "Queer Eye",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Reality",
                                "AverageDailyDEx": 10362486.833339553
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 7964352.081740537
                            }, {
                                "SeriesName": "Star Trek: Discovery",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "CBS All Access",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 33340245.04134418
                            }, {
                                "SeriesName": "Ozark",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 14624305.401583819
                            }, {
                                "SeriesName": "Marvel's Daredevil",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 36409653.599699885
                            }, {
                                "SeriesName": "Marvel’s Luke Cage",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 19099281.501136687
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "United States",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 39310258.85217926
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 6301817
                            }, {
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 5011887
                            }, {
                                "SeriesName": "La Casa De Papel (Money Heist)",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Antena 3/ Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 4930702
                            }, {
                                "SeriesName": "Titans",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 4068909
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 3671005
                            }, {
                                "SeriesName": "Luis Miguel, La Serie",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Telemundo/ Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 3498038
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 2838494
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 2833209
                            }, {
                                "SeriesName": "Club De Cuervos",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy",
                                "AverageDailyDEx": 2813632
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "Mexico",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 2760418
                            }, {
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 33603555.47674644
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 403007.37214774877
                            }, {
                                "SeriesName": "Titans",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 42020032.95708823
                            }, {
                                "SeriesName": "Star Trek: Discovery",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "CBS All Access",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 16280743.36010531
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 3910329.256398536
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 41724814.92296313
                            }, {
                                "SeriesName": "Marvel's Daredevil",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 9250402.911971385
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 24263314.271413717
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 3219756.64604726
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "United Kingdom",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 3187853.619336657
                            }, {
                                "SeriesName": "La Casa De Papel / Money Heist",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 17498330.092364773
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 10257363.164180145
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 19077781.25322644
                            }, {
                                "SeriesName": "Cable Girls (Las Chicas Del Cable)",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 40302104.6427985
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 14627760.496252293
                            }, {
                                "SeriesName": "Sense8",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 39480476.733110115
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 20038568.373913933
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 17818083.644058485
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 26246850.681330476
                            }, {
                                "SeriesName": "The Last Kingdom",
                                "Country": "Spain",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 38201083.726651005
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 21115242.047734182
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 19302170.086426742
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 32383488.806855686
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 5041231.571312699
                            }, {
                                "SeriesName": "The Crown",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 29656400.62808178
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 36178396.21925621
                            }, {
                                "SeriesName": "Altered Carbon",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 9801819.28434046
                            }, {
                                "SeriesName": "Marvel’s The Punisher",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Action/Fiction",
                                "AverageDailyDEx": 27458782.651025835
                            }, {
                                "SeriesName": "Mindhunter",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Crime",
                                "AverageDailyDEx": 1
                            }, {
                                "SeriesName": "Marvel’s Jessica Jones",
                                "Country": "South Africa",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 10364534.084325394
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 14432886.599913953
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 22610987.035513
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 19094951.836718667
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 30783433.73145813
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 4800552.334566144
                            }, {
                                "SeriesName": "La Casa De Papel / Money Heist",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 19328627.209603492
                            }, {
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 39807927.57316956
                            }, {
                                "SeriesName": "Baby",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 44107181.02939819
                            }, {
                                "SeriesName": "Sense8",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 3140724.1192367487
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "Italy",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 32409659.804949798
                            }, {
                                "SeriesName": "Star Trek: Discovery",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "CBS All Access",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 38928393.504915476
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 19197331.354526505
                            }, {
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 19581944.02791128
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 37418915.27890587
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 25456551.50794065
                            }, {
                                "SeriesName": "Titans",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 16084317.806680115
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 31545326.09267193
                            }, {
                                "SeriesName": "La Casa De Papel / Money Heist",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 40009881.94249524
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 28693857.19486449
                            }, {
                                "SeriesName": "Marvel's Daredevil",
                                "Country": "Germany",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 27833177.03343449
                            }, {
                                "SeriesName": "La Casa De Papel / Money Heist",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 8398609.291777067
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 22231877.11767792
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 14242615.122837951
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 13123644.790635427
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 13083720.547569618
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 5928344.012990287
                            }, {
                                "SeriesName": "Sense8",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 19749889.964523196
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 40751629.09498767
                            }, {
                                "SeriesName": "Titans",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 43109917.96050093
                            }, {
                                "SeriesName": "Marvel's Daredevil",
                                "Country": "France",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 20918804.786868494
                            }, {
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 17332375.018481154
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 37157761.33827106
                            }, {
                                "SeriesName": "Titans",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 1201512.568271385
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 28640676.84284713
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 20347007.59859707
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 23027010.359594937
                            }, {
                                "SeriesName": "Marvel's Daredevil",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 5029752.09707219
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 2106111.334521096
                            }, {
                                "SeriesName": "Narcos",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 32826683.36682451
                            }, {
                                "SeriesName": "Ozark",
                                "Country": "Canada",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 7116028.175926098
                            }, {
                                "SeriesName": "La Casa De Papel (Money Heist)",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Antena 3/ Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 17528268
                            }, {
                                "SeriesName": "Stranger Things",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 11071019
                            }, {
                                "SeriesName": "Chilling Adventures Of Sabrina",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 9795503
                            }, {
                                "SeriesName": "Titans",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "DC Universe",
                                "Genre": "Action/Adventure",
                                "AverageDailyDEx": 9342402
                            }, {
                                "SeriesName": "13 Reasons Why",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 8621339
                            }, {
                                "SeriesName": "Orange Is The New Black",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Comedy/Drama",
                                "AverageDailyDEx": 7633249
                            }, {
                                "SeriesName": "Sense8",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 5958784
                            }, {
                                "SeriesName": "The Haunting Of Hill House",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Horror",
                                "AverageDailyDEx": 5826953
                            }, {
                                "SeriesName": "Black Mirror",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Sci-Fi",
                                "AverageDailyDEx": 5486431
                            }, {
                                "SeriesName": "O Mecanismo (The Mechanism)",
                                "Country": "Brazil",
                                "In-Market Platform": "Netflix",
                                "Q1 2020": "Netflix",
                                "Genre": "Drama",
                                "AverageDailyDEx": 5066178
                            }]
                    },
                    {
                        "year": 2019,
                        "countries": ["Australia", "Brazil", "Canada", "China", "France", "Hungary", "Ireland", "Italy", "Japan", "Mexico", "Russia", "Spain", "United Kingdom", "United States"],
                        "genres": [
                            {name: "Horror", color: "#88334e"},
                            {name: "Sci-Fi", color: "#ffffff"},
                            {name: "Action", color: "#ff6237"},
                            {name: "Adventure", color: "#66a75f"},
                            {name: "Comedy", color: "#383838"},
                            {name: "Drama", color: "#e30914"},
                            {name: "Children", color: "#303e92"},
                            {name: "Reality", color: "#cfeea8"},
                            {name: "Animation", color: "#d3ba0c"},
                        ],
                        "children": [{
                            "SeriesName": "Stranger Things",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 33728748
                        }, {
                            "SeriesName": "The Umbrella Academy",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 24971378
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 23210028
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 21106248
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 20264837
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 18942137
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 18784988
                        }, {
                            "SeriesName": "You",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 16651277
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 15408904
                        }, {
                            "SeriesName": "Grace And Frankie",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 14850805
                        }, {
                            "SeriesName": "One Day At A Time",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 14731360
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 14270828
                        }, {
                            "SeriesName": "Voltron: Legendary Defender",
                            "Country": "United States",
                            "In-Market Platform": "Netflix",
                            "Genre": "Children",
                            "AverageDailyDEx": 13048940
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 4154986
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 3669742
                        }, {
                            "SeriesName": "Titans",
                            "Country": "United Kingdom",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 3591021
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "United Kingdom",
                            "In-Market Platform": "CBS All Access",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 3103923
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 2997657
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 2838109
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 2520372
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 2310.453
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2273348
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1887292
                        }, {
                            "SeriesName": "The Crown",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1760272
                        }, {
                            "SeriesName": "Marvel’s Jessica Jones",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1543355
                        }, {
                            "SeriesName": "Ozark",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1391949
                        }, {
                            "SeriesName": "Altered Carbon",
                            "Country": "United Kingdom",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1364191
                        }, {
                            "SeriesName": "La Casa De Papel (Money Heist)",
                            "Spain": "Netflix",
                            "In-Market Platform": "Antena 3/Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3728556
                        }, {
                            "SeriesName": "Stranger Things",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 3519682
                        }, {
                            "SeriesName": "Narcos",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2213823
                        }, {
                            "SeriesName": "Cable Girls (Las Chicas Del Cable)",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2203550
                        }, {
                            "SeriesName": "Black Mirror",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1993109
                        }, {
                            "SeriesName": "Sense8",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1632319
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy Drama",
                            "AverageDailyDEx": 1581299
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 1559904
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1521766
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1181698
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1146338
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 1107327
                        }, {
                            "SeriesName": "Titans",
                            "Spain": "Netflix",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1095351
                        }, {
                            "SeriesName": "Mindhunter",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1064151
                        }, {
                            "SeriesName": "Marvel’s The Defenders",
                            "Spain": "Netflix",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1055888
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 8774215
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 8605128
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 6507527
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 5451363
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action and Adventure",
                            "AverageDailyDEx": 5110907
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action and Adventure",
                            "AverageDailyDEx": 5034240
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "Russia",
                            "In-Market Platform": "CBS All Access",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4574987
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 41530112.874243274
                        }, {
                            "SeriesName": "Sex Education",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 4534973
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4518461
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4388057
                        }, {
                            "SeriesName": "Altered Carbon",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4300588
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4088892
                        }, {
                            "SeriesName": "The Umbrella Academy",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action and Adventure",
                            "AverageDailyDEx": 4026672
                        }, {
                            "SeriesName": "Travelers",
                            "Country": "Russia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3784967
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 6301817
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 5011887
                        }, {
                            "SeriesName": "La Casa De Papel (Money Heist)",
                            "Country": "Mexico",
                            "In-Market Platform": "Antena 3/ Netf lix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4930702
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Mexico",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 4068909
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3671005
                        }, {
                            "SeriesName": "Luis Miguel, La Serie",
                            "Country": "Mexico",
                            "In-Market Platform": "Telemundo / Netfl ix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3498038
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 2838494
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 2833209
                        }, {
                            "SeriesName": "Club De Cuervos",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 2813632
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 276418
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2554644
                        }, {
                            "SeriesName": "Sense8",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 2397169
                        }, {
                            "SeriesName": "The House Of Flowers (La Casa De Las Flores)",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 2064381
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1863544
                        }, {
                            "SeriesName": "Bojack Horseman",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 1741863
                        }, {
                            "SeriesName": "Dark",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1690867
                        }, {
                            "SeriesName": "Cable Girls (Las Chicas Del Cable)",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1641718
                        }, {
                            "SeriesName": "Altered Carbon",
                            "Country": "Mexico",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1541485
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "Japan",
                            "In-Market Platform": "CBS AlI Access",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3321368
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 2533023
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Japan",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 2269244
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1902089
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1864626
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 1740987
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1698243
                        }, {
                            "SeriesName": "Ultraman",
                            "Japan": "TBS Television / Netflix",
                            "In-Market Platform": "TBS Television / Netflix",
                            "Genre": "Animation",
                            "AverageDailyDEx": 1696758
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1536817
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1494288
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1474077
                        }, {
                            "SeriesName": "Fuller House",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 1459724
                        }, {
                            "SeriesName": "Young Justice",
                            "Country": "Japan",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1456453
                        }, {
                            "SeriesName": "Cyborg 009: Cali Of Justice",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Animation",
                            "AverageDailyDEx": 1353934
                        }, {
                            "SeriesName": "Love Death And Robots",
                            "Country": "Japan",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1199190
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 3020239
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3017352
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 2915363
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2592334
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy Drama",
                            "AverageDailyDEx": 2571171
                        }, {
                            "SeriesName": "La Casa De Papel (Money Heist)",
                            "Country": "Italy",
                            "In-Market Platform": "Antena 3/ Net fli x",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2459732
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 2353939
                        }, {
                            "SeriesName": "Baby",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2301630
                        }, {
                            "SeriesName": "Sense8",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1933198
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 1914902
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1665663
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "Italy",
                            "In-Market Platform": "CBS AlI Access",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1613029
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Italy",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1593883
                        }, {
                            "SeriesName": "Bojack Horseman",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 1547667
                        }, {
                            "SeriesName": "Marvel's Jessica Jones",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1486218
                        }, {
                            "SeriesName": "Suburra",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1479645
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1317097
                        }, {
                            "SeriesName": "Hakan: Muhafiz (The Protector)",
                            "Country": "Italy",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1307453
                        }, {
                            "SeriesName": "The Umbrella Academy",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 227416
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "Ireland",
                            "In-Market Platform": "CBS All Access",
                            "Genre": "Drama",
                            "AverageDailyDEx": 175026
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 158234
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 133753
                        }, {
                            "SeriesName": "You",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 127637
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 124194
                        }, {
                            "SeriesName": "Doom Patrol",
                            "Country": "Ireland",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 106830
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 100886
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 95773
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Ireland",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 93802
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 93091
                        }, {
                            "SeriesName": "Grace And Frankie",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 8967
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 79776
                        }, {
                            "SeriesName": "Sex Education",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 78837
                        }, {
                            "SeriesName": "Ozark",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 77168
                        }, {
                            "SeriesName": "Russian Doll",
                            "Country": "Ireland",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 67467
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 45196
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 342202
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 331352
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "Hungary",
                            "In-Market Platform": "CBS All Access",
                            "Genre": "Drama",
                            "AverageDailyDEx": 317398
                        }, {
                            "SeriesName": "Gilmore Girls",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 2966
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 196606
                        }, {
                            "SeriesName": "The Umbrella Academy",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 179666
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 174912
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 151973
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Hungary",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 149249
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 131373
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 126844
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 125613
                        }, {
                            "SeriesName": "Doom Patrol",
                            "Country": "Hungary",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 124021
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 122739
                        }, {
                            "SeriesName": "Bojack Horseman",
                            "Country": "Hungary",
                            "In-Market Platform": "Netflix",
                            "Genre": "Animation",
                            "AverageDailyDEx": 112220
                        }, {
                            "SeriesName": "Young Justice",
                            "Country": "Hungary",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 11271
                        }, {
                            "SeriesName": "La Casa De Papel (Money Heist)",
                            "Country": "France",
                            "In-Market Platform": "Antena 3/ Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4668611
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 4442776
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy Drama",
                            "AverageDailyDEx": 3796024
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 3591.4
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3377646
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 3217693
                        }, {
                            "SeriesName": "Sense8",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 2841966
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "France",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 2622480
                        }, {
                            "SeriesName": "Titans",
                            "Country": "France",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 2278138
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 2048543
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "France",
                            "In-Market Platform": "CBS All Access",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1866274
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1846209
                        }, {
                            "SeriesName": "The Crown",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1693513
                        }, {
                            "SeriesName": "Marvel’s Jessica Jones",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1597124
                        }, {
                            "SeriesName": "Marvel’s Luke Cage",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1569011
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Horror",
                            "AverageDailyDEx": 1553910
                        }, {
                            "SeriesName": "Altered Carbon",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1491068
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "France",
                            "In-Market Platform": "Netflîx",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1408539
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 44178040
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 38843009
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 35987777
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "China",
                            "Genre": "Action and Adventure",
                            "AverageDailyDEx": 34607310
                        }, {
                            "SeriesName": "Sex Education",
                            "Country": "China",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 33425170
                        }, {
                            "SeriesName": "The Lost Kingdom",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 3901681
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "China",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 2748138
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "China",
                            "Genre": "Action and Adventure",
                            "AverageDailyDEx": 268836
                        }, {
                            "SeriesName": "Love Death And Robots",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 26497500
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 26153287
                        }, {
                            "SeriesName": "Bojack Horseman",
                            "Country": "China",
                            "Genre": "Animation",
                            "AverageDailyDEx": 26116103
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 25339122
                        }, {
                            "SeriesName": "You",
                            "Country": "China",
                            "Genre": "Drama",
                            "AverageDailyDEx": 24357312
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 2056122
                        }, {
                            "SeriesName": "La Casa De Papel (Money Heist)",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1879837
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Canada",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1816191
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 1449481
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 1413760
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 1222143
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1174076
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1077379
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 946556
                        }, {
                            "SeriesName": "Ozark",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 889830
                        }, {
                            "SeriesName": "Trailer Park Boys",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 874566
                        }, {
                            "SeriesName": "Voltron: Legendary Defender",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Children",
                            "AverageDailyDEx": 797604
                        }, {
                            "SeriesName": "Marvel's Jessica Jones",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 758902
                        }, {
                            "SeriesName": "Altered Carbon",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 699212
                        }, {
                            "SeriesName": "House Of Cards",
                            "Country": "Canada",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 679106
                        }, {
                            "SeriesName": "La Casa De Papel (Money Heist)",
                            "Country": "Brazil",
                            "In-Market Platform": "Antena 3 / Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 17528268
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 11071019
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 9795503
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Brazil",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 9342402
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 818855
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy Drama",
                            "AverageDailyDEx": 7633249
                        }, {
                            "SeriesName": "Sense8",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 5958784
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 5826953
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 5486431
                        }, {
                            "SeriesName": "O Mecanismo (The Mechanism)",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 5066178
                        }, {
                            "SeriesName": "The Last Kingdom",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4738443
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4178917
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 3668619
                        }, {
                            "SeriesName": "Marvel’s Jessica Jones",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 3643672
                        }, {
                            "SeriesName": "Marvel’s The Punisher",
                            "Country": "Brazil",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 3349719
                        }, {
                            "SeriesName": "Chilling Adventures Of Sabrina",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 1315293
                        }, {
                            "SeriesName": "Stranger Things",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 1159317
                        }, {
                            "SeriesName": "Titans",
                            "Country": "Australia",
                            "In-Market Platform": "DC Universe",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 1038498
                        }, {
                            "SeriesName": "Orange Is The New Black",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 947934
                        }, {
                            "SeriesName": "Star Trek: Discovery",
                            "Country": "Australia",
                            "In-Market Platform": "CBS All Access",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 785302
                        }, {
                            "SeriesName": "13 Reasons Why",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 78127
                        }, {
                            "SeriesName": "The Haunting Of Hill House",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Horror",
                            "AverageDailyDEx": 717351
                        }, {
                            "SeriesName": "Marvel's Daredevil",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action & Adventure",
                            "AverageDailyDEx": 631103
                        }, {
                            "SeriesName": "Black Mirror",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 584440
                        }, {
                            "SeriesName": "Altered Carbon",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 489390
                        }, {
                            "SeriesName": "Ozark",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 488933
                        }, {
                            "SeriesName": "Voltron: Legendary Defender",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Children",
                            "AverageDailyDEx": 479385
                        }, {
                            "SeriesName": "The Crown",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 452594
                        }, {
                            "SeriesName": "Narcos",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 439942
                        }, {
                            "SeriesName": "Queer Eye",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Reality",
                            "AverageDailyDEx": 436303
                        }, {
                            "SeriesName": "House of Cards",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 430834
                        }, {
                            "SeriesName": "Arrested Development",
                            "Country": "Australia",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 426161
                        }]
                    },
                    {
                        "year": 2020,
                        "countries": ["Australia", "Belgium", "Brazil", "Canada", "France", "Germany", "Hungary", "Ireland", "Italy", "Japan", "Mexico", "Netherland", "Russia", "South Africa", "Spain", "United Kingdom", "United States"],
                        "genres": [
                            {name: "Sci-Fi", color: "#ffffff"},
                            {name: "Action", color: "#ff6237"},
                            {name: "Adventure", color: "#66a75f"},
                            {name: "Comedy", color: "#383838"},
                            {name: "Drama", color: "#e30914"},
                            {name: "Children", color: "#303e92"},
                            {name: "Reality", color: "#cfeea8"},
                            {name: "Fiction", color: "#a35d7d"},
                            {name: "Crime", color: "#8ed420"},
                            {name: "Animation", color: "#d3ba0c"},
                            {name: "Thriller", color: "#805713"},
                            {name: "Fantasy", color: "#159644"},
                            {name: "Documentary", color: "#fb7c9c"},
                            {name: "Sitcom", color: "#03f88b"},
                            {name: "Mystery", color: "#6f49dc"},
                            {name: "Game Show", color: "#fc368e"},
                            {name: "Telenovela", color: "#1d2b2f"},
                            {name: "Serial", color: "#fe1a10"},
                            {name: "Manga Series", color: "#8c9d4a"},
                            {name: "Romantic", color: "#63c1bb"},
                            {name: "Science Fantasy", color: "#270354"},
                            {name: "Musical", color: "#18cf04"}
                        ],
                        "children": [{
                            "Country": "Russia",
                            "SeriesName": "6 Underground",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action/Thriller",
                            "AverageDailyDEx": 9694019.04739471
                        }, {
                            "Country": "Russia",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Crime",
                            "AverageDailyDEx": 33545273.495413877
                        }, {
                            "Country": "Russia",
                            "SeriesName": "The Witcher",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Fantasy",
                            "AverageDailyDEx": 31298273.999446522
                        }, {
                            "Country": "Russia",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action",
                            "AverageDailyDEx": 29557253.678341053
                        }, {
                            "Country": "Russia",
                            "SeriesName": "Murder Mystery",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Fiction",
                            "AverageDailyDEx": 20658746.07098731
                        }, {
                            "Country": "Russia",
                            "SeriesName": "Extraction",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action/Thriller",
                            "AverageDailyDEx": 13428607.695147151
                        }, {
                            "Country": "Russia",
                            "SeriesName": "The Old Guard",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action/Fantasy",
                            "AverageDailyDEx": 8540942.074930238
                        }, {
                            "Country": "Russia",
                            "SeriesName": "Snowpiercer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 40070145.38718981
                        }, {
                            "Country": "Russia",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 14611818.400396649
                        }, {
                            "Country": "Russia",
                            "SeriesName": "The Irishman",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Crime/Drama",
                            "AverageDailyDEx": 32917889.65421614
                        }, {
                            "Country": "Australia",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 9614431.527040815
                        }, {
                            "Country": "Australia",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 29070793.809534166
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Tiger King: Murder, Mayhem and Madness",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 34930801.04151542
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 26485378.321734227
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Cobra Kai",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 22777075.802725405
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Rick and Morty",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Animation",
                            "AverageDailyDEx": 18222806.17198861
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Friends",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Sitcom",
                            "AverageDailyDEx": 32789081.13700394
                        }, {
                            "Country": "Australia",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 22306342.01481515
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Ozark",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 32010675.639585365
                        }, {
                            "Country": "Australia",
                            "SeriesName": "Unsolved Mysteries",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 29237117.159066718
                        }, {
                            "Country": "United States",
                            "SeriesName": "Despicable Me",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Animation",
                            "AverageDailyDEx": 37114231.219308205
                        }, {
                            "Country": "United States",
                            "SeriesName": "Cocomelon",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Children",
                            "AverageDailyDEx": 28245485.497534797
                        }, {
                            "Country": "United States",
                            "SeriesName": "Tiger King: Murder, Mayhem and Madness",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 37313049.18066102
                        }, {
                            "Country": "United States",
                            "SeriesName": "Ozark",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 20273335.208792135
                        }, {
                            "Country": "United States",
                            "SeriesName": "Outer Banks",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 10277507.74433278
                        }, {
                            "Country": "United States",
                            "SeriesName": "The Ofﬁce",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Sitcom",
                            "AverageDailyDEx": 25147631.580357768
                        }, {
                            "Country": "United States",
                            "SeriesName": "Avatar: The Last Airbender",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Animation",
                            "AverageDailyDEx": 43706989.28714522
                        }, {
                            "Country": "United States",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 26880813.993822284
                        }, {
                            "Country": "United States",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 37305982.37016736
                        }, {
                            "Country": "United States",
                            "SeriesName": "Unsolved Mysteries",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 34804819.84017908
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "The Fall",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 13277646.961438598
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "Tiger King: Murder, Mayhem and Madness",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 9322248.444768863
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "White Lines",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 23684224.792440932
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "The Last Dance",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 5760282.3513718415
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "365 Days",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 8637093.643578146
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 38465094.061358415
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "Unsolved Mysteries",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 40516860.057429135
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "Ratched",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4592788.759672665
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 28131986.42443066
                        }, {
                            "Country": "United Kingdom",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 38403252.92014667
                        }, {
                            "Country": "Spain",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 22607095.73196478
                        }, {
                            "Country": "Spain",
                            "SeriesName": "The Barrier",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 28301333.790165678
                        }, {
                            "Country": "Spain",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 20877902.153801646
                        }, {
                            "Country": "Spain",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 4923238.012966882
                        }, {
                            "Country": "Spain",
                            "SeriesName": "Dark Desire",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 26306871.398841918
                        }, {
                            "Country": "Spain",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 28937607.459541745
                        }, {
                            "Country": "Spain",
                            "SeriesName": "Dark",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 15571179.801603917
                        }, {
                            "Country": "Spain",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 28397690.514546316
                        }, {
                            "Country": "Spain",
                            "SeriesName": "Cobra Kai",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 10525039.101895796
                        }, {
                            "Country": "Spain",
                            "SeriesName": "Toy Boy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 4745498.526426864
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 32447577.55880915
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 7386976.96092604
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Modern Family",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Sitcom",
                            "AverageDailyDEx": 24893255.929947313
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 6007201.812383966
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Lucifer",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 43801000.557349324
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 24576498.095816612
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Family Feud South Africa",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Game Show",
                            "AverageDailyDEx": 12488907.548650246
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Cocomelon",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Children",
                            "AverageDailyDEx": 33304736.405204967
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Extraction",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action/Thriller",
                            "AverageDailyDEx": 35591861.46918249
                        }, {
                            "Country": "South Africa",
                            "SeriesName": "Blood Diamond",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Adventure",
                            "AverageDailyDEx": 20830496.790541034
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "Undercover",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 21061998.84035195
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "The 100",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 26807380.776776634
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 32709899.367466476
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "White Lines",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 8154579.882738789
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 4053183.202059187
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 1568013.3327000765
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 21076668.21058068
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 14450650.670113137
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "Queen of the South",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Action/fiction",
                            "AverageDailyDEx": 15668240.623005955
                        }, {
                            "Country": "Netherland",
                            "SeriesName": "Lucifer",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 2057201.5296984422
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "Yo soy Betty la fea",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Telenovela",
                            "AverageDailyDEx": 41756353.43808675
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "100 Dias Para Enamorarnos",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 379503.6284756112
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "El Dragón: Return of a Warrior",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 26605285.733700253
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "Dark Desire",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 7399821.883283612
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "Dark",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 29106061.077609934
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "Locked Up",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Serial",
                            "AverageDailyDEx": 24060776.54848039
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "Rosario Tijeras",
                            "Type": "Movie",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Telenovela",
                            "AverageDailyDEx": 4734322.210802241
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 33536601.60263845
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 32658285.906840157
                        }, {
                            "Country": "Mexico",
                            "SeriesName": "Her Mother's Killer",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 38356985.6568415
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Crash Landing on You",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Romantic",
                            "AverageDailyDEx": 35202246.828705125
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Itaewon Class",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 21988666.74749201
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Demon Slayer: Kimetsu no Yaiba",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Manga Series",
                            "AverageDailyDEx": 14187926.153101364
                        }, {
                            "Country": "Japan",
                            "SeriesName": "It's Okay to Not Be Okay",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 35308877.16132964
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Fire Force",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Manga Series",
                            "AverageDailyDEx": 4423315.102657765
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Ahiru no Sora",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Manga Series",
                            "AverageDailyDEx": 37638088.974580705
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Contagion",
                            "Type": "Movie",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama/Thriller",
                            "AverageDailyDEx": 28204612.280618887
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Record of Youth",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Romantic",
                            "AverageDailyDEx": 38064171.60458166
                        }, {
                            "Country": "Japan",
                            "SeriesName": "Terrace House: Tokyo 2019-2020",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Reality Television",
                            "AverageDailyDEx": 35573089.8241557
                        }, {
                            "Country": "Japan",
                            "SeriesName": "What's Wrong with Secretary Kim",
                            "Type": "TV Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Romantic/Comedy",
                            "AverageDailyDEx": 8854331.574116763
                        }, {
                            "Country": "Italy",
                            "SeriesName": "Locked Up",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Serial",
                            "AverageDailyDEx": 26035724.51735472
                        }, {
                            "Country": "Italy",
                            "SeriesName": "Lucifer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 39509297.9150151
                        }, {
                            "Country": "Italy",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 34119030.16091001
                        }, {
                            "Country": "Italy",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action",
                            "AverageDailyDEx": 28195349.793422904
                        }, {
                            "Country": "Italy",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Crime",
                            "AverageDailyDEx": 28135917.33412212
                        }, {
                            "Country": "Italy",
                            "SeriesName": "Dynasty",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 37391763.34475411
                        }, {
                            "Country": "Italy",
                            "SeriesName": "Dark",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 10087429.31230944
                        }, {
                            "Country": "Italy",
                            "SeriesName": "The Last Dance",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 24879313.367131438
                        }, {
                            "Country": "Italy",
                            "SeriesName": "Emily in Paris",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 43602491.23184813
                        }, {
                            "Country": "Italy",
                            "SeriesName": "Snowpiercer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 23477338.18168658
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "The Fall",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 4129994.6636457876
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 15640289.549865892
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "Schitt's Creek",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Sitcom",
                            "AverageDailyDEx": 36486177.91477076
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 12625198.436637739
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 11457549.637136653
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "Unsolved Mysteries",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 32015584.613925338
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "White Lines",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 10871599.710931184
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "Ratched",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 357709.90920297446
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 40932400.92705739
                        }, {
                            "Country": "Ireland",
                            "SeriesName": "Jeffrey Epstein: Filthy Rich",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "television Documentary",
                            "AverageDailyDEx": 29404263.431663007
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 23468232.295235522
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 5467745.083076138
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 14596948.065353034
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "Harry Potter and the Philosopher​s Stone",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Science Fantasy",
                            "AverageDailyDEx": 11307001.770178609
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 22344838.891900323
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "Lucifer",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 22945284.50455953
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "Murder Mystery",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Fiction",
                            "AverageDailyDEx": 41281036.85830832
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "Sex Education",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 9237540.554900948
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "6 Underground",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action/Thriller",
                            "AverageDailyDEx": 39710638.813843876
                        }, {
                            "Country": "Hungary",
                            "SeriesName": "The Social Dilemma",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 36560969.901433125
                        }, {
                            "Country": "Germany",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 28755869.4085463
                        }, {
                            "Country": "Germany",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 29756930.49852984
                        }, {
                            "Country": "Germany",
                            "SeriesName": "Paw Patrol",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Adventure",
                            "AverageDailyDEx": 31682721.555857915
                        }, {
                            "Country": "Germany",
                            "SeriesName": "Too Hot to Handle",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Reality",
                            "AverageDailyDEx": 41122446.754063696
                        }, {
                            "Country": "Germany",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 6339042.902160524
                        }, {
                            "Country": "Germany",
                            "SeriesName": "The Blacklist",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 11143137.378671844
                        }, {
                            "Country": "Germany",
                            "SeriesName": "Modern Family",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Sitcom",
                            "AverageDailyDEx": 8807906.224759042
                        }, {
                            "Country": "Germany",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 37593092.853536375
                        }, {
                            "Country": "Germany",
                            "SeriesName": "Suits",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 24190278.55580843
                        }, {
                            "Country": "Germany",
                            "SeriesName": "Dynasty",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Drama",
                            "AverageDailyDEx": 38610708.648027256
                        }, {
                            "Country": "France",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 35734254.86590184
                        }, {
                            "Country": "France",
                            "SeriesName": "Dynasty",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 36908593.00689861
                        }, {
                            "Country": "France",
                            "SeriesName": "Snowpiercer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 11079989.908257298
                        }, {
                            "Country": "France",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action",
                            "AverageDailyDEx": 1037697.5133838783
                        }, {
                            "Country": "France",
                            "SeriesName": "H",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Drama/Sci-Fi",
                            "AverageDailyDEx": 41940774.68920872
                        }, {
                            "Country": "France",
                            "SeriesName": "Lucifer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 25391404.780797068
                        }, {
                            "Country": "France",
                            "SeriesName": "La Casa De Papel / Money Heist",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Crime",
                            "AverageDailyDEx": 2300210.5608008914
                        }, {
                            "Country": "France",
                            "SeriesName": "Emily in Paris",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 410166.5701316305
                        }, {
                            "Country": "France",
                            "SeriesName": "The Last Dance",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 822946.0809790605
                        }, {
                            "Country": "France",
                            "SeriesName": "Family Business",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Comedy",
                            "AverageDailyDEx": 4956595.554010202
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Modern Family",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Sitcom",
                            "AverageDailyDEx": 25183487.083736185
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Sons of Anarchy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 13353766.028663404
                        }, {
                            "Country": "Canada",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 20501268.233299613
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Unsolved Mysteries",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 41197983.84689091
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Paw Patrol",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Adventure",
                            "AverageDailyDEx": 7181192.073722578
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Tiger King: Murder, Mayhem and Madness",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 36987997.691678114
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Family Guy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Animation",
                            "AverageDailyDEx": 17518321.507999048
                        }, {
                            "Country": "Canada",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Action",
                            "AverageDailyDEx": 14428842.19121363
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 37700297.378288694
                        }, {
                            "Country": "Canada",
                            "SeriesName": "Ozark",
                            "Type": "Tv Show",
                            "ln-MarketPlatform": "Netflix ",
                            "Genre": "Crime",
                            "AverageDailyDEx": 13286175.002692666
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Chiquititas",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Comedy/Drama/Musical",
                            "AverageDailyDEx": 14317420.260656675
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 19698557.113289624
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Dark Desire",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 23736805.842479136
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Locked Up",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Serial",
                            "AverageDailyDEx": 29572375.21248986
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Lucifer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 20751061.506425083
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Snowpiercer",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 5515264.7968903715
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Dark",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Mystery Action",
                            "AverageDailyDEx": 25700899.750505805
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Blindspot",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Action",
                            "AverageDailyDEx": 26156344.22425384
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "Paw Patrol",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Adventure",
                            "AverageDailyDEx": 15782457.749757072
                        }, {
                            "Country": "Brazil",
                            "SeriesName": "El Dragón: Return of a Warrior",
                            "Type": "TV Show",
                            "ln-MarketPlatform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 38760033.877795056
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "365 Days",
                            "Type": "Movie",
                            "In-Market Platform": "Netflix",
                            "Genre": "Romantic/Drama",
                            "AverageDailyDEx": 9569509.537292982
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "Snowpiercer",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 18297645.074323036
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "Lucifer",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 11005281.37641122
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "The Umbrella Academy",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Action",
                            "AverageDailyDEx": 6999122.908984184
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "The 100",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Sci-Fi",
                            "AverageDailyDEx": 30498035.81685471
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "Dynasty",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Drama",
                            "AverageDailyDEx": 27691429.673349325
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "Emily in Paris",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Comedy/Drama",
                            "AverageDailyDEx": 29571371.569897644
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "The Last Dance",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Documentary",
                            "AverageDailyDEx": 43325448.79221353
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "White Lines",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 29948119.098982137
                        }, {
                            "Country": "Belgium",
                            "SeriesName": "Outer Banks",
                            "Type": "Tv Show",
                            "In-Market Platform": "Netflix",
                            "Genre": "Mystery",
                            "AverageDailyDEx": 14793519.04184118
                        }]
                    }],
            }
        },
        mounted() {
            let vm = this;
            if (vm.show) {
                vm.selectedYear = vm.show.year;
                vm.selectedCountries.push(vm.show.country);
                vm.customizeCountries = true;
                // vm.top10List = vm.Formatted.filter(element => element.Country === vm.show.country);
                // vm.top10List = vm.top10List.slice(0, 10);
                vm.topNumber = vm.show.place;
            }
        }
    }
</script>

<style scoped>
  .content-wrapper {
    margin-top: 6em;
  }

  .circle {
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }

  .country {
    color: #5b5b5b;
    margin-top: 2em;
    line-height: 1.9em;
    font-size: larger;
    cursor: pointer;
  }

  .genre {
    color: #5b5b5b;
    display: flex;
    margin-top: 1em;
    line-height: 0.9em;
    font-size: larger;
    cursor: pointer;
  }

  .genre div {
    margin-right: 0.5em;
  }

  .genre.selected,
  .country.selected {
    color: red;
    text-decoration: underline;
  }

  .year {
    cursor: pointer;
  }

  .year span {
    font-size: xx-large;
    font-weight: 600;
    color: #5b5b5b;
  }

  .year.selected span {
    border-bottom: white solid 4px;
    color: white;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 90px;
    height: 33px;
    margin-top: 2em;
  }

  .switch input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    -webkit-transition: .4s;
    transition: .4s;

  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    top: 1px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    /*background-color: red;*/
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(55px);
    -ms-transform: translateX(55px);
    transform: translateX(55px);
  }

  .on {
    left: 30px !important;
    font-size: 9px !important;
    display: none;
    color: white !important;
  }

  .on, .off {
    color: #5b5b5b;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 10px;
    font-family: Verdana, sans-serif;
  }

  input:checked + .slider .on {
    display: block;
  }

  input:checked + .slider .off {
    display: none;
  }

  .slider.round {
    border-radius: 34px;
    border: 2px solid #5b5b5b;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .show-place {
    position: absolute;
    top: 145px;
    left: 139px;
    text-align: center;
    width: 245px;
    /*opacity: 0;*/
    display: none;
    /*transition-delay: 0.5s;*/
  }
  .show-place.between {
    display: block;
    opacity: 0;
    transition: opacity 1s;
  }
  .show-place.active {
    display: block;
    opacity: 1;
    /*transition: none;*/
  }
  .show-place h1 {
    font-size: 136px;
  }

  .show-place h5 {
    font-size: 28px;
  }

  .show-place-wrapper {
    margin: 0 auto;
    position: relative;
    display: table;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }

</style>
