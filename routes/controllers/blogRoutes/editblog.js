import * as Errors from "restify-errors";
import db from "../../../database/index";
import { validateTitle, validatePost } from "../../validators/validators";

export default async (req, res, next) => {
  const { title, post, editWhich } = req.body;
  try {
    switch (editWhich) {
      case "title": {
        // Validate Title
        /* === TITLE === */
        const validTitle = validateTitle(title);
        if (validTitle.error) {
          res.send(
            new Errors.UnprocessableEntityError(validTitle.errorMessage)
          );
          return next();
        }
        const updateTitle = await db("blogs")
          .update({
            title
          })
          .where("blog_id", req.params.id)
          .andWhere("author_id".req.users._id);

        res.json({ code: 200, message: "Blog has been updated successfully." });
        return next();
      }
      case "hidden": {
        const updateHidden = await db("blogs")
          .update({
            hidden
          })
          .where("blog_id", req.params.id)
          .andWhere("author_id".req.users._id);
        if (updateHidden.length !== 0) {
          res.send(new Errors.InternalError("Failed to update blog post."));
          return next();
        }
        res.json({ code: 200, message: "Blog has been updated successfully." });
        return next();
      }
      case "post": {
        // Validate Post
        /* === POST === */
        const validPost = validatePost(post);
        if (validPost.error) {
          res.send(new Errors.UnprocessableEntityError(validPost.errorMessage));
          return next();
        }
        const updatePost = await db("blogs")
          .update({
            post
          })
          .where("blog_id", req.params.id)
          .andWhere("author_id".req.users._id);

        res.json({ code: 200, message: "Blog has been updated successfully." });
        return next();
      }
      default: {
        res.send(
          new Errors.UnprocessableEntityError("Edit which is not specified.")
        );
        return next();
      }
    }
  } catch (ex) {
    res.send(
      new Errors.InternalServerError(
        "Something is wrong with our servers at the time." + ex.message
      )
    );
    return next();
  }
};
