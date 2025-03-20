import { UserRole } from './user-role.enum';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class User {
  @Prop({ isRequired: true })
  _id: string;

  @Prop()
  name?: string;

  @Prop({ isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop({ isRequired: true, type: String, enum: UserRole })
  role: UserRole;

  @Prop({ isRequired: true, index: true })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
