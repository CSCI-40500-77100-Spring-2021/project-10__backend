import { Router } from "express";
import LikeRequestHandler from "../router_handler/interaction/like";
import echoRouter from "./echo";
import meRouter from "./me";

const router = Router();

router.use("/echo", echoRouter);
router.use("/me", meRouter);

router
  .route("/user/:userId/photo/:photoId/interaction/like")
  .post(LikeRequestHandler);

router.route("/").get((_, res) => {
  res.status(200).json({ message: "Welcome to MealSnapAPI Router" });
});

export default router;
