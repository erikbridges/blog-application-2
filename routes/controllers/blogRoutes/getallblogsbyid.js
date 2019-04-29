import * as Errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
  try {
    // Get All Blogs From The User Id
    const GetAllBlogsById = await db("blogs")
      .select("*")
      .where("author_id", req.user._id);
    if (GetAllBlogsById.length == 0) {
      res.send(new Errors.NotFoundError("No blogs are found."));
      return next();
    }
    res.json(GetAllBlogsById);
    return next();
  } catch (ex) {
    res.send(
      new Errors.InternalServerError(
        "Server issues at the moment..." + ex.message
      )
    );
    return next();
  }
};
