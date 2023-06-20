export class FilesMiddleware {
  constructor {}
}

//operaciones realtivas a multer. Multer me proporciona un creador de middleware:
singleFileStorage(fileName = 'file', fileSize = 8_000_000) { //fileNeme: nombre de campo donde le colocamos el fichero(avatar) y por defectp se va a llamar file
const upload = multer({
  storage: multer.diskStorage({})
}),
limits: {...
},
});
const middleware = upload.single(fileName);
return middleware;


saveFile()
