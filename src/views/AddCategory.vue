<template>
    <div class="row">
        <div style="margin-left:auto;margin-right:auto" class="col-md-6">
                <form @submit.prevent="addCategory" action="">
                    <div class="form-group">
                      <label for="ad">Kategori Adı</label>
                      <input 
                       v-model="this.catName" id="ad" class="form-control" placeholder="" aria-describedby="helpId" style="text:center">
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
                category:{
                    categoryName:"",
                    userID:this.$store.getters.getUserID
                },
                catName:""
            }
        },methods:{
                addCategory(){
                    this.category.categoryName=this.catName;
                    this.$store.dispatch("AddCategory",this.category);
                    this.$router.push({name:"categories"})
                }
            }
}
</script>

<style>

</style>