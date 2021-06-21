import { createStore } from 'vuex'
import createHttp from '../axios/index.js'
import router from '../router/index.js'
export default createStore({
  state: {
      token:"",
      Users:[],
      User:"",
      Movies:[],
      Categories:[],
      MovieCategories:[],
      baseUrl:"http://localhost:41597/",
      expiration:""
  },
  mutations: {
    setToken:(state,model)=>{
      state.token=model.token;
      state.expiration=new Date(model.expire);
      state.User=model.user;
    },
    initMovies(state,movies){
      state.Movies=movies;
    },
    initCategories(state,categories){
      state.Categories=categories;
    },
    initUsers(state,users){
      state.Users=users;
    },
    initMovieCategories(state,movieCategories){
     state.MovieCategories=movieCategories;
    },
    addMovie(state,movie){
      state.Movies.push(movie);
    },
    addCategory(state,category){
      state.Movies.push(category);
    },
    addUser(state,user){
      state.Users.push(user);
    },
    deleteCategory(state,category){
      let i=state.Categories.findIndex(c=>c.categoryID==category)
      state.Categories.splice(i,1);
    },
    updateCategory(state,category){
      let indexCategory=state.Categories.findIndex(c=>c.categoryID==category.categoryID);
      state.Categories[indexCategory]=category;

    },
    deleteMovie(state,movieID){
      let movIndex=state.Movies.findIndex(m=>m.movieID==movieID);
      state.Movies.splice(movIndex,1);
    }


    
  },
  actions: {
      login: async ({commit,dispatch},userinfos)=>{
        
          var http=createHttp(false);
            const result= await http.post("/api/auth/signin",userinfos);
            if (result.data.success) {
                commit("setToken",result.data);
                dispatch("initMovies");
                dispatch("initUsers");
                dispatch("initCategories");
                dispatch("initMovieCategories")
                router.push('/');
            }else{
              router.push('/login')
            }
        
      },
      async initUsers(context){
        var http=createHttp();
        await http.get('/api/users').then(response=>
            context.commit("initUsers",response.data)
          )
      },
    async  initMovies(context){
      var http=createHttp();
      await http.get("/api/movies").then(response =>{
          context.commit("initMovies",response.data)
         });
       

      },
      async initCategories(context){
       let categories=null;
       var http=createHttp();
       await http.get('/api/categories').then(response =>{
          categories=response.data
        })
       

        categories.forEach(element => {
          element.whoCreate=context.getters.getUserByUserID(element.userID)
        });
        context.commit("initCategories",categories)
      }, 
      async initMovieCategories(context){
        var http=createHttp();
        await http.get("/api/movieCategories").then(response =>{
          context.commit("initMovieCategories",response.data)
         });
      },
      async AddCategory(context,category){
        var http=createHttp();
        await http.post("/api/categories",category).
        then(response =>{
          context.commit("addCategory",response.data);
        })
      }, async DeleteCategoryByCategoryID(context,categoryID){
        var http=createHttp();
        await http.delete("/api/categories/"+categoryID).then(
         
          context.commit("deleteCategory",categoryID)

         
        )
      },
        async AddMovie(context,movie){
          var http=createHttp();
        await http.post("/api/movies",movie).then(response=>context.commit("addMovie",response.data))
          
        }
      ,
      async UpdateCategory(context,category){
        var http=createHttp();
        await http.put("/api/categories",category).then(
          context.commit("updateCategory",category)
        )
      },
      async DeleteMovie(context,movieID){
        var http=createHttp();
        await http.delete("/api/movies/"+movieID).then(
          context.commit("deleteMovie",movieID)
        )
      } , async UpdateMovie({dispatch}){
        dispatch("initMovies");
        dispatch("initMovieCategories")
      } , 
      async register(model){
        var http=createHttp();
        http.post("/api/auth/signup",model);
      }

  },
  getters:{
    isAuthenticated:(state)=>{
      return state.token.length > 0 && state.expiration>Date.now();
    },
      getUsers(state){

        return state.Users;
      },
      getMovies(state){

        return state.Movies;
      },
      getCategories(state){
          return state.Categories;
      },
      getMovieById:(state)=>(id)=>{

        
        let mov=state.Movies.find(I=>I.movieID==id);
        let movCat=state.MovieCategories.find(I=>I.MovieID==id);
        mov.movieCategories=movCat;
        return mov;

      },getUserByUserID:(state)=>(userID)=>{
          let User=state.Users.find(I=>I.userID==userID);
          return User;
      }
      ,
      getMovieCategoriesByMovieID:(state)=>(movieID)=>{
        let cats=[];
        let tmp=""
       state.MovieCategories.forEach(I=>
        {
          if(I.movieID==movieID){
            tmp =state.Categories.find(x=>x.categoryID==I.categoryID)
            cats.push(tmp.categoryName)
          }
        }
         
        )
       return cats;
       
      },
      getCategoryUserIDByCategoryID:(state)=>(categoryID)=>{
          let cat= state.Categories.find(I=>I.categoryID==categoryID)
          return cat.userID;
        },
        getCategoryByCategoryName:(state)=>(categoryNames)=>{

          let categories=[];
          
          categoryNames.forEach(c=>categories.push(state.Categories.find(cat=>cat.categoryName==c)));
        return categories;
        },
        getCategoryNameByCategoryId:(state)=>(categoryid)=>{
            let catName=state.Categories.find(I=>I.categoryID==categoryid);
            return catName;
        },
        getCategoryNames(state){
          let catNames=[];
          state.Categories.forEach(I=>
              catNames.push(I.categoryName)
            )
            return catNames;
        },getBaseUrl(state){
          return state.baseUrl;
        },getCategoryIdByMovieId:(state)=>(movieId)=>{

          let categoryIds=[];
          state.MovieCategories.forEach(m=>{
              if(m.movieID==movieId){
                categoryIds.push(m.categoryID);
              }
          })
          return categoryIds;
          
        },
        getCategoryNamesByCategoryIds:(state)=>(categoryIdList)=>{

            let catNames=[];
           categoryIdList.forEach(cList=>{
              state.Categories.forEach(ct=>{
                if(cList==ct.categoryID)
                  catNames.push(ct.categoryName)
              })
           })
            return catNames;
        },
        getUserID(state){
          return state.User.userID;
        },getUser(state){
          return state.User;
        }


  }
})
