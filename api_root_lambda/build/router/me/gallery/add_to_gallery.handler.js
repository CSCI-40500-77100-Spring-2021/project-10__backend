"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gallery_1 = __importDefault(require("../../../model/gallery"));
const request_1 = require("../../../util/request");
const AddToMyGalleryRequestHandler = async (req, res, next) => {
    try {
        const { title, description, encodedImage } = req.body;
        const imageData = Buffer.from(encodedImage, 'base64');
        const imageSummary = await gallery_1.default.AddToGallery(request_1.GetCurrentUser(), {
            title,
            description,
            imageData,
        });
        return res.status(200).json(imageSummary);
    }
    catch (error) {
        return next(error);
    }
};
exports.default = AddToMyGalleryRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkX3RvX2dhbGxlcnkuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yb3V0ZXIvbWUvZ2FsbGVyeS9hZGRfdG9fZ2FsbGVyeS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EscUVBQTZDO0FBQzdDLG1EQUF1RDtBQUV2RCxNQUFNLDRCQUE0QixHQUFtQixLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM1RSxJQUFJO1FBQ0YsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0RCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxNQUFNLFlBQVksR0FBRyxNQUFNLGlCQUFPLENBQUMsWUFBWSxDQUFDLHdCQUFjLEVBQUUsRUFBRTtZQUNoRSxLQUFLO1lBQ0wsV0FBVztZQUNYLFNBQVM7U0FDVixDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzNDO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQjtBQUNILENBQUMsQ0FBQztBQUVGLGtCQUFlLDRCQUE0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBHYWxsZXJ5IGZyb20gJy4uLy4uLy4uL21vZGVsL2dhbGxlcnknO1xuaW1wb3J0IHsgR2V0Q3VycmVudFVzZXIgfSBmcm9tICcuLi8uLi8uLi91dGlsL3JlcXVlc3QnO1xuXG5jb25zdCBBZGRUb015R2FsbGVyeVJlcXVlc3RIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBlbmNvZGVkSW1hZ2UgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IEJ1ZmZlci5mcm9tKGVuY29kZWRJbWFnZSwgJ2Jhc2U2NCcpO1xuICAgIGNvbnN0IGltYWdlU3VtbWFyeSA9IGF3YWl0IEdhbGxlcnkuQWRkVG9HYWxsZXJ5KEdldEN1cnJlbnRVc2VyKCksIHtcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBpbWFnZURhdGEsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKGltYWdlU3VtbWFyeSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIG5leHQoZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBZGRUb015R2FsbGVyeVJlcXVlc3RIYW5kbGVyO1xuIl19