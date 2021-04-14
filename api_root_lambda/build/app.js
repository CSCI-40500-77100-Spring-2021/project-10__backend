"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const error_request_handler_1 = __importDefault(require("./error/error_request_handler"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '6mb' }));
app.use(router_1.default);
app.use(error_request_handler_1.default);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qiw4REFBcUM7QUFDckMsZ0RBQXdCO0FBQ3hCLHNEQUE4QjtBQUM5QiwwRkFBZ0U7QUFFaEUsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUVoQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUUzQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLCtCQUFtQixDQUFDLENBQUM7QUFFN0Isa0JBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IGVycm9yUmVxdWVzdEhhbmRsZXIgZnJvbSAnLi9lcnJvci9lcnJvcl9yZXF1ZXN0X2hhbmRsZXInO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoY29ycygpKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBsaW1pdDogJzZtYicgfSkpO1xuXG5hcHAudXNlKHJvdXRlcik7XG5hcHAudXNlKGVycm9yUmVxdWVzdEhhbmRsZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iXX0=