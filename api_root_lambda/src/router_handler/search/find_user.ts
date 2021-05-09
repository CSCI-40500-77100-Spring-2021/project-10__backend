import { RequestHandler } from 'express';
import UserAdmin, { UserAdminRequestTopic } from '../../services/user_admin';
import logger from '../../util/logger';

export type UserSummary = {
  id: string;
  username: string;
};

const FindUserHandler: RequestHandler = async (req, res, next) => {
  const TAG = FindUserHandler.name;
  const { username } = req.query;
  if (username === undefined) {
    return next(new Error('The "username" query parameter is required'));
  }
  try {
    const user = await UserAdmin.Request(
      UserAdminRequestTopic.FindUserByUserName,
      {
        username,
      },
    );
    console.log(user);
    if (user.message) throw new Error(user.message);
    return res.status(200).json({
      users: [user],
    });
  } catch (error) {
    logger.error(TAG, error);
    return res.status(200).json({
      users: [],
    });
  }
};

export default FindUserHandler;
