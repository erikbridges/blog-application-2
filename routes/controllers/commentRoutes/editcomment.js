import * as Errors from "restify-errors";
import db from "../../../database";
import {validateComment} from "../../validators/validators"
export default async (req, res, next) => {
   const {comment, reply, editWhich} = req.body;
   try {
    switch (editWhich) {
        case "reply": {
            const updateComment = await db("comments")
            .update({
                replies: JSON.stringify(reply)
            })
            .where("comment_id", req.params.id)
            .andWhere("author_id", req.user._id)
            
            res.json({
                code: 200,
                message: "Replies Updated Successfully."
            })
            return next();
            
        }
        case "comment": {
             // Validate Comment 
            const validComment = validateComment(comment);
            if (validComment.error) {
                res.send(new Errors.UnprocessableEntityError(validPost.errorMessage))
                return next();
            } 
            // Update Comment
            const updateComment = await db("comments")
            .update({
                comment_text: validComment.comment
            })
            .where("comment_id", req.params.id)
            .andWhere("author_id", req.user._id)

            res.json({code: 200, message: "Comment edited successfully."})
            return next();
        }
        default: {
            res.json(new Errors.UnprocessableEntityError("Edit which is not specified."))
            return next()
        }
    }
   
   } catch (ex) {
        res.json(new Errors.InternalServerError("Server Error: " + ex.message))
        return next()
   }
  
}