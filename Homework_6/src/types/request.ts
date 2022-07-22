import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

import { NewUserRequestBody, UpdateUserRequestBody } from './users';
import { NewGroupRequestBody } from './group';

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: NewUserRequestBody;
}

export interface UpdateUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserRequestBody;
  [ContainerTypes.Params]: {
    id: string
  };
}

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: NewGroupRequestBody
}

export interface UpdateGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: NewGroupRequestBody;
  [ContainerTypes.Params]: {
    id: string
  };
}

export interface AddUserToGroupRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    userId: string,
    groupId: string
  }
}

export interface LoginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string,
    password: string
  }
}
