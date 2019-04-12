import db from "../../../database/index";
import * as Errors from "restify-errors";

export default async (req, res, next) => {
  try {
    const deleteUser = await db("users")
      .del()
      .where("_id", req.user._id)
      .returning("*");
    if (deleteUser.length == 0) {
      res.send(new Errors.NotFoundError("Cannot find user with that id."));
    }
    res.json({
      code: 200,
      success: true,
      message: "User deleted successfully!"
    });
  } catch (ex) {
    res.send(new Errors.InternalError("Server Error: " + ex.message));
  }
  return next();
};
