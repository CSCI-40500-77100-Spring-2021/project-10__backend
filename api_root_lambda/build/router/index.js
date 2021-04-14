"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const echo_1 = __importDefault(require("./echo"));
const me_1 = __importDefault(require("./me"));
const router = express_1.Router();
router.use('/echo', echo_1.default);
router.use('/me', me_1.default);
router.route('/').get((_, res) => {
    res.status(200).json({ message: 'Welcome to MealSnapAPI Router' });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWlDO0FBQ2pDLGtEQUFnQztBQUNoQyw4Q0FBNEI7QUFFNUIsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQVUsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVEsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLCtCQUErQixFQUFFLENBQUMsQ0FBQztBQUNyRSxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGVjaG9Sb3V0ZXIgZnJvbSAnLi9lY2hvJztcbmltcG9ydCBtZVJvdXRlciBmcm9tICcuL21lJztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci51c2UoJy9lY2hvJywgZWNob1JvdXRlcik7XG5yb3V0ZXIudXNlKCcvbWUnLCBtZVJvdXRlcik7XG5cbnJvdXRlci5yb3V0ZSgnLycpLmdldCgoXywgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogJ1dlbGNvbWUgdG8gTWVhbFNuYXBBUEkgUm91dGVyJyB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=