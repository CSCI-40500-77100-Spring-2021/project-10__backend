import { GalleryBucket } from "./gallery_bucket";
import Joi from "joi";

type LambdaRequestEvent = {
  payload: {
    base64EncodedImage: string
  };
};

export type LambdaImagePreviewData = {
  previewUrl: string
}

export type LambdaErrorData = {
  message: string
}

export type LambdaResponseData = LambdaErrorData | LambdaImagePreviewData

type LambdaResponse = {
  statusCode: number,
  data?: LambdaResponseData
}

const LambdaEventValidator = Joi.object({
  payload: Joi.object({
    base64EncodedImage: Joi.string().required()
  }).required()
})

export const UploadHandler = async (
  event: LambdaRequestEvent,
  _context: unknown,
) : Promise<LambdaResponse> => {
  try {
    await LambdaEventValidator.validateAsync(event)
    const imageData = Buffer.from(event.payload.base64EncodedImage, 'base64');
    const {
      imageUrl
    } = await GalleryBucket.UploadImage(imageData)
    return {
      statusCode: 200,
      data: {
        previewUrl: imageUrl
      }
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      data: {
        message: error.message || 'Something went wrong',
      },
    };
  }
};
