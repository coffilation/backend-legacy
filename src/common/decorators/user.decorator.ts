import { createParamDecorator } from '@nestjs/common'

export const JwtUserId = createParamDecorator((data, req) => {
  return req.args[0].user?.id
})
