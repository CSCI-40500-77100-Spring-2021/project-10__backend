import { RequestHandler } from 'express';
import Gallery from '../../model/gallery';
import { UserGalleryPhotoResponse } from '../../model/response/gallery';
import { GalleryBucket } from '../../services/s3';
import { GetCurrentUser } from '../../util/request';
import GenerateId from '../../util/uuid';

const AddToMyGalleryRequestHandler: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, encodedImage } = req.body;
    const imageData = Buffer.from(encodedImage, 'base64');
    const imageKey = `${GenerateId()}.jpg`;
    const { imageUrl } = await GalleryBucket.UploadImage(imageKey, imageData);
    const imageSummary = await Gallery.AddToGallery(GetCurrentUser(), {
      title,
      description,
      imageUrl,
    });
    const response : UserGalleryPhotoResponse = {
      id: imageSummary.id,
      title: imageSummary.title,
      description: imageSummary.description,
      imageUrl: imageSummary.imageUrl,
      alreadyLiked: imageSummary.likedBy.has(GetCurrentUser()),
      likeCount: imageSummary.likedBy.size,
    };
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

export default AddToMyGalleryRequestHandler;
