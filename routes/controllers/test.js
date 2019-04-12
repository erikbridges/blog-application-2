import * as errors from "restify-errors";

export default async (req, res, next) => {
  try {
    res.json({ code: 200 });
    return next();
  } catch (e) {
    res.send(new errors.InternalError("Something is wrong with the server."));
    return next();
  }
};
