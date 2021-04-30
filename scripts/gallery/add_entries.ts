/**
 * Adds photos to gallery for a given user
 * Required params
 * --userid
 * --tablename
 * 
 * Optional Params
 * --count {default: 1}
 * --region {default: us-east-1}
 */

import { DynamoDB } from "aws-sdk";
import axios from "axios";
import { random, range } from "lodash";
import { LoremIpsum } from "lorem-ipsum";
import minimist = require("minimist");
import { MissingArg } from "../src/utils/error_message";
import { v4 as generateId } from "uuid";
import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";

export type GalleryImageSummary = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const GenerateImageData = async (): Promise<GalleryImageSummary> => {
  const response = await axios.get("https://picsum.photos/320/400");
  const lorem = new LoremIpsum();
  const imageUrl = "https://i.picsum.photos" + response.request.path;
  const title = lorem.generateWords(random(3, 6));
  const description = lorem.generateSentences(random(3, 5));
  const image = {
    id: generateId(),
    title,
    description,
    imageUrl,
  };
  return image;
};

const addToDb = async (
  userid: string,
  tablename: string,
  region: string
): Promise<void> => {
  const { title, description, imageUrl, id: photoId } = await GenerateImageData();
  const pk = "userid#" + userid;
  const sk = "photoId#" + photoId;
  const attributes: PutItemInputAttributeMap = {
    pk: {
      S: pk,
    },
    sk: {
      S: sk,
    },
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
  const db = new DynamoDB({ region });
  await db
    .putItem({
      Item: attributes,
      TableName: tablename as string,
    })
    .promise();
};

const run = async () => {
  const {
    count = 1,
    userid,
    tablename = process.env.DB_TABLE_NAME,
    region = "us-east-1",
  } = minimist(process.argv.slice(2));
  console.log(tablename);
  console.log(userid);
  if (userid === undefined) {
    throw new Error(MissingArg("userid"));
  }
  if (tablename === undefined) {
    throw new Error(MissingArg("tablename"));
  }
  if (region === undefined) {
    throw new Error(MissingArg("region"));
  }
  const addToDBRequest = range(count).map(() => {
    return addToDb(userid, tablename, region);
  })
  await Promise.all(addToDBRequest)
};

run();
