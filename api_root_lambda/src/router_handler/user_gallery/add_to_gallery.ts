import { RequestHandler } from 'express';
import Gallery from '../../model/gallery';
import { GetCurrentUser } from '../../util/request';

const AddToMyGalleryRequestHandler: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, encodedImage } = req.body;
    const imageData = Buffer.from(encodedImage, 'base64');
    const imageSummary = await Gallery.AddToGallery(GetCurrentUser(), {
      title,
      description,
      imageData,
    });
    return res.status(200).json(imageSummary);
  } catch (error) {
    return next(error);
  }
};

export default AddToMyGalleryRequestHandler;
