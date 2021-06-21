import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Movies from '../views/Movies.vue'
import AddMovie from '../views/AddMovie.vue'
import MoviesDetail from '../views/MoviesDetail.vue'
import AddCategory from '../views/AddCategory.vue'
import Categories from '../views/Categories.vue'
import EditCategory from '../views/EditCategory.vue'
import EditMovie from '../views/EditMovie.vue'
import store from '../store/index.js'

const authGuard=(to,from,next)=>{
  if(store.getters.isAuthenticated){
    next();
  }else{
    next({
      name:'login'
    });
  }
};
const routes = [
  {
    path: '/',
    name: 'About',
    beforeEnter: authGuard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/login',
    name: 'login',
    component: Login
  },{
    path:'/register',
    name:'register',
    component : Register
  },{
    path:'/movies',
    name:'movies',
    component : Movies,
    beforeEnter: authGuard
  },{
    path:'/addMovie',
    name:'addMovie',
    component:AddMovie,
    beforeEnter: authGuard
  },{
    path:'/movie',
    name:'movie',
    component:MoviesDetail,
    beforeEnter: authGuard
  },{
    path:'/addCategory',
    name:'addCategory',
    component:AddCategory,
    beforeEnter: authGuard
  },{
    path:'/categories',
    name:'categories',
    component: Categories,
    beforeEnter: authGuard
  },{
    path:'/editCategory',
    name:'editCategory',
    component:EditCategory,
    beforeEnter: authGuard
  },{
    path:'/editMovie',
    name:'editMovie',
    component:EditMovie,
    beforeEnter: authGuard
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
