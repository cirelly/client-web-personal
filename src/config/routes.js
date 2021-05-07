// Layout
import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutBasic from '../layouts/LayoutBasic'
//Admin pages
import AdminHome from '../pages/Admin'
import AdminSignIn from '../pages/Admin/SignIn'
import AdminUsers from '../pages/Admin/Users'
import AdminCourses from '../pages/Admin/AdminCourses'
//Pages
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Error404 from '../pages/Error404'
import AdminMenuWeb from '../pages/Admin/MenuWeb/MenuWeb'
import Courses from '../pages/Courses'
import AdminBlog from '../pages/Admin/Blog'
import WebBlog from '../pages/Blog'
const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact:true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/courses",
                component: AdminCourses,
                exact: true
            },
            {
                path: "/admin/blog",
                component: AdminBlog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path: "/courses",
                component: Courses,
                exact: true
            },
            {
                path: "/blog",
                component: WebBlog,
                exact: true
            },
            {
                path: "/blog/:url",
                component: WebBlog,
                exact: true
            },
            {
                component: Error404
            }
        ]

    }
]
export default routes;


