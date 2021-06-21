var express = require('express'), http = require('http'), path=require('path');
var static=require('serve-static');
var app=express();

app.set('port',process.env.PORT||8080);
app.set('host','127.0.0.1');

var router =express.Router();
app.use(static(__dirname));

/*
var myLogger=function(req,res,next){
	console.log('LOGGED');//콘솔창에 logged출력
	next();//응답이 종료되려면 꼭필요하다, 모든 미들웨어를 수행하기 위해서사용
}

app.use(myLogger);
app.get('/',function(req,res){
	res.send('Hello World');
});

app.use(function (req,res,next) {
	console.log('첫번째 미들웨어에서 요청을 처리함');

	req.user='mike';
	next();
});

app.use('/',function (req,res,next) {
	console.log('두번째 미들웨어에서 요청을 처리함.')
	
	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.end('<h1>Express서버에서'+req.user+'가 응답한 결과입니다</h1>');
});
*/app.use('/',router);
router.route('/').get(function(req,res){
	res.redirect('./source/jquery.html');
});
router.route('/routetest').get(function(req,res){
	res.redirect('http://www.google.com');
});

app.all('*',function(req,res){
	res.status(404).send('<h1>ERROR-페이지를 찾을수 없습니다</h1>')
});
http.createServer(app).listen(app.get('port'),app.get('host'),()=>{
console.log('Express server running at'+app.get('port')+app.get('host'));
});

router.route('/rss').get(function(req,res){
	console.log("rss data requested");
	var feed="http://rss.joins.com/sonagi/joins_sonagi_star_list.xml";
	http.get(feed,function(httpres){
		var rss_res="";
		httpres.on('data',function(chunk){
			rss_res+=chunk;
		});
		httpres.on('end',function(){
			res.send(rss_res);
			console.log("rss response completed");
			res.end();
		});
	});
});