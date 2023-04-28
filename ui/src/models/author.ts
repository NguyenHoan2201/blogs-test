import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class User {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;
}