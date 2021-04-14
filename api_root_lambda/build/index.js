"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIHandler = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const app_1 = __importDefault(require("./app"));
exports.APIHandler = serverless_express_1.default({ app: app_1.default });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQTJEO0FBQzNELGdEQUF3QjtBQUVYLFFBQUEsVUFBVSxHQUFHLDRCQUFpQixDQUFDLEVBQUUsR0FBRyxFQUFILGFBQUcsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VydmVybGVzc0V4cHJlc3MgZnJvbSAnQHZlbmRpYS9zZXJ2ZXJsZXNzLWV4cHJlc3MnO1xuaW1wb3J0IGFwcCBmcm9tICcuL2FwcCc7XG5cbmV4cG9ydCBjb25zdCBBUElIYW5kbGVyID0gc2VydmVybGVzc0V4cHJlc3MoeyBhcHAgfSk7XG4iXX0=