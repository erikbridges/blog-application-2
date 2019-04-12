import * as Errors from "restify-errors";
import db from "../../../database/index";

export default (req, res, next) => {
    try {
        // Get All the comments with the blog id specified.
        const getAllComments = db("comments").select("*").where("blog_id", req.params.blogid);
        if (getAllComments.length == 0) {
            res.send({
                code: 200,
                message: "No Comments Found."
            });
            return next();
        }
        res.send(getAllComments);
        return next();
    } catch (ex) {
        // Return Error if there is something wrong.
        res.send(new Errors.InternalServerError("Server Error: " + ex.message));
        return next();
    }
}