import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    if (data) return user[data as keyof typeof user]
    return request.user
})
