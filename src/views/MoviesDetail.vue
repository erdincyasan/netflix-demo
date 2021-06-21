<template>
  <div class="row">
      <div class="col-md-6" style="margin-left:auto;margin-right:auto;">
        <h2>{{movie.movieName}}</h2>
        <br>
            <h3>Filmin Yıldız Sayısı: <i class="fas fa-star" style="yellow" v-for="i in movie.movieStar" :key="i"></i> </h3>
            <br>
            <h4>{{movie.movieWatched}}</h4> <br>
            <p>
                Filmin Eklenme Tarihi: {{movie.createdAt.substring(0,10)}} <br>
                Filmin Son Güncellenme Tarihi : {{movie.updatedAt.substring(0,10)}}
            </p><br>
            <img :src="baseUrl+movie.moviePhoto" alt=""> <br>
                <h6>Film Kategorisi </h6>
            <ul>
                <li v-for="c in movieCategories" :key="c.categoryID">{{c}}</li>
            </ul>

      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            baseUrl:""
        }
    },
    created(){
            this.baseUrl=this.$store.getters.getBaseUrl
        
        },
        computed:{
                movie(){
                    return this.$store.getters.getMovieById(this.$route.params.movie)
                },
                movieCategories(){
                    return this.$store.getters.getMovieCategoriesByMovieID(this.$route.params.movie)
                }
        }

}
</script>

<style>

</style>