import * as Errors from "restify-errors";
import db from "../../../database/index"
import shortid from "shortid"
import {validateTitle, validatePost} from "../../validators/validators"

export default async (req, res, next) => {
    try {
        // Create Blog
        const {title, post} = req.body;
        const date = new Date();
        const _id = shortid.generate();
        /* Validate Post 
        ______________________________*/
        /* === TITLE === */
        const validTitle = validateTitle(title);
        if (validTitle.error) {
            res.send(new Errors.UnprocessableEntityError(validTitle.errorMessage))
            return next()
        } 
        /* === POST === */
        const validPost = validatePost(post);
        if (validPost.error) {
            res.send(new Errors.UnprocessableEntityError(validPost.errorMessage))
            return next()
        } 
        /*   **** CREATE BLOG POST ****   
        _________________________________________*/
        const newBlog = await db("blogs").insert({
            blog_id: _id, 
            datecreated: date,
            title: validTitle.title,
            post: validPost.post
        });
         res.json({
            code: 200,
            message: "Blog created successfully!"
        });  
        return next();
    } catch (ex) {
        res.send(new Errors.InternalError("Error: " + ex.message))
    }
    return next();
}