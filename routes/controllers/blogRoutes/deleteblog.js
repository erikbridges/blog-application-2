import * as Errors from "restify-errors";
import db from "../../../database/index"




export default async (req, res, next) => {
    try {
        const deleteBlog = await db("blogs")
          .del()
          .where("blog_id", req.params.id)
          .andWhere("author_id", req.users._id)
          .returning("*");
        if (deleteBlog.length == 0) {
          res.send(new Errors.NotFoundError("Cannot find blog with that id."));
        }
        res.json({
          code: 200,
          success: true,
          message: "Blog deleted successfully!"
        });
      } catch (ex) {
        res.send(new Errors.InternalError("Server Error: " + ex.message));
      }
      return next();
}