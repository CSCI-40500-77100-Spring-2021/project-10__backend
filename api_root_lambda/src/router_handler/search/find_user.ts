import { RequestHandler } from 'express';
import UserAdmin, { UserAdminRequestTopic } from '../../services/user_admin';
import logger from '../../util/logger';

export type UserSummary = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string
};

const FindUserHandler: RequestHandler = async (req, res) => {
  const TAG = FindUserHandler.name;
  const { username, query } = req.query;
  try {
    let users : UserSummary[];
    if (username) {
      users = await UserAdmin.Request(
        UserAdminRequestTopic.FindUserByUserName,
        {
          username,
        },
      );
    } else if (query) {
      users = await UserAdmin.Request(
        UserAdminRequestTopic.FindUser,
        {
          query,
        },
      );
      console.log(users);
    } else {
      return res.status(400).json({
        message: "'username' of 'query' is required as a query string in the url",
      });
    }
    return res.status(200).json({
      users,
    });
  } catch (error) {
    logger.error(TAG, error);
    return res.status(200).json({
      users: [],
    });
  }
};

export default FindUserHandler;
