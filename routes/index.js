var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var getTweet = require('../name2tweet');
var bunseki = require('../bunseki');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index page' });
});

router.get('/result', function(req, res, next){
  //クエリの名前チェック
  var reg = /\w/g;
  if (!req.query.screen_name.replace(reg, "")&&req.query.screen_name) {
    //クエリのエスケープ
    var reg = /\W/g;
    var screen_name = req.query.screen_name.slice(0,15);
    screen_name = screen_name.replace(reg, "");

    getTweet.getUserTimeline(screen_name, function(tweets_data){
      if(!tweets_data) {
        res.render('error', { title: 'result' }); return; 
      }
      //console.log(tweets_data);
      //書き込み
      var write_stream = fs.createWriteStream('./tmp_tweets/'+screen_name);
      write_stream.on('drain', function ()         { console.log('write: drain'); })
                  .on('error', function (exeption) { console.log('write: error'); })
                  .on('close', function ()         { console.log('write: colse'); })
                  .on('pipe',  function (src)      { console.log('write: pipe');  });
      write_stream.write(tweets_data, 'utf-8', function(){
        console.log("やってる");
        if((tweets_data.match(/[\n\r]/g)||[]).length == 1){
          //取得失敗
          console.log("not exist accounts");
          res.render('error', { title: 'We can\'t get tweets' });
        }else{
          //取得成功
          exec('cd contents_security; python predict.py  ../tmp_tweets/'+screen_name ,
            function (error, stdout, stderr) {
              if(!stderr&&!error){
                var res_json = JSON.parse(stdout);
                var result_text = bunseki.res_result(res_json);
                console.log('stdout: ' + stdout);
                res.render('result', { 
                  screen_name: res_json.screen_name,
                  percent: res_json.level,
                  guess: result_text.guess,
                  most_week_kanji: result_text.most_week[0],
                  feature_words: result_text.words,
                  emoji: result_text.emoji
                });
              }else{
                console.log('exec error: ' + error);
                console.log('stderr: ' + stderr);
              }
          });

        }
      });

    });
  }else{
    //res.render('result', { screen_name: 'kinmemodoki' });
    res.render('error', { title: 'We can\'t get tweets' });
  }
})

router.get('/info', function(req, res, next) {
  res.render('info', { title: 'index page' });
});

module.exports = router;
