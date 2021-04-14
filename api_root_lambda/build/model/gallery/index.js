"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gallery_table_1 = require("../../services/dynamo_db/gallery_table");
const gallery_table_key_1 = require("../../services/dynamo_db/gallery_table_key");
const s3_1 = require("../../services/s3");
const logger_1 = __importDefault(require("../../util/logger"));
const uuid_1 = __importDefault(require("../../util/uuid"));
class Gallery {
    static async AddToGallery(userId, props) {
        const TAG = Gallery.AddToGallery.name;
        const { title, description, imageData } = props;
        const imageKey = `${uuid_1.default()}.jpg`;
        logger_1.default.info(TAG, 'Uploading image to S3');
        const { imageUrl } = await s3_1.GalleryBucket.UploadImage(imageKey, imageData);
        const attributes = {
            title: {
                S: title,
            },
            description: {
                S: description,
            },
            imageUrl: {
                S: imageUrl,
            },
        };
        const primaryKey = gallery_table_key_1.GalleryTablePrimaryKey.userId(userId);
        const photoId = uuid_1.default();
        const secondaryKey = gallery_table_key_1.GalleryTableSecondaryKey.photoId(photoId);
        logger_1.default.info(TAG, 'Uploading to DnamoDB');
        await gallery_table_1.GalleryTable.PutItem({
            primaryKey,
            secondaryKey,
            attributes,
        });
        return {
            id: photoId,
            title,
            description,
            imageUrl,
        };
    }
}
exports.default = Gallery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvZ2FsbGVyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDBFQUFzRTtBQUN0RSxrRkFBOEc7QUFDOUcsMENBQWtEO0FBQ2xELCtEQUF1QztBQUN2QywyREFBeUM7QUFlekMsTUFBcUIsT0FBTztJQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDdkIsTUFBYyxFQUNkLEtBQTJCO1FBRTNCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3RDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxHQUFHLGNBQVUsRUFBRSxNQUFNLENBQUM7UUFDdkMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDMUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sa0JBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sVUFBVSxHQUE4QjtZQUM1QyxLQUFLLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLEtBQUs7YUFDVDtZQUNELFdBQVcsRUFBRTtnQkFDWCxDQUFDLEVBQUUsV0FBVzthQUNmO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxRQUFRO2FBQ1o7U0FDRixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsMENBQXNCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELE1BQU0sT0FBTyxHQUFHLGNBQVUsRUFBRSxDQUFDO1FBQzdCLE1BQU0sWUFBWSxHQUFHLDRDQUF3QixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUN6QyxNQUFNLDRCQUFZLENBQUMsT0FBTyxDQUFDO1lBQ3pCLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtTQUNYLENBQUMsQ0FBQztRQUNILE9BQU87WUFDTCxFQUFFLEVBQUUsT0FBTztZQUNYLEtBQUs7WUFDTCxXQUFXO1lBQ1gsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFyQ0QsMEJBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHV0SXRlbUlucHV0QXR0cmlidXRlTWFwIH0gZnJvbSAnYXdzLXNkay9jbGllbnRzL2R5bmFtb2RiJztcbmltcG9ydCB7IEdhbGxlcnlUYWJsZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2R5bmFtb19kYi9nYWxsZXJ5X3RhYmxlJztcbmltcG9ydCB7IEdhbGxlcnlUYWJsZVByaW1hcnlLZXksIEdhbGxlcnlUYWJsZVNlY29uZGFyeUtleSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2R5bmFtb19kYi9nYWxsZXJ5X3RhYmxlX2tleSc7XG5pbXBvcnQgeyBHYWxsZXJ5QnVja2V0IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvczMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi8uLi91dGlsL2xvZ2dlcic7XG5pbXBvcnQgR2VuZXJhdGVJZCBmcm9tICcuLi8uLi91dGlsL3V1aWQnO1xuXG5leHBvcnQgdHlwZSBBZGRHYWxsZXJ5RW50cnlQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW1hZ2VEYXRhOiBCdWZmZXI7XG59O1xuXG5leHBvcnQgdHlwZSBHYWxsZXJ5SW1hZ2VTdW1tYXJ5ID0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbWFnZVVybDogc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FsbGVyeSB7XG4gIHN0YXRpYyBhc3luYyBBZGRUb0dhbGxlcnkoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcHJvcHM6IEFkZEdhbGxlcnlFbnRyeVByb3BzLFxuICApOiBQcm9taXNlPEdhbGxlcnlJbWFnZVN1bW1hcnk+IHtcbiAgICBjb25zdCBUQUcgPSBHYWxsZXJ5LkFkZFRvR2FsbGVyeS5uYW1lO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBpbWFnZURhdGEgfSA9IHByb3BzO1xuICAgIGNvbnN0IGltYWdlS2V5ID0gYCR7R2VuZXJhdGVJZCgpfS5qcGdgO1xuICAgIGxvZ2dlci5pbmZvKFRBRywgJ1VwbG9hZGluZyBpbWFnZSB0byBTMycpO1xuICAgIGNvbnN0IHsgaW1hZ2VVcmwgfSA9IGF3YWl0IEdhbGxlcnlCdWNrZXQuVXBsb2FkSW1hZ2UoaW1hZ2VLZXksIGltYWdlRGF0YSk7XG4gICAgY29uc3QgYXR0cmlidXRlcyA6IFB1dEl0ZW1JbnB1dEF0dHJpYnV0ZU1hcCA9IHtcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIFM6IHRpdGxlLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIFM6IGRlc2NyaXB0aW9uLFxuICAgICAgfSxcbiAgICAgIGltYWdlVXJsOiB7XG4gICAgICAgIFM6IGltYWdlVXJsLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHByaW1hcnlLZXkgPSBHYWxsZXJ5VGFibGVQcmltYXJ5S2V5LnVzZXJJZCh1c2VySWQpO1xuICAgIGNvbnN0IHBob3RvSWQgPSBHZW5lcmF0ZUlkKCk7XG4gICAgY29uc3Qgc2Vjb25kYXJ5S2V5ID0gR2FsbGVyeVRhYmxlU2Vjb25kYXJ5S2V5LnBob3RvSWQocGhvdG9JZCk7XG4gICAgbG9nZ2VyLmluZm8oVEFHLCAnVXBsb2FkaW5nIHRvIERuYW1vREInKTtcbiAgICBhd2FpdCBHYWxsZXJ5VGFibGUuUHV0SXRlbSh7XG4gICAgICBwcmltYXJ5S2V5LFxuICAgICAgc2Vjb25kYXJ5S2V5LFxuICAgICAgYXR0cmlidXRlcyxcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHBob3RvSWQsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgaW1hZ2VVcmwsXG4gICAgfTtcbiAgfVxufVxuIl19