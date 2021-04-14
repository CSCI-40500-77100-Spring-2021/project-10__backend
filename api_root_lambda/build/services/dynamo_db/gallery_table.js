"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryTable = void 0;
const dynamodb_1 = __importDefault(require("aws-sdk/clients/dynamodb"));
const setup_1 = require("../../util/setup");
class GalleryTable {
    static async PutItem(props) {
        const { primaryKey, secondaryKey, attributes, } = props;
        const itemKeys = {
            pk: {
                S: primaryKey,
            },
        };
        if (props.secondaryKey) {
            itemKeys.sk = {
                S: secondaryKey,
            };
        }
        await this.DB.putItem({
            TableName: this.TABLE_NAME,
            Item: {
                ...itemKeys,
                ...attributes,
            },
        }).promise();
    }
}
exports.GalleryTable = GalleryTable;
GalleryTable.DB = new dynamodb_1.default();
GalleryTable.TABLE_NAME = setup_1.GetENVOrThrow('GALLERY_TABLE_NAME');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeV90YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9keW5hbW9fZGIvZ2FsbGVyeV90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3RUFBOEU7QUFDOUUsNENBQWlEO0FBUWpELE1BQWEsWUFBWTtJQUt2QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUErQjtRQUNsRCxNQUFNLEVBQ0osVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEdBQ1gsR0FBRyxLQUFLLENBQUM7UUFDVixNQUFNLFFBQVEsR0FBOEI7WUFDMUMsRUFBRSxFQUFFO2dCQUNGLENBQUMsRUFBRSxVQUFVO2FBQ2Q7U0FDRixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3RCLFFBQVEsQ0FBQyxFQUFFLEdBQUc7Z0JBQ1osQ0FBQyxFQUFFLFlBQVk7YUFDaEIsQ0FBQztTQUNIO1FBQ0QsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNwQixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDMUIsSUFBSSxFQUFFO2dCQUNKLEdBQUcsUUFBUTtnQkFDWCxHQUFHLFVBQVU7YUFDZDtTQUNGLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7O0FBNUJILG9DQTZCQztBQTVCZ0IsZUFBRSxHQUFHLElBQUksa0JBQVEsRUFBRSxDQUFBO0FBRW5CLHVCQUFVLEdBQUcscUJBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IER5bmFtb0RCLCB7IFB1dEl0ZW1JbnB1dEF0dHJpYnV0ZU1hcCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYic7XG5pbXBvcnQgeyBHZXRFTlZPclRocm93IH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cCc7XG5cbmV4cG9ydCB0eXBlIEdhbGxlcnlUYWJsZVB1dEl0ZW1JbnB1dCA9IHtcbiAgcHJpbWFyeUtleTogc3RyaW5nLFxuICBzZWNvbmRhcnlLZXk/OiBzdHJpbmcsXG4gIGF0dHJpYnV0ZXM6IFB1dEl0ZW1JbnB1dEF0dHJpYnV0ZU1hcFxufVxuXG5leHBvcnQgY2xhc3MgR2FsbGVyeVRhYmxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgREIgPSBuZXcgRHluYW1vREIoKVxuXG4gIHByaXZhdGUgc3RhdGljIFRBQkxFX05BTUUgPSBHZXRFTlZPclRocm93KCdHQUxMRVJZX1RBQkxFX05BTUUnKTtcblxuICBzdGF0aWMgYXN5bmMgUHV0SXRlbShwcm9wczogR2FsbGVyeVRhYmxlUHV0SXRlbUlucHV0KSA6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHByaW1hcnlLZXksXG4gICAgICBzZWNvbmRhcnlLZXksXG4gICAgICBhdHRyaWJ1dGVzLFxuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCBpdGVtS2V5cyA6IFB1dEl0ZW1JbnB1dEF0dHJpYnV0ZU1hcCA9IHtcbiAgICAgIHBrOiB7XG4gICAgICAgIFM6IHByaW1hcnlLZXksXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKHByb3BzLnNlY29uZGFyeUtleSkge1xuICAgICAgaXRlbUtleXMuc2sgPSB7XG4gICAgICAgIFM6IHNlY29uZGFyeUtleSxcbiAgICAgIH07XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuREIucHV0SXRlbSh7XG4gICAgICBUYWJsZU5hbWU6IHRoaXMuVEFCTEVfTkFNRSxcbiAgICAgIEl0ZW06IHtcbiAgICAgICAgLi4uaXRlbUtleXMsXG4gICAgICAgIC4uLmF0dHJpYnV0ZXMsXG4gICAgICB9LFxuICAgIH0pLnByb21pc2UoKTtcbiAgfVxufVxuIl19