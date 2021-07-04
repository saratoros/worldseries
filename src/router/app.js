import Router from 'vue-router'
const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'TopShows',
            path: '/topshows',
            component: () => import(/* webpackChunkName: "TopShows" */ "../components/TopShows.vue"),
            props: true,
        },
        {
            name: 'Main',
            path: '/browse',
            component: () => import(/* webpackChunkName: "Main" */ "../components/Main.vue"),
        },
        {
            name: 'Details',
            path: '/details',
            component: () => import(/* webpackChunkName: "Details" */ "../components/Details.vue"),
            props: true,
        },
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "Homepage" */ "../components/Home.vue"),
        },
        // {
        //     path: '*',
        //     component: () => import(/* webpackChunkName: "Homepage" */ "../components/Home.vue")
        // }
    ]
});
export default router;
