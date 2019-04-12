import * as Errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
    try {
        const getBlogById = await db("blogs").select("*").where("blog_id", req.params.id)
        if (getBlogById.length === 0) {
            res.send(new Errors.NotFoundError("Blog post not found."))
            return next();
        }
        res.send(getBlogById[0]);
        return next()
    } catch (ex) {
        res.send(new Errors.InternalServerError("Server issues at the moment. " + ex.message))
        return next();
    }
}