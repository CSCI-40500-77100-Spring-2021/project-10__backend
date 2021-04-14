"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetENVOrThrow = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GetENVOrThrow = (varname) => {
    if (process.env[varname] === undefined)
        throw new Error(`Missing ENV Var: ${varname}`);
    return process.env[varname];
};
exports.GetENVOrThrow = GetENVOrThrow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBNEI7QUFFNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVULE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBZSxFQUFXLEVBQUU7SUFDeEQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVM7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZGLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQVcsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFIVyxRQUFBLGFBQWEsaUJBR3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCBjb25zdCBHZXRFTlZPclRocm93ID0gKHZhcm5hbWU6IHN0cmluZykgOiBzdHJpbmcgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnZbdmFybmFtZV0gPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIEVOViBWYXI6ICR7dmFybmFtZX1gKTtcbiAgcmV0dXJuIHByb2Nlc3MuZW52W3Zhcm5hbWVdIGFzIHN0cmluZztcbn07XG4iXX0=