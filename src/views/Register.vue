<template>
  <div class="row">
      <div class="col-md-3" style="margin-left:auto;margin-right:auto;margin-top:7%">
<form @submit.prevent="register" action="">
          <div class="form-group">
            <label for="ad">Adınız</label>
            <input type="text" v-model="model.UserName" id="ad" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
          <div class="form-group">
            <label for="syad">Soyadınız</label>
            <input type="text" v-model="model.UserSurName" id="syad" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
          <div class="form-group">
            <label for="">E posta adresiniz</label>
            <input type="text" v-model="model.UserMail" id="" class="form-control" placeholder="Eposta@mail.com" aria-describedby="helpId">
          </div>
          <div class="form-group">
            <label for="tel">Telefonunuz</label>
            <input type="text" v-model="model.UserPhone" id="" class="form-control" placeholder="Maksimum 11 karakter!" aria-describedby="helpId">
          </div>
          <div class="form-group">
            <label for="sifre">Şifreniz</label>
            <input type="password" v-model="model.UserPasswordHash" id="" class="form-control" placeholder="" aria-describedby="helpId">
          </div>
          <button  type="submit" class="btn btn-primary mt-2" style="width:100%">Kaydol</button>
      </form>
      </div>
      
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:{
          UserName:"",
          UserMail:"",
          UserPasswordHash:"",
          UserPhone:"",
          UserSurName:""
      }
    }
  },methods:{
    register(){
      this.$store.dispatch("register",this.model);
      this.$router.push("/login");
    }
  }

}
</script>

<style>

html,body{
background-image: none;
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
}
input{
    text-align: center;
}
</style>