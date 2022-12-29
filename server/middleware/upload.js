const multer = require('multer');
import {GridFsStorage} from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: process.env.DB_IMAGES,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log('file: ', file);
        const match = ['image/png', 'image/jpeg'];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
