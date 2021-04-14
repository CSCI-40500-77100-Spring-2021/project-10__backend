"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_express_1 = require("@vendia/serverless-express");
const logger_1 = __importDefault(require("../util/logger"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorRequestHandler = (error, request, response, _next) => {
    const TAG = errorRequestHandler.name;
    logger_1.default.error(TAG, 'Error');
    console.error(error);
    logger_1.default.error(TAG, 'Request');
    logger_1.default.error(TAG, request);
    logger_1.default.error(TAG, 'Event');
    logger_1.default.error(TAG, JSON.stringify(serverless_express_1.getCurrentInvoke().event, null, '\t'));
    return response.status(error.status || 500).json({
        error: {
            message: error.message || 'Oops! Something went wrong.',
        },
    });
};
exports.default = errorRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9yL2Vycm9yX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1FQUE4RDtBQUU5RCw0REFBb0M7QUFFcEMsNkRBQTZEO0FBQzdELE1BQU0sbUJBQW1CLEdBQXlCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDcEYsTUFBTSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO0lBQ3JDLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFnQixFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQyxLQUFLLEVBQUU7WUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSw2QkFBNkI7U0FDeEQ7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEN1cnJlbnRJbnZva2UgfSBmcm9tICdAdmVuZGlhL3NlcnZlcmxlc3MtZXhwcmVzcyc7XG5pbXBvcnQgeyBFcnJvclJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL3V0aWwvbG9nZ2VyJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuY29uc3QgZXJyb3JSZXF1ZXN0SGFuZGxlciA6IEVycm9yUmVxdWVzdEhhbmRsZXIgPSAoZXJyb3IsIHJlcXVlc3QsIHJlc3BvbnNlLCBfbmV4dCkgPT4ge1xuICBjb25zdCBUQUcgPSBlcnJvclJlcXVlc3RIYW5kbGVyLm5hbWU7XG4gIGxvZ2dlci5lcnJvcihUQUcsICdFcnJvcicpO1xuICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgbG9nZ2VyLmVycm9yKFRBRywgJ1JlcXVlc3QnKTtcbiAgbG9nZ2VyLmVycm9yKFRBRywgcmVxdWVzdCk7XG4gIGxvZ2dlci5lcnJvcihUQUcsICdFdmVudCcpO1xuICBsb2dnZXIuZXJyb3IoVEFHLCBKU09OLnN0cmluZ2lmeShnZXRDdXJyZW50SW52b2tlKCkuZXZlbnQsIG51bGwsICdcXHQnKSk7XG4gIHJldHVybiByZXNwb25zZS5zdGF0dXMoZXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbih7XG4gICAgZXJyb3I6IHtcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgJ09vcHMhIFNvbWV0aGluZyB3ZW50IHdyb25nLicsXG4gICAgfSxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlcnJvclJlcXVlc3RIYW5kbGVyO1xuIl19