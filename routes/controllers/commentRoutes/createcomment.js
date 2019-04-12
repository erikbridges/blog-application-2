import * as Errors from "restify-errors";
import shortid from "shortid";
import db from "../../../database/index"
import {validateComment} from "../../validators/validators"
export default async (req, res, next) => {
    try {
        const { comment } = req.body
        // Validate Comment 
        const validComment = validateComment(comment);
        if (validComment.error) {
            res.send(new Errors.UnprocessableEntityError(validPost.errorMessage))
            return next();
        } 
        // Create Comment 
        const createComment = await db("comments").insert({
            comment_id: shortid.generate(),
            blog_id: req.params.blogid,
            author_id: req.users._id,
            comment_text: validComment.comment,
            replies: JSON.stringify([])
        })
        // Send Response
        res.json({
            code: 200,
            message: "Comment added successfully."
        })
        return next();
    } catch (ex) {
        res.send(new Errors.InternalServerError("Something is wrong with the server..." + ex.message))
        return next()
    }
   
}