"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryBucket = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const setup_1 = require("../util/setup");
const S3_BUCKET_NAME = setup_1.GetENVOrThrow('GALLERY_BUCKET_NAME');
class GalleryBucket {
    static async UploadImage(key, imageData) {
        const S3 = new aws_sdk_1.default.S3();
        const result = await S3.upload({
            Body: imageData,
            Key: key,
            Bucket: S3_BUCKET_NAME,
            StorageClass: 'ONEZONE_IA',
        }).promise();
        return {
            imageUrl: result.Location,
        };
    }
}
exports.GalleryBucket = GalleryBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvczMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTBCO0FBQzFCLHlDQUE4QztBQUU5QyxNQUFNLGNBQWMsR0FBRyxxQkFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFNNUQsTUFBYSxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUN0QixHQUFXLEVBQ1gsU0FBaUI7UUFFakIsTUFBTSxFQUFFLEdBQUcsSUFBSSxpQkFBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxHQUFHO1lBQ1IsTUFBTSxFQUFFLGNBQWM7WUFDdEIsWUFBWSxFQUFFLFlBQVk7U0FDM0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEJELHNDQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBHZXRFTlZPclRocm93IH0gZnJvbSAnLi4vdXRpbC9zZXR1cCc7XG5cbmNvbnN0IFMzX0JVQ0tFVF9OQU1FID0gR2V0RU5WT3JUaHJvdygnR0FMTEVSWV9CVUNLRVRfTkFNRScpO1xuXG5leHBvcnQgdHlwZSBHYWxsZXJ5SW1hZ2VVcGxvYWRQYXlsb2FkID0ge1xuICBpbWFnZVVybDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBHYWxsZXJ5QnVja2V0IHtcbiAgc3RhdGljIGFzeW5jIFVwbG9hZEltYWdlKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGltYWdlRGF0YTogQnVmZmVyLFxuICApIDogUHJvbWlzZTxHYWxsZXJ5SW1hZ2VVcGxvYWRQYXlsb2FkPiB7XG4gICAgY29uc3QgUzMgPSBuZXcgQVdTLlMzKCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUzMudXBsb2FkKHtcbiAgICAgIEJvZHk6IGltYWdlRGF0YSxcbiAgICAgIEtleToga2V5LFxuICAgICAgQnVja2V0OiBTM19CVUNLRVRfTkFNRSxcbiAgICAgIFN0b3JhZ2VDbGFzczogJ09ORVpPTkVfSUEnLFxuICAgIH0pLnByb21pc2UoKTtcbiAgICByZXR1cm4ge1xuICAgICAgaW1hZ2VVcmw6IHJlc3VsdC5Mb2NhdGlvbixcbiAgICB9O1xuICB9XG59XG4iXX0=