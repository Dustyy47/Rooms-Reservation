import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

export const ImageInterceptor = FileInterceptor('image', {
    storage: diskStorage({
        destination: './images',
        filename(req, file, callback) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const ext = extname(file.originalname)
            const filename = `${uniqueSuffix}${ext}`
            callback(null, filename)
        },
    }),
})
