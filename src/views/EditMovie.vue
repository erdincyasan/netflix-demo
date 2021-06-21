<template>
    <div class="row">
                <form @submit.prevent="editMovie" action="">
                    <div class="form-group">
                      <label for="">Film Adı</label>
                      <input type="text" v-model="movieName" id="" class="form-control" placeholder="Filmin Adını Giriniz" aria-describedby="">
                    </div>
                    <div class="form-group">
                      <label for="">Film kaç yıldızlı?</label>
                      <input type="number" v-model="movieStar" min="1" max="5" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    </div>
                    <div class="form-group">
                      <label for="">Film kaç kere izlendi</label>
                      <input type="number" v-model="movieWatched" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    </div>
                    <div class="form-group">
                      <label for="">Filmin fotoğrafını seçiniz..</label>
                      <input type="file" @change="fileSelected" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    </div>
                    <div class="form-group">
                      <label for="">Film Kategorilerini Seçiniz</label>
                      <ul style="list-style-type:none" v-if="selectedCategories.length>0">
                          <li v-for="s in selectedCategories" :key="s"><span style="fon-size:weight;color:green;">{{s}}</span></li>
                      </ul>
                      <Multiselect  v-model="selectedCategories"  mode="multiple" label="Seçildi" :hideSelectedTag="true" :options="categoryList"  :searchable="true">
                            
                      </Multiselect>
                      
                    </div>
                    <button type="submit" class="btn btn-primary">Güncelle</button>
                </form>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import createHttp from '../axios/index.js';
export default {
    components:{
        Multiselect
    },
    data(){
        return{
            selectedCategories:[],
            categoryList:["Deneme"],
            movieID:"",
            movieName:"",
            moviePhoto:"",
            movieStar:0,
            movieWatched:0,
            fileWillChange:false,
            willSendCategories:null,
            moviePhotoName:"",
            photoDbName:""
            

        }
    },methods:{
      fileSelected(event){
        this.fileWillChange=true;
        this.moviePhoto=event.target.files[0];
         let photoName=this.moviePhoto.name;
   
         let reverseExt="";
         for(let i=photoName.length-1;i>=0;i--){
           if(photoName[i]=='.'){
             break;
           }else{
             reverseExt+=photoName[i];
           }
         }
         let correctExt="";
         for (let index = reverseExt.length-1; index >= 0; index--) {
           correctExt+=reverseExt[index];
           
         }
         this.moviePhotoName=this.movieName+"."+correctExt;
         
        }, editMovie(){
          var http=createHttp();
//this scope will upload photo then save it this.moviePhoto
          if(this.fileWillChange)
          {
           // let photoDbName="";
             let cats=  this.$store.getters.getCategoryByCategoryName(this.selectedCategories)
         this.willSendCategories=cats;
          const willUpload=new FormData();
            willUpload.append('image',this.moviePhoto,this.moviePhotoName);
        http.post(this.$store.getters.getBaseUrl+"api/FileUpload",willUpload,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response=>(this.moviePhotoName=response.data.fullPath)).finally(()=>
           http.put(this.$store.getters.getBaseUrl+"api/movies",{
            MovieID:this.movieID,
            MovieName:this.movieName,
            MovieWatched:this.movieWatched,
            MovieStar:this.movieStar,
            MovieCategories:this.willSendCategories,
            MoviePhoto:this.moviePhotoName
          })
            )
          }else{
//getNewSelected categories
           let cats=  this.$store.getters.getCategoryByCategoryName(this.selectedCategories)
         this.willSendCategories=cats;
          http.put(this.$store.getters.getBaseUrl+"api/movies",{
            MovieID:this.movieID,
            MovieName:this.movieName,
            MovieWatched:this.movieWatched,
            MovieStar:this.movieStar,
            MovieCategories:this.willSendCategories,
            MoviePhoto:this.photoDbName
          })
          }

        this.$store.dispatch("UpdateMovie")
          
      }
      }
     
    ,created(){
        let movie=this.$store.getters.getMovieById(this.$route.params.movieID);
        let  categoryIdList=[];
        this.categoryList=this.$store.getters.getCategoryNames;
      categoryIdList=this.$store.getters.getCategoryIdByMovieId(this.$route.params.movieID);
        this.selectedCategories=this.$store.getters.getCategoryNamesByCategoryIds(categoryIdList)
      
        this.movieID=movie.movieID;
        this.movieName=movie.movieName;
        this.photoDbName=movie.moviePhoto
        this.movieStar=movie.movieStar;
        this.movieWatched=movie.movieWatched;

        
        
    }
}
</script>

<style>

</style>
<style src="@vueform/multiselect/themes/default.css"></style>