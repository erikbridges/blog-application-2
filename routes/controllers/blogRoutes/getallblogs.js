import * as Errors from "restify-errors";
import db from "../../../database/index"

export default async (req, res, next) => {
    try {
        const GetAllBlogs = await db("blogs").select("*").where("author_id", req.user._id);
        if (GetAllBlogs.length == 0) {
            res.send(new Errors.NotFoundError("No blogs are found."))
            return next();
        }
        res.json(GetAllBlogs);
        return next();
    } catch (ex) {
        res.send(new Errors.InternalServerError("Server issues at the moment..." + ex.message))
        return next()
    }
}