import * as Errors from "restify-errors";
import db from "../../../database/index"




export default async (req, res, next) => {
    try {
        const deleteComment = await db("comment")
          .del()
          .where("comment_id", req.params.id)
          .andWhere("author_id", req.users._id)
          .returning("*");
        if (deleteComment.length == 0) {
          res.send(new Errors.NotFoundError("Cannot find a comment with that id."));
        }
        res.json({
          code: 200,
          success: true,
          message: "Comment deleted successfully!"
        });
      } catch (ex) {
        res.send(new Errors.InternalError("Server Error: " + ex.message));
      }
      return next();
}