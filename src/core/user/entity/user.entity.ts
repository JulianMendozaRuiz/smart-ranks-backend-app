import { UserRole } from './user-role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id: string;

  @Prop({ isRequired: false })
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
