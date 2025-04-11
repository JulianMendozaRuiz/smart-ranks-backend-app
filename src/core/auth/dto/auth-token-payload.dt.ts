export class AuthTokenPayloadDTO {
  sub: string;
  username: string;
  role: string;

  constructor(sub: string, username: string, role: string) {
    this.sub = sub;
    this.username = username;
    this.role = role;
  }
}
