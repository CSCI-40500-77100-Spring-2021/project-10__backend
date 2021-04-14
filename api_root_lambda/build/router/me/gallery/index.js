"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const add_to_gallery_handler_1 = __importDefault(require("./add_to_gallery.handler"));
const router = express_1.Router();
router.route('/add-entry')
    .post(add_to_gallery_handler_1.default);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcm91dGVyL21lL2dhbGxlcnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBaUM7QUFDakMsc0ZBQW9FO0FBRXBFLE1BQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztLQUN2QixJQUFJLENBQUMsZ0NBQTRCLENBQUMsQ0FBQztBQUV0QyxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBBZGRUb015R2FsbGVyeVJlcXVlc3RIYW5kbGVyIGZyb20gJy4vYWRkX3RvX2dhbGxlcnkuaGFuZGxlcic7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucm91dGUoJy9hZGQtZW50cnknKVxuICAucG9zdChBZGRUb015R2FsbGVyeVJlcXVlc3RIYW5kbGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIl19