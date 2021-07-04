<template>
  <b-container fluid>
    <b-row class="content-wrapper">
      <b-col cols="12">
        <h1  class=" mt-4">Discover the top series around the world</h1>
        <h3 class="mt-4" style="color: #5e5e5e">Details about this movie and which country it’s possible</h3>
      </b-col>
      <b-col cols="9">
        <div class="show-img mt-5" :style="'background-image: url('+Series.cover+');'">
        </div>
        <div class="circle" :style="'background-color:' + mapData[0].genre.color + ';' ">
          <h2 style="
    padding: 35% 10%;
    text-align: center;
">{{ mapData[0].name }}</h2>
        </div>
        <p class="show-intro">
          {{ Series.Synopsis }}
        </p>
      </b-col>
      <b-col md="3" class="show-info mt-5">
        Genre <span>{{mapData[0].genre.name}}</span> <br/><br/>
        IMBd rating <span>{{ Series.Rating }}</span><br/><br/>
<!--        First episode date <span>September 22, 1994</span><br/><br/>-->
        Program creator <span>{{ Series.Creators }}</span><br/><br/>
        Number of seasons <span>{{ Series.Saisons }}</span><br/><br/>
        Number of episodes <span>{{ Series.NbEps }}</span><br/><br/>
      </b-col>
      <b-col cols="12">
        <div class="ShowMap" ref="chartdiv" >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    // import Vue from 'vue'
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4maps from "@amcharts/amcharts4/maps"
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"
    am4core.useTheme(am4themes_animated);

    export default {
        name: "Details",
        props: ["mapData"],
        components: {},
        computed: {},
        methods: {},
        data() {
            return {
                Series: {
                    "SeriesName": "Friends",
                    "Creators": "Peter Nowalk",
                    "Synopsis": "Follow the lives of six reckless adults living in Manhattan, as they indulge in adventures which make their lives both\n" +
                        "          troublesome and happening.\n" +
                        "\n" +
                        "          It has survived not only five centuries, but also the leap into elec-tronic typesetting, remaining essentially unchanged.\n" +
                        "          It was popularised in the 1960s with the release of Letraset sheets.",
                    "Rating": "8,9/10",
                    "Saisons": 10,
                    "NbEps": 236,
                    "cover": "https://media.blogto.com/events/2017/11/03/fb_event_1197753553701991.jpg?w=2048&cmd=resize&quality=70"
                },
                SeriesList: [
                    {
                        "SeriesName": "Strangers Things",
                        "Creators": "Matt Duffer, Ross Duffer",
                        "Synopsis": "Lorsqu'un jeune garçon disparaît, sa mère, le chef de police et ses amis doivent affronter des forces terrifiantes afin de le retrouver.",
                        "Rating": "8,7/10",
                        "Saisons": 4,
                        "NbEps": 34,
                        "cover": "https://i.ytimg.com/vi/8T4ffTSFCaQ/maxresdefault.jpg",

                    },
                    {
                        "SeriesName": "Titans",
                        "Creators": "Greg Berlanti, Akiva Goldsman, Geoff Johns",
                        "Synopsis": "Une bande de jeunes super-héros dirigée par Nightwing (qui fut le premier Robin de Batman) lutte contre le mal et d'autres dangers.",
                        "Rating": "7,7/10",
                        "Saisons": 3,
                        "NbEps": 34,
                        "cover": "https://i.ytimg.com/vi/8T4ffTSFCaQ/maxresdefault.jpg",

                    },
                    {
                        "SeriesName": "Orange is the new black",
                        "Creators": "Jenji Kohan",
                        "Synopsis": "Habituellement respectueuse des lois, Piper Chapman se retrouve condamnée à un an et demi derrière les barreaux et doit faire face à la réalité de la vie en prison lorsqu'elle est reconnue coupable d'avoir transporté l'argent d'un trafic de drogues avec sa petite amie dix ans plus tôt.",
                        "Rating": "8,1/10",
                        "Saisons": 7,
                        "NbEps": 91,
                        "cover": "https://static.wikia.nocookie.net/serien/images/5/5d/Orange_Is_The_New_Black_Poster01.jpg/revision/latest?cb=20190307055411&path-prefix=de",

                    },
                    {
                        "SeriesName": "13 Reasons Why",
                        "Creators": "Brian Yorkey",
                        "Synopsis": "Suit l'adolescent Clay Jensen dans sa quête pour découvrir la vérité sur sa camarade de classe Hannah dont il était amoureux, et de sa décision de mettre fin à ses jours.",
                        "Rating": "7,6/10",
                        "Saisons": 4,
                        "NbEps": 49,
                        "cover": "https://www.presse-citron.net/app/uploads/2019/07/13-reasins-why-saison-3-octobre-2019-netflix.jpg",

                    },
                    {
                        "SeriesName": "Narcos",
                        "Creators": "Carlo Bernard, Chris Brancato, Doug Miro",
                        "Synopsis": "Un article sur les exploits criminels du seigneur colombien de la drogue, Pablo Escobar, ainsi que sur les nombreux autres grands noms de la drogue qui ont frappé le pays au fil des ans.",
                        "Rating": "8,8/10",
                        "Saisons": 3,
                        "NbEps": 30,
                        "cover": "https://www.selimniederhoffer.com/blog/wp-content/uploads/2015/09/Narcos-Netflix-Avis.jpg",

                    },
                    {
                        "SeriesName": "Star Trek: Discovery",
                        "Creators": "Bryan Fuller, Alex Kurtzman",
                        "Synopsis": "Dix ans avant Kirk, Spock et l'Enterprise, l'USS Discovery découvre de nouveaux mondes et de nouvelles formes de vie alors qu'un officier de Starfleet apprend à comprendre toute chose étrangère.",
                        "Rating": "7,2/10",
                        "Saisons": 4,
                        "NbEps": 49,
                        "cover": "https://www.tvqc.com/wp-content/uploads/2019/03/star-trek-discovery-season-2.jpg",

                    },
                    {
                        "SeriesName": "Black Miror",
                        "Creators": "Charlie Brooker",
                        "Synopsis": "Une série d'anthologie explorant un monde tourné vers la haute technologie où se heurtent les plus grandes innovations et les instincts les plus sombres de l'humanité.",
                        "Rating": "8,8/10",
                        "Saisons": 5,
                        "NbEps": 22,
                        "cover": "https://geeko.lesoir.be/wp-content/uploads/sites/58/2018/03/black-mirror-2.jpg",

                    },
                    {
                        "SeriesName": "La Casa Del Papel",
                        "Creators": "Álex Pina",
                        "Synopsis": "Un groupe de voleurs très particuliers s'attaquent à l'usine de Moneda et Timbre pour mener le braquage le plus parfait de l'histoire de l'Espagne et repartir avec 2400 millions d'euros.",
                        "Rating": "8,3/10",
                        "Saisons": 5,
                        "NbEps": 32,
                        "cover": "https://www.cambodgepost.com/wp-content/uploads/2021/03/la-casa-de-papel-saison-5-tournage.jpg",

                    },
                    {
                        "SeriesName": "Chilling Adventures Of Sabrina",
                        "Creators": "Roberto Aguirre-Sacasa",
                        "Synopsis": "À l'approche de son seizième anniversaire, Sabrina doit choisir entre le monde des sorcières de sa famille et le monde humain de ses amis. Inspiré de la bande dessinée Archie.",
                        "Rating": "7,5/10",
                        "Saisons": 4,
                        "NbEps": 36,
                        "cover": "https://tvseriesfinale.com/wp-content/uploads/2018/10/chilling-adventures-of-sabrina-netflix-canceled-or-season-2-release-date.jpg",

                    },
                    {
                        "SeriesName": "Marvel's Daredevil",
                        "Creators": "Drew Goddard",
                        "Synopsis": "Avocat aveugle de jour, justicier de nuit, Matt Murdock lutte contre le crime dans la ville de New York sous le nom de Daredevil.",
                        "Rating": "8,6/10",
                        "Saisons": 3,
                        "NbEps": 39,
                        "cover": "https://i.pinimg.com/originals/3b/9a/c6/3b9ac699d3c82c7dfab038bac05aaaad.jpg",

                    },
                    {
                        "SeriesName": "Altered Carbon",
                        "Creators": "Laeta Kalogridis",
                        "Synopsis": "Dans un avenir où toute conscience est stockée et numérisée, un détenu revient à la vie dans un nouveau corps et doit résoudre un meurtre époustouflant pour gagner sa liberté.",
                        "Rating": "8,0/10",
                        "Saisons": 2,
                        "NbEps": 18,
                        "cover": "https://images.squarespace-cdn.com/content/54148cdae4b05a3412bfa19b/1554171149845-ES1CREG0RZQGJ6FHJP1J/AlteredCarbonRPG_975pxW_x_450pxH_2R+%281%29.jpg?content-type=image%2Fjpeg",

                    },
                    {
                        "SeriesName": "The Haunting of Hill House",
                        "Creators": "Mike Flanagan",
                        "Synopsis": "Inspiré du roman The Haunting of Hill House de Shirley Jackson.",
                        "Rating": "8,6/10",
                        "Saisons": 1,
                        "NbEps": 10,
                        "cover": "https://freakingeek.com/wp-content/uploads/2018/10/TheHauntingOfHillHouse-Banniere-800x445.jpg",

                    },
                    {
                        "SeriesName": "Ozark",
                        "Creators": "Bill Dubuque, Mark Williams",
                        "Synopsis": "Un conseiller financier emmène sa famille de Chicago à Ozarks dans le Missouri, où il doit blanchir 500 millions de dollars en cinq ans pour amadouer un baron de la drogue.",
                        "Rating": "8,4/10",
                        "Saisons": 4,
                        "NbEps": 44,
                        "cover": "https://financerewind.com/wp-content/uploads/2020/11/ozark-h.jpg",

                    },
                    {
                        "SeriesName": "Sense8",
                        "Creators": "J. Michael Straczynski, Lana Wachowski, Lilly Wachowski",
                        "Synopsis": "Un groupe de personnes dans le monde entier se retrouve soudainement lié mentalement et doit trouver un moyen de survivre, poursuivi par ceux qui les considèrent comme une menace pour l'ordre du monde.",
                        "Rating": "8,3/10",
                        "Saisons": 2,
                        "NbEps": 24,
                        "cover": "https://filmdaily.co/wp-content/uploads/2020/06/sense8-lede-1300x731.jpg",

                    },
                    {
                        "SeriesName": "House of Cards",
                        "Creators": "Beau Willimon",
                        "Synopsis": "Un membre du Congrès se venge des personnes qui l'ont trahi avec l'aide de sa femme, aussi malhonnête que lui.",
                        "Rating": "8,7/10",
                        "Saisons": 6,
                        "NbEps": 73,
                        "cover": "https://imgsrc.cineserie.com/2020/12/secrets-de-series-quatre-secrets-sur-house-of-cards-pauline.jpg?ver=1",

                    },
                    {
                        "SeriesName": "Marvel's Jessica Jones",
                        "Creators": "Melissa Rosenberg",
                        "Synopsis": "Après la fin tragique de sa brève carrière de super-héros, Jessica Jones tente de reconstruire sa vie en tant qu'enquêteur privé, s'occupant de cas impliquant des personnes dotées de capacités remarquables à New York.",
                        "Rating": "7,9/10",
                        "Saisons": 3,
                        "NbEps": 39,
                        "cover": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0bd67d61566117.5a726fdfec072.png",

                    },
                    {
                        "SeriesName": "Marvel's The Punisher",
                        "Creators": "Steve Lightfoot",
                        "Synopsis": "Après le meurtre de sa famille, le vétéran de la Marine Frank Castle s transforme en justicier connu sous le nom de \"Punisher\" avec un seul objectif en tête, les venger.",
                        "Rating": "8,5/10",
                        "Saisons": 2,
                        "NbEps": 26,
                        "cover": "https://netflixactu.fr/wp-content/uploads/2019/02/the-punisher-Netflix.jpg",

                    },
                    {
                        "SeriesName": "Sex Education",
                        "Creators": "Laurie Nunn",
                        "Synopsis": "Un adolescent dont la mère est sexologue fait équipe avec une camarade de classe pour créer un cabinet de conseil clandestin au lycée.",
                        "Rating": "8,3/10",
                        "Saisons": 3,
                        "NbEps": 23,
                        "cover": "https://lecahier.com/wp-content/uploads/2019/01/sex-education-netflix-review.jpg",

                    },
                    {
                        "SeriesName": "Love Death & Robots",
                        "Creators": "Tim Miller",
                        "Synopsis": "Une collection de courts métrages animés en tous genres: science fiction, fantasy, horreur et comédie.",
                        "Rating": "8,5/10",
                        "Saisons": 2,
                        "NbEps": 19,
                        "cover": "https://occ-0-1722-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABUQlw64qewpFPu_Szw5QeI1fDCwzjaTymnk1qd8pk9Y599mdBwtZD0GqY6H6AJI4Kg7LRuXHgyDqyOm-pA3zZIybrfPK.jpg?r=b3c",

                    },
                    {
                        "SeriesName": "Bojack Horseman",
                        "Creators": "Raphael Bob-Waksberg",
                        "Synopsis": "Bojack Horseman, ancienne star de l'émission \"Horsin' Around\" dans les années 90 maintenant has-been vit à Hollywood, se plaint de tout et porte des pulls colorés.",
                        "Rating": "8,7/10",
                        "Saisons": 6,
                        "NbEps": 77,
                        "cover": "https://i.ytimg.com/vi/z06C89dJyPY/maxresdefault.jpg",

                    },
                    {
                        "SeriesName": "Cable Girls",
                        "Creators": "Ramón Campos, Gema R. Neira, Teresa Fernández-Valdés",
                        "Synopsis": "Dans les années 1920, quatre femmes de différents milieux sont embauchées en tant qu'opératrices d'une compagnie de téléphone.",
                        "Rating": "7,6/10",
                        "Saisons": 5,
                        "NbEps": 42,
                        "cover": "https://www.tvqc.com/wp-content/uploads/2018/09/cable-girls-season-2.jpg",

                    },
                    {
                        "SeriesName": "Baby",
                        "Creators": "Antonio Le Fosse, Giacomo Mazzariol, Marco Raspanti",
                        "Synopsis": "A coming-of-age story that explores the unseen lives of Roman high schoolers. Loosely inspired by a true story, the series follows a group of Parioli teenagers as they defy society in their search for identity and independence",
                        "Rating": "6,8/10",
                        "Saisons": 3,
                        "NbEps": 18,
                        "cover": "https://media.urbanpost.it/wp-content/uploads/2020/09/baby-3.jpg",

                    },
                    {
                        "SeriesName": "The Last Kingdom",
                        "Creators": "Stephen Butchard",
                        "Synopsis": "Alors qu'Alfred le Grand défend son royaume contre les envahisseurs nordiques, Uhtred, né saxon mais élevé par les Vikings, cherche à revendiquer son droit ancestral.",
                        "Rating": "8,4/10",
                        "Saisons": 5,
                        "NbEps": 37,
                        "cover": "https://freakingeek.com/wp-content/uploads/2020/04/TheLastKingdom-Saison4-Banniere-800x445.jpg",

                    },
                    {
                        "SeriesName": "Volton: Legendary Defender",
                        "Creators": "Joaquim Dos Santos Lauren Montgomery Ted Koplar Bob Koplar Yoo Jae Myung",
                        "Synopsis": "Cinq adolescents sont la dernière ligne de défense pour la galaxie lors d'une bataille intergalactique contre une force extra-terrestre malveillant, mené par le Roi Zarkon",
                        "Rating": "8,1/10",
                        "Saisons": 8,
                        "NbEps": 78,
                        "cover": "http://insidepulse.com/wp-content/uploads/2018/07/Voltron-Legendary-Defender-banner-e1532442122835.png",

                    },
                    {
                        "SeriesName": "Luis Miguel: The Serie",
                        "Creators": "Humberto Hinojosa, Natalia Beristáin",
                        "Synopsis": "La série narre l'histoire de la vie du chanteur mexicain Luis Miguel, qui a captivé le public en Amérique latine et ailleurs, durant des décennies.",
                        "Rating": "8,1/10",
                        "Saisons": 2,
                        "NbEps": 15,
                        "cover": "https://www.thebubble.com/wp-content/uploads/2018/06/the-man-the-myth-the-legend-luis.jpg",

                    },
                    {
                        "SeriesName": "Club De Cuervos",
                        "Creators": "Gary Alazraki, Michael Lam",
                        "Synopsis": "Lorsque le patriarche d'une famille importante décède, ses héritiers se battent pour déterminer qui prendra le contrôle de son équipe de football",
                        "Rating": "8,2/10",
                        "Saisons": 4,
                        "NbEps": 45,
                        "cover": "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fveronicavillafane%2Ffiles%2F2017%2F09%2FClub-de-Cuervos-season3.jpg",

                    },
                    {
                        "SeriesName": "Mindhunter",
                        "Creators": "Joe Penhall",
                        "Synopsis": "À la fin des années 1970, deux agents du FBI sont chargés d'interviewer des tueurs en série pour résoudre des affaires en cours.",
                        "Rating": "8,6/10",
                        "Saisons": 2,
                        "NbEps": 19,
                        "cover": "https://occ-0-999-444.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABasWucxZW-QzclAIy6bvjfF-_j-f_XyWWan4rNHgETiO5GpjDNTsic42cydQaLKKKFDKnTGDMSAIIJB0meIMy34zCk3OUzxwSxnNosNcwiH0POQ0Qow_fLcr0Q8D6g.jpg?r=4aa",
                        "": "https://www.tvqc.com/wp-content/uploads/2019/08/MINDHUNTER-saison-2.jpg"
                    },
                    {
                        "SeriesName": "O Mecanismo",
                        "Creators": "José Padilha",
                        "Synopsis": "Série de fiction dramatique vaguement inspirée d'une enquête sur la corruption dans les compagnies pétrolières et les entreprises de construction privées et publiques du Brésil",
                        "Rating": "8,4/10",
                        "Saisons": 2,
                        "NbEps": 16,
                        "cover": "https://i0.wp.com/ramenswag.com/wp-content/uploads/2019/05/O-Mecanismo-1.jpg?fit=750%2C380&ssl=1",

                    },
                    {
                        "SeriesName": "The Crown",
                        "Creators": "Peter Morgan",
                        "Synopsis": "Suit les rivalités politiques et l'histoire du règne de la reine Elizabeth II et les événements qui ont marqué la seconde moitié du XXème siècle.",
                        "Rating": "8,7/10",
                        "Saisons": 6,
                        "NbEps": 60,
                        "cover": "https://www.cambodgepost.com/wp-content/uploads/2021/03/TheCrown-saison-5-Netflix.jpg",

                    },
                    {
                        "SeriesName": "You",
                        "Creators": "Sera Gamble, Greg Berlanti",
                        "Synopsis": "Le gestionnaire intelligent d'une librairie compte sur ses connaissances informatique pour que la femme de ses rêves tombe amoureuse de lu",
                        "Rating": "7,7/10",
                        "Saisons": 3,
                        "NbEps": 30,
                        "cover": "https://urbantrackz.fr/wp-content/uploads/2019/02/you-poster.jpg",

                    },
                    {
                        "SeriesName": "The Umbrella Academy",
                        "Creators": "Steve Blackman, Jeremy Slater",
                        "Synopsis": "Un groupe de super-héros dispersé se réunit suite au décès de leur père adoptif, qui leur a appris de sauver le monde.",
                        "Rating": "8,0/10",
                        "Saisons": 3,
                        "NbEps": 30,
                        "cover": "https://leschroniquesdecoralie.files.wordpress.com/2019/04/umbrella-academy-wide-poster.jpg",

                    },
                    {
                        "SeriesName": "Grace and Frankie",
                        "Creators": "Marta Kauffman, Howard J. Morris",
                        "Synopsis": "Constatant que leurs maris ne font pas que travailler ensemble mais ont également eut une liaison amoureuse au cours des vingt dernières années, deux femmes ayant des rapports déjà tendus essaient de faire face à la situation ensemble.",
                        "Rating": "8,3/10",
                        "Saisons": 7,
                        "NbEps": 94,
                        "cover": "https://lh6.googleusercontent.com/proxy/wAs0mrEmyz1QeOGLZ0icOhOktOA-qFGdQ3Jm8dpYOdoXg5mKeWBYbQxFLsbeH6ws3fCupSBCz6jXw7uVWpEhWTXh7d7e55iYKGDizKUF0G5NM5V4AxBNDSarmgN0upymFLYQUvhuHqKx=w1200-h630-p-k-no-nu",

                    },
                    {
                        "SeriesName": "Big Mouth",
                        "Creators": "Jennifer Flackett, Andrew Goldberg, Nick Kroll",
                        "Synopsis": "Des adolescents voient leur vie bouleversée par les merveilles et les horreurs de la puberté.",
                        "Rating": "8,0/10",
                        "Saisons": 6,
                        "NbEps": 43,
                        "cover": "https://scotscoop.com/wp-content/uploads/2018/05/bigmouthcover.jpg",

                    },
                    {
                        "SeriesName": "Ultraman",
                        "Creators": "Eiichi Shimizu, Tomohiro Shimoguchi, Eiji Tsuburaya",
                        "Synopsis": "Shinjiro Hayata apprend que son père lui a transmis le \"facteur Ultraman\" et lutte contre le mal.",
                        "Rating": "6,9/10",
                        "Saisons": 1,
                        "NbEps": 13,
                        "cover": "https://freakingeek.com/wp-content/uploads/2019/03/Ultraman-Banniere-800x445.png",

                    },
                    {
                        "SeriesName": "Doom Patrol",
                        "Creators": "Jeremy Carver",
                        "Synopsis": "Les aventures d'un savant fou idéaliste et de son équipe de marginaux aux superpouvoirs.",
                        "Rating": "7,9/10",
                        "Saisons": 3,
                        "NbEps": 25,
                        "cover": "https://www.ecranlarge.com/media/cache/1600x1200/uploads/image/001/068/doom-patrol-photo-april-bowlby-diane-guerrero-joivan-wade-1068148.jpg",

                    },
                    {
                        "SeriesName": "Gilmore Girls",
                        "Creators": "Amy Sherman-Palladino",
                        "Synopsis": "Une dramatique centrée sur la relation entre une mère célibataire d'une trentaine d'années et sa fille adolescente à Stars Hollow dans le Connecticut.",
                        "Rating": "8,1/10",
                        "Saisons": 7,
                        "NbEps": 154,
                        "cover": "https://i.pinimg.com/originals/c2/50/46/c2504622b4f89cee9722175d443043b8.jpg",

                    },
                ],
                locationsList: [
                    {
                        "latlng": [
                            -27,
                            133
                        ],
                        "name": "Australia",
                    },
                    {
                        "latlng": [
                            -10,
                            -55
                        ],
                        "name": "Brazil",
                    },
                    {
                        "latlng": [
                            60,
                            -95
                        ],
                        "name": "Canada",
                    },
                    {
                        "latlng": [
                            46,
                            2
                        ],
                        "name": "France",
                    },
                    {
                        "latlng": [
                            51,
                            9
                        ],
                        "name": "Germany",
                    },
                    {
                        "latlng": [
                            42.83333333,
                            12.83333333
                        ],
                        "name": "Italy",
                    },
                    {
                        "latlng": [
                            23,
                            -102
                        ],
                        "name": "Mexico",
                    },
                    {
                        "latlng": [
                            -29,
                            24
                        ],
                        "name": "South Africa",
                    },
                    {
                        "latlng": [
                            40,
                            -4
                        ],
                        "name": "Spain",
                    },
                    {
                        "latlng": [
                            54,
                            -2
                        ],
                        "name": "United Kingdom",
                    },
                    {
                        "latlng": [
                            38,
                            -97
                        ],
                        "name": "United States",
                    },
                    {
                        "latlng": [
                            35,
                            105
                        ],
                        "name": "China",
                    },
                    {
                        "latlng": [
                            47,
                            20
                        ],
                        "name": "Hungary",
                    },
                    {
                        "latlng": [
                            53,
                            -8
                        ],
                        "name": "Ireland",
                    },
                    {
                        "latlng": [
                            36,
                            138
                        ],
                        "name": "Japan",
                    },
                    {
                        "latlng": [
                            60,
                            100
                        ],
                        "name": "Russia",
                    },
                    {
                        "latlng": [
                            50.83333333,
                            4
                        ],
                        "name": "Belgium",
                    },
                    {
                        "latlng": [
                            52.5,
                            5.75
                        ],
                        "name": "Netherland",
                    },
                ]
            }
        },
        mounted() {
            let vm = this;
            let found = vm.SeriesList.find(series => series.SeriesName === vm.mapData[0].name);
            console.log(found)

            if(found) {
                vm.Series = found;
            }else {
                vm.Series.SeriesName = vm.mapData[0].name;
            }
            vm.mapData.forEach(function (show) {
                let countryInfo = vm.locationsList.find(country => country.name === show.country);
                show.latitude = countryInfo.latlng[0];
                show.longitude = countryInfo.latlng[1];
            });
            let chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
            am4core.useTheme(am4themes_animated);

// Set map definition
            chart.geodata = am4geodata_worldLow;

// Set projection
            chart.projection = new am4maps.projections.Miller();

// Create map polygon series
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());



// // Make map load polygon (like country names) data from GeoJSON
            polygonSeries.useGeodata = true;
//
// // Configure series
            var targetSVG = "M326.2,167.7c0.4-44.6-14.3-83.5-45.4-115.4C246.2,16.9,203.6,1.7,154.7,3.6C82.6,6.6,16.4,64.6,4.6,136 c-10.1,60.9,10.3,111.2,55.6,151.1c42.6,37.6,73.7,82.1,85.8,138.4c3,14,4.7,28.6,4.9,43c0.6,42.6,0.4,85.1,0.2,127.7 c-0.2,42.2-13.9,78.5-42.4,110.4c-48.1,54-8.2,115.3,39.6,126.4c31.5,7.3,64.9-7.9,81.1-36.4c16.1-28.2,12-63.5-9.6-87.6 c-29.8-33.4-46.4-72-45.8-117.7c0.6-39.6,0.1-79.2,0.2-118.9c0.1-43.1,12.1-82.9,33.6-120c13.1-22.5,29.2-42.3,49-59.1 c7.6-6.4,15.9-11.9,23.1-18.6c28.7-26.9,43.1-60.6,45.6-99.7C325.8,172.7,326,170.2,326.2,167.7z";

// Exclude Antartica
            polygonSeries.exclude = ["AQ"];






// Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.strokeOpacity = 1;
            polygonTemplate.stroke = am4core.color("#5e5e5e");
            polygonTemplate.nonScalingStroke = true;
            polygonTemplate.fill = am4core.color("#5e5e5e");
            // polygonTemplate.tooltipText = "{country}: [bold]{name}[/]";
// create capital markers
            var imageSeries = chart.series.push(new am4maps.MapImageSeries());

// define template
            var imageSeriesTemplate = imageSeries.mapImages.template;
            var circle = imageSeriesTemplate.createChild(am4core.Sprite);
            circle.scale = 0.09;
            circle.align = "center";
            circle.fill = am4core.color("#FFFFFF");
            circle.dy = -80;
            var hover = circle.states.create("hover");
            hover.properties.fill = am4core.color("red");
            circle.tooltipText = "{name}";
            circle.path = targetSVG;

            var label = imageSeriesTemplate.createChild(am4core.Label);
            label.text = "{place}"
            label.horizontalCenter = "left";
            label.paddingLeft = 9;
            label.paddingTop = -75;
            label.fontWeight = "bolder";
            var hoverlabel = label.states.create("hover");
            hoverlabel.properties.fill = am4core.color("white");

//             var polygonTemplate = polygonSeries.mapPolygons.template;
//             polygonTemplate.strokeOpacity = 0.5;
//             polygonTemplate.nonScalingStroke = true;
//
// // create capital markers
//             var imageSeries = chart.series.push(new am4maps.MapImageSeries());
//             imageSeries.dataFields.value = "value";
//
// // define template
//             var imageSeriesTemplate = imageSeries.mapImages.template;
//             // var circle = imageSeriesTemplate.createChild(am4core.Sprite);
//             var circle = imageSeriesTemplate.createChild(am4core.Circle);
//             circle.fillOpacity = 0.5;
//             // circle.propertyFields.fill = "color";
//             circle.tooltipText = "{name}";
//             circle.scale = 0.4;
//             // circle.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
//             circle.fill = chart.colors.getIndex(2);
//             // circle.path = targetSVG;
// what about scale...
            imageSeries.heatRules.push({
                "target": circle,
                // "property": "radius",
                "min": 1,
                "max": 2,
                // "dataField": "value"
            })

            circle.events.on("hit", function(event){
                 console.log(event.target.dataItem.dataContext);
                vm.$router.push({ name: 'TopShows', params: {show: event.target.dataItem.dataContext }})

            });
// set propertyfields
            imageSeriesTemplate.propertyFields.latitude = "latitude";
            imageSeriesTemplate.propertyFields.longitude = "longitude";
            imageSeriesTemplate.horizontalCenter = "middle";
            imageSeriesTemplate.verticalCenter = "middle";
            imageSeriesTemplate.align = "center";
            imageSeriesTemplate.valign = "middle";
            imageSeriesTemplate.width = 8;
            imageSeriesTemplate.height = 8;
            imageSeriesTemplate.nonScaling = true;
            imageSeriesTemplate.tooltipText = "{place} place in {country}";
            imageSeriesTemplate.tooltipY = circle.dy;
            imageSeriesTemplate.tooltipX = circle.dx + 13;
            imageSeriesTemplate.fill = am4core.color("white");
            imageSeriesTemplate.background.fillOpacity = 0;
            imageSeriesTemplate.background.fill = am4core.color("black");
            imageSeriesTemplate.setStateOnChildren = true;
            imageSeriesTemplate.states.create("hover");

            imageSeries.data = vm.mapData;
        }
    }
</script>

<style scoped>
  .content-wrapper {
    font-size: 16px;
  }
  .show-img {
    position: relative;
    background-repeat: no-repeat;
    background-size: 100%;
    width: 80%;
    padding-top: 44.166667%;
    height: 0;
    box-sizing: border-box;
    box-shadow: inset -289px 0 60px -204px black;
    border-radius: 15px;
    -moz-filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
    -o-filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
    -webkit-filter: grayscale(100%);
    filter: gray;
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  }

  .circle {
    border-radius: 50%;
    width: 25%;
    height: 0;
    padding-bottom: 25%;
    background: red;
    z-index: 1;
    right: 8%;
    position: absolute;
    top: 19%;
  }

  .show-info span {
    color: red;
    margin-left: 2em;
  }
  .show-intro {
    padding: 3em 25% 3em 5%;
  }
  .ShowMap {
    height: 90vh;
  }
</style>
