<template>
    <div class="row">
        <div style="margin-left:auto;margin-right:auto" class="col-md-6">
                <form @submit.prevent="updateCategory" action="">
                    <div class="form-group">
                      <label for="ad">Kategori Adı</label>
                      <input type="text" v-model="categoryName" id="ad" class="form-control" placeholder="" aria-describedby="helpId" style="text:center">
                    </div>
                    <button type="submit" style="width:100%" class="btn btn-primary">Ekle</button>
                </form>
        </div>

    </div>
</template>

<script>
export default {
        data(){
            return{
                categoryName:"",
                categoryID:""
            }
        },created(){
            this.categoryName=this.$route.params.categoryName
            this.categoryID=this.$route.params.categoryID
        },methods:{
            updateCategory(){

                    this.$store.dispatch("UpdateCategory",{
                        categoryName:this.categoryName,
                        categoryID:this.categoryID,
                        userID:this.$store.getters.getCategoryUserIDByCategoryID(this.categoryID)
                    })
            }
        }
}
</script>

<style>

</style>