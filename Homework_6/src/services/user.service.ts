import { v4 as uuidv4 } from 'uuid';
import { Op, Transaction } from 'sequelize';

import { User } from '../models';
import { NewUserRequestBody, UpdateUserRequestBody, UserModel } from '../types';

export const createUser = async (newUser: NewUserRequestBody): Promise<UserModel> => (
  await User
    .create({
      ...newUser,
      id: uuidv4(),
      isDeleted: false
    })
);

export const findUserById = async (id: string, t?: Transaction): Promise<UserModel | null> => await User.findByPk(id, { transaction: t });

export const deleteUserById = async (id: string): Promise<boolean> => (
  await User.destroy({ where: { id: { [Op.eq]: id } } })
    .then(result => (
      User.update({ isDeleted: true }, { where: { id: { [Op.eq]: id } } })
        .then(() => Boolean(result))
    ))
);

export const updateUserById = async (id: string, data: UpdateUserRequestBody): Promise<UserModel | null> => {
  const isUpdated = await User.update({ ...data }, { where: { id: { [Op.eq]: id } } });

  return isUpdated[0] ? await findUserById(id) : null;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit: string): Promise<UserModel[]> => await (
  User.findAll({ where: { login: { [Op.like]: `%${loginSubstring}%` } }, order: [['login', 'ASC']], limit: Number(limit) })
);

export const getUserByCredentials = async (login: string, password: string): Promise<UserModel | null> => await (
  User.findOne({
    where: {
      login,
      password
    }
  })
);
