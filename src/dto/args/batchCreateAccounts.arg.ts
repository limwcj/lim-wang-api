import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';

@InputType()
export class BatchCreateAccountsArg {
  @Field()
  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;

  @Field(() => [CreateAccount])
  @ValidateNested({ each: true })
  @Type(() => CreateAccount)
  accounts: CreateAccount[];
}

@InputType()
export class CreateAccount {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;

  @Field({ nullable: true })
  @IsPhoneNumber('CN')
  @IsOptional()
  phoneNumber: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nickname: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  role: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  dept: string;
}
