const express = require('express');
const app = express();
const port = 10048;
const http = require('http');
const fs = require('fs');
const util = require('util');
const querystring = require('querystring');
const PythonShell = require('python-shell');
const bodyParser = require('body-parser');
const urlencoderParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log(`Express server is now listening on IP : http://luffy.ee.ncku.edu.tw:${port}`)

app.post("/upload", urlencoderParser, function (req, res, callback) {
  req.setEncoding('binary');
  var body = '';   // 文件数据
  var fileName = '';  // 文件名
  // 边界字符串
  var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    var file = querystring.parse(body, '\r\n', ':')

    // 只处理图片文件
    if (file['Content-Type'].indexOf("image") !== -1) {
      //获取文件名
      var fileInfo = file['Content-Disposition'].split('; ');
      for (value in fileInfo) {
        if (fileInfo[value].indexOf("filename=") != -1) {
          //fileName = fileInfo[value].substring(10, fileInfo[value].length-1);
          fileName = "./public/target.jpg"
          if (fileName.indexOf('\\') != -1) {
            //fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
            fileName = "./public/target.jpg"
          }
          console.log("File Name : " + fileName);
        }
      }

      // 获取图片类型(如：image/gif 或 image/png))
      var entireData = body.toString();
      var contentTypeRegex = /Content-Type: image\/.*/;

      contentType = file['Content-Type'].substring(1);

      //获取文件二进制数据开始位置，即contentType的结尾
      var upperBoundary = entireData.indexOf(contentType) + contentType.length;
      var shorterData = entireData.substring(upperBoundary);

      // 替换开始位置的空格
      var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
      var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));

      // 保存文件
      fs.writeFile(fileName, binaryData, 'binary', function (err) {
        // res.send('Image has been uploaded.');
      });
    } else {
      // res.send('只能上传图片文件');
    }
    callback = runPython(res);
  })
})

// //用http模块创建一个http服务端
// http.createServer(function(req, res) {
//   if (req.url == '/upload' && req.method.toLowerCase() === 'post') {
//     if(req.headers['content-type'].indexOf('multipart/form-data')!==-1){
//       parseFile(req, res, runPython)    
//     }
//   }
// }).listen(3000);

function runPython(res) {
  console.log('Python is running')
  var spawn = require("child_process").spawn;
  var process = spawn('python3', ["./compare.py",]);
  process.stdout.on('data', function (data) {
    console.log(data.toString());
    res.set('Image has been uploaded./n')
    res.set(data.toString())
  })
}

function parseFile(req, res, callback) {
  req.setEncoding('binary');
  var body = '';   // 文件数据
  var fileName = '';  // 文件名
  // 边界字符串
  var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    var file = querystring.parse(body, '\r\n', ':')

    // 只处理图片文件
    if (file['Content-Type'].indexOf("image") !== -1) {
      //获取文件名
      var fileInfo = file['Content-Disposition'].split('; ');
      for (value in fileInfo) {
        if (fileInfo[value].indexOf("filename=") != -1) {
          //fileName = fileInfo[value].substring(10, fileInfo[value].length-1);
          fileName = "./public/target.jpg"
          if (fileName.indexOf('\\') != -1) {
            //fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
            fileName = "./public/target.jpg"
          }
          console.log("File Name : " + fileName);
        }
      }

      // 获取图片类型(如：image/gif 或 image/png))
      var entireData = body.toString();
      var contentTypeRegex = /Content-Type: image\/.*/;

      contentType = file['Content-Type'].substring(1);

      //获取文件二进制数据开始位置，即contentType的结尾
      var upperBoundary = entireData.indexOf(contentType) + contentType.length;
      var shorterData = entireData.substring(upperBoundary);

      // 替换开始位置的空格
      var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
      var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--' + boundary + '--'));

      // 保存文件
      fs.writeFile(fileName, binaryData, 'binary', function (err) {
        res.end('Image has been uploaded.');
      });
    } else {
      res.end('只能上传图片文件');
    }
    callback()
  });
}

