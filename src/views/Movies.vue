<template>
  <div class="row">
      <table class="table table-striped table-inverse table-responsive">
          <thead class="thead-inverse">
              <tr>
                  <th>Film Adı</th>
                  <th>Yıldız</th>
                  <th>
                      Film İzlenmesi
                  </th>
                  <th>
                      #İşlem
                  </th>
              </tr>
              </thead>
              <tbody>
                  <tr v-for="m in movies" :key="m.movieID">
                      <td scope="row">{{m.movieName}}</td>
                      <td>
                            <i class="fa fa-star" style="color:yellow" v-for="index in m.movieStar" :key="index"></i>                          
                      </td>
                      <td> {{m.movieWatched}}</td>
                      <td><button @click="editMovie(m.movieID)" type="button" class="btn btn-outline-primary">Düzenle</button> &nbsp;
                        <button @click="deleteMovie(m.movieID)" type="button" class="btn btn-outline-danger">SİL</button> &nbsp;
                        <button @click="goMovie(m.movieID)" type="button" class="btn btn-outline-success">Görüntüle</button>
                      </td>
                  </tr>
                  
                
              </tbody>
      </table>
  </div>
</template>

<script>
export default {

        data(){
            return{
            }
        },
        onMounted(){
             
        }
        ,
      async  created(){

          
        },computed:{
            movies(){
            return this.$store.getters.getMovies;
            }
        },methods:{
            goMovie(movie){
                this.$router.push(
                    {
                        name:"movie",params:{
                            movie:movie
                        }
                    }
                );
            },
            deleteMovie(movie)
            {
                    this.$store.dispatch("DeleteMovie",movie);
            },editMovie(movieID){
                this.$router.push({
                    name:"editMovie",
                    params:{
                        movieID:movieID
                    }
                })
            }
        }
}
</script>

<style>

</style>