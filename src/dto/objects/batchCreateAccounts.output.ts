import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BatchCreateAccountsOutput {
  @Field()
  index: number;

  @Field()
  code: string;

  @Field()
  message: string;
}
