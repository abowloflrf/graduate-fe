import Vue from "vue";
import Router from "vue-router";
import PostForm from "./components/PostForm";
import PostsShow from "./components/PostsShow";
import PostDetail from "./components/PostDetail";
import HotShow from "./components/HotShow";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/hot"
        },
        {
            path: "/hot",
            component: HotShow
        },
        {
            path: "/place/:pid",
            name: "place",
            component: PostsShow
        },
        {
            path: "/post",
            component: PostForm
        },
        {
            path: "/post/:id",
            name: "post",
            component: PostDetail
        },
        {
            path: "*",
            component: PostsShow
        }
    ]
});
