const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json()); // json 형식을 해석하기 위해 사용. 안쓰면 req.body = undefined 로 나옴.
app.use(express.urlencoded({extended : false})); // url 해석을 위해 사용.
app.use(express.static(path.join(__dirname + '/public'))); // 백엔드의 정적 파일 경로 지정. 백엔드에 저장되는 이미지의 URL로 접근 가능.
app.use(cors({origin : '*'})); // cors 허용. 모든 출저 허용 옵션 : origin.

app.listen(port, function() {
    console.log('listening on 8080');
})

// multer : 파일 업로드를 위한 미들웨어.
const upload = multer({
    storage: multer.diskStorage({
        // 이미지 저장 공간(경로) 지정.
      destination(req, file, cb) {
        cb(null, 'public/uploadImgs');
      },
      // 이미지 이름.
      filename(req, file, cb) {
        // 파일 확장자.
        const ext = path.extname(file.originalname);
        // 한글 파일 이름 깨짐 현상 수정.
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        console.log('file.originalname', file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
  });

app.post('/img', upload.single('img'), (req, res) => {
    console.log('전달받은 파일', req.file);
    console.log('저장된 파일의 이름', req.file.filename);
  
    const IMG_URL = `http://localhost:8080/uploadImgs/${req.file.filename}`;
    console.log(IMG_URL);
    res.json({ url: IMG_URL });
  });

app.post('/test', (req, res) => {
    console.log("클라이언트에서 보낸 데이터", req.body);
})