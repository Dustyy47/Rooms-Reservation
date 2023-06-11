import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    console.log('RQ', request.user)
    const user = request.user
    if (data) return { [data]: user[data as keyof typeof user] }
    return user
})
