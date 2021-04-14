"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_express_1 = require("@vendia/serverless-express");
const echoRouteHandler = (_, res) => {
    res.status(200).json({
        event: serverless_express_1.getCurrentInvoke().event,
    });
};
exports.default = echoRouteHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlci9lY2hvL2VjaG8uaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUE4RDtBQUc5RCxNQUFNLGdCQUFnQixHQUFvQixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixLQUFLLEVBQUUscUNBQWdCLEVBQUUsQ0FBQyxLQUFLO0tBQ2hDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLGtCQUFlLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q3VycmVudEludm9rZSB9IGZyb20gJ0B2ZW5kaWEvc2VydmVybGVzcy1leHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmNvbnN0IGVjaG9Sb3V0ZUhhbmRsZXIgOiBSZXF1ZXN0SGFuZGxlciA9IChfLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIGV2ZW50OiBnZXRDdXJyZW50SW52b2tlKCkuZXZlbnQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWNob1JvdXRlSGFuZGxlcjtcbiJdfQ==