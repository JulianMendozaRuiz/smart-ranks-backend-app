import { User } from '../entity/user.entity';

export class UserAuthDataDTO {
  userId: string;
  email: string;
  password: string;

  constructor(pUser: User) {
    this.userId = pUser._id.toString();
    this.email = pUser.email;
    this.password = pUser.password;
  }
}
