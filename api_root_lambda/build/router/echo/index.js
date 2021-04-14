"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const echo_handler_1 = __importDefault(require("./echo.handler"));
const router = express_1.Router();
router
    .route('/')
    .get(echo_handler_1.default)
    .post(echo_handler_1.default)
    .patch(echo_handler_1.default)
    .delete(echo_handler_1.default);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVyL2VjaG8vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBaUM7QUFDakMsa0VBQThDO0FBRTlDLE1BQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNO0tBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLEdBQUcsQ0FBQyxzQkFBZ0IsQ0FBQztLQUNyQixJQUFJLENBQUMsc0JBQWdCLENBQUM7S0FDdEIsS0FBSyxDQUFDLHNCQUFnQixDQUFDO0tBQ3ZCLE1BQU0sQ0FBQyxzQkFBZ0IsQ0FBQyxDQUFDO0FBRTVCLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGVjaG9Sb3V0ZUhhbmRsZXIgZnJvbSAnLi9lY2hvLmhhbmRsZXInO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyXG4gIC5yb3V0ZSgnLycpXG4gIC5nZXQoZWNob1JvdXRlSGFuZGxlcilcbiAgLnBvc3QoZWNob1JvdXRlSGFuZGxlcilcbiAgLnBhdGNoKGVjaG9Sb3V0ZUhhbmRsZXIpXG4gIC5kZWxldGUoZWNob1JvdXRlSGFuZGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==