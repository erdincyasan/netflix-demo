<template>
    <div class="row">
                <form @submit.prevent="addMovie">
                    <div class="form-group">
                      <label for="">Film Adı</label>
                      <input type="text" v-model="movieName" id="" class="form-control" placeholder="Filmin Adını Giriniz" aria-describedby="">
                    </div>
                    <div class="form-group">
                      <label for="">Film kaç yıldızlı?</label>
                      <input v-model="movieStar" type="number" min="1" max="5"  id="" class="form-control" placeholder="" aria-describedby="helpId">
                    </div>
                    <div class="form-group">
                      <label for="">Film kaç kere izlendi</label>
                      <input type="text" v-model="movieWatched" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    </div>
                    <div class="form-group">
                      <label for="">Filmin fotoğrafını seçiniz..</label>
                      <input type="file" @change="onFileSelected" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                    </div>
                  
                    <div class="form-group">
                      <label for="">Film Kategorilerini Seçiniz</label>
                      <ul style="list-style-type:none" v-if="selectedCategories!=null">
                          <li v-for="s in selectedCategories" :key="s"><span style="fon-size:weight;color:green;">{{s}}</span></li>
                      </ul>
                      <Multiselect  v-model="selectedCategories"  mode="multiple" label="Seçildi" :hideSelectedTag="true" :options="categoryNameList"  :searchable="true">
                            
                      </Multiselect>
                      
                    </div>
                    <button type="submit" class="btn btn-primary">Ekle</button>
                </form>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import createHttp from '../axios/index.js'
export default {
    components:{
        Multiselect
    },
    data(){
        return{
            selectedCategories:null,
            movieStar:0,
            willSendCategories:null,
            movieName:"",
            movieWatched:1,
            moviePhoto:null,
            movieOwnUser:null,
            moviePhotoName:""

        }
    },methods:{
        
        addMovie(){

          
         let cats=  this.$store.getters.getCategoryByCategoryName(this.selectedCategories)
         this.willSendCategories=cats;

           
        this.movieOwnUser= this.$store.getters.getUser
          
           const willUpload=new FormData();
            willUpload.append('image',this.moviePhoto,this.moviePhotoName);
              var http=createHttp();
          http.post(this.$store.getters.getBaseUrl+"api/FileUpload",willUpload,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( 
              response=>
              this.$store.dispatch("AddMovie",{
            MovieName:this.movieName,
            MovieWatched:this.movieWatched,
            MovieStar:this.movieStar,
            UserID:this.$store.getters.getUserID,
            MovieCategories:this.willSendCategories,
            MoviePhoto:response.data.fullPath
        }
        )
            );
        
       
        },onFileSelected(event){
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
         
        }
    },computed:{
      categoryList(){
    return  this.$store.getters.getCategories
      },
      categoryNameList(){
        return this.$store.getters.getCategoryNames;
      }
    }
}
</script>

<style>

</style>
<style src="@vueform/multiselect/themes/default.css"></style>