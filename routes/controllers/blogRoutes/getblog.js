import * as Errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
  try {
    const getBlogById = await db("blogs")
      .select("*")
      .where("blog_id", req.params.id);
    if (getBlogById.length === 0) {
      res.send(new Errors.NotFoundError("Blog post not found."));
      return next();
    }
    const getAuthorById = await db("users")
      .select("username")
      .where("_id", getBlogById[0].author_id);

    res.send({ ...getBlogById[0], author_name: getAuthorById[0].username });
    return next();
  } catch (ex) {
    res.send(
      new Errors.InternalServerError(
        "Server issues at the moment. " + ex.message
      )
    );
    return next();
  }
};
