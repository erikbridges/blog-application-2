/* Router Creation
_________________________________*/
import { Router } from "restify-router";

const routerInstance = new Router();

/* Authentication 
_________________________________*/
import passport from "passport";
import "./auth/auth";

// Test Route
import test from "./controllers/test";

/* User Controllers
________________________________*/
import Register from "./controllers/userRoutes/register";
import Login from "./controllers/userRoutes/login";
import GetUser from "./controllers/userRoutes/getuser";
import EditUser from "./controllers/userRoutes/edituser";
import DeleteUser from "./controllers/userRoutes/deleteuser";

/* Blog Controllers
________________________________________*/
import CreateBlog from "./controllers/blogRoutes/createblog";
import GetAllBlogs from "./controllers/blogRoutes/getallblogs";
import GetAllBlogsById from "./controllers/blogRoutes/getallblogsbyid";
import GetBlog from "./controllers/blogRoutes/getblog";
import EditBlog from "./controllers/blogRoutes/editblog";
import DeleteBlog from "./controllers/blogRoutes/deleteblog";

/* Comment Controllers 
_____________________________________*/
import CreateComment from "./controllers/commentRoutes/createcomment";
import GetAllComments from "./controllers/commentRoutes/getallcomments";
import GetComment from "./controllers/commentRoutes/getcomment";
import EditComment from "./controllers/commentRoutes/editcomment";
import DeleteComment from "./controllers/commentRoutes/deletecomment";

/* Test Route
_________________________*/
routerInstance.get("/", test);

/* User Routes
__________________________________*/

/* ===== Register User ===== */
routerInstance.post("/register", Register);
/* ===== Login User ===== */
routerInstance.post("/login", Login);
/* ===== Get User ===== */
routerInstance.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  GetUser
);
/* ===== Edit User ===== */
routerInstance.patch(
  "/users",
  passport.authenticate("jwt", { session: false }),
  EditUser
);
/* ===== Delete User ===== */
routerInstance.del(
  "/users",
  passport.authenticate("jwt", { session: false }),
  DeleteUser
);

/* Blog Routes 
_________________________________*/

/* ==== Create Blog ==== */
routerInstance.post(
  "/blogs/new",
  passport.authenticate("jwt", { session: false }),
  CreateBlog
);

/* === Get All Blogs From All Authors === */
routerInstance.get("/blogs/all", GetAllBlogs);

/* === Get All Blogs By Author Id === */
routerInstance.get(
  "/blogs",
  passport.authenticate("jwt", { session: false }),
  GetAllBlogsById
);
/* ==== Get Blog ==== */
routerInstance.get("/blogs/:id", GetBlog);

/* ==== Edit Blog ==== */
routerInstance.patch(
  "/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  EditBlog
);
/* ==== Delete Blog ==== */
routerInstance.del(
  "/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  DeleteBlog
);

/* Comment Routes
_______________________________________*/

/* === Create Comment === */
routerInstance.post(
  "/comments/:blogid",
  passport.authenticate("jwt", { session: false }),
  CreateComment
);
/* === Get All Comments === */

routerInstance.get("/comments/:blogid", GetAllComments);
/* === Get Comment === */
routerInstance.get("/comment/:id", GetComment);
/* === Edit Comment === */
routerInstance.patch(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  EditComment
);
/* === Delete Comment === */
routerInstance.del(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  DeleteComment
);

// Export Router
export default routerInstance;
