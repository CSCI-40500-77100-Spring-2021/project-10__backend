import { RequestHandler } from 'express';

const LikeRequestHandler : RequestHandler = (req, res) => {
  console.log(req.params);
  return res.status(200).json({});
};

export default LikeRequestHandler;
