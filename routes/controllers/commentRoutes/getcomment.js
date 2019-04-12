import * as Errors from "restify-errors";
import db from "../../../database/index";
export default async (req, res, next) => {
    try {
        const getComment = await db("comments").select("*").where("comment_id", req.params.id);
        res.json(getComment);
        return next();
    } catch (ex) {
        res.send(new Errors.InternalServerError("Server Error: " + ex.message))
        return next()
    }
}