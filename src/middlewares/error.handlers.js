export const error404Handler = async (req, res, next) => {
  let error = new Error();
  res.json({
    status: 404,
    msg: `The resource your're looking for does not exist`,
  });

  next();
};
