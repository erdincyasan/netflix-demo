<template>
  <div class="row">
      <div v-if="loading">
            <h6>Yükleniyor lütfen bekleyiniz...</h6>
      </div>
        <table class="table table-striped table-inverse table-responsive">
            <thead class="thead-inverse">
                <tr>
                    <th>Kategori Adı</th>
                    <th>Kategori Sahibi</th>
                    <th>İşlem</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="c in categories" :key="c.categoryID">
                        <td scope="row">{{c.categoryName}}</td>
                        <td>{{c.whoCreate.userName}}</td>
                        <td>
                            <button @click="editCategory(c.categoryName,c.categoryID)" type="button" class="btn btn-outline-primary">Düzenle</button> &nbsp;
                            <button @click="deleteCategory(c.categoryID)" class="btn btn-outline-danger">Sil</button>
                       

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
            loading:true
        }
    },
        computed:{
            categories(){
               
                return this.$store.getters.getCategories;
            }
        },created(){
            if(this.categories!=null){
               this.loading=false

            }
        
        },methods:{
            deleteCategory(categoryID){

                this.$store.dispatch("DeleteCategoryByCategoryID",categoryID);

           },
           editCategory(categoryName,categoryID){
               this.$router.push({name:"editCategory",params:{
                    categoryName:categoryName,
                    categoryID:categoryID
               }})
           }
        }
}
</script>

<style>

</style>