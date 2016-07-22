function kekka(json){
	if(json.level<=55) return "電通生じゃない！";
	if(json.level<=65) return "電通生じゃないかも...？";
	if(json.level<=70) return "電通生っぽいかも？";
	if(json.level<=80) return "電通生っぽい！";
	if(json.level<=90) return "電通生にちがいない！";
	if(json.level<100) return "電通生 of 電通生！";
	if(json.level==100) return "エラー起こっててよくわからん";
}

function most_week(json){
	var week = {"sun":json.sun,
				"mon":json.mon,
				"tue":json.tue,
				"wed":json.wed,
				"thu":json.thu,
				"fri":json.fri,
				"sat":json.sat};
	var kanji = {"sun":"日",
				"mon":"月",
				"tue":"火",
				"wed":"水",
				"thu":"木",
				"fri":"金",
				"sat":"土"};
	var most = ["none",0];
	for(i in week){
		if(most[1] < week[i])
			most = [ kanji[i], week[i] ];	
	}
	return most;
}

function words(json){
	if(json.featureWord>200){
		return "いっぱいしているみたい";
	}else if(json.featureWord>100){
		return "すこししているみたい";
	}else if(json.featureWord>50){
		return "あまりしていないみたい";
	}else{
		return "全然していないみたい";
	}
}

function emoji(json){
	if(json.emoticon > 80){
		return "いっぱいしているみたい";
	}else if(json.emoticon > 40){
		return "すこししているみたい";
	}else{
		return "全然していないみたい";
	}
}



var test = {
  "emoticon": 8,
  "sat": 77,
  "featureWord": 212,
  "tue": 134,
  "sun": 174,
  "retweet": 129,
  "fri": 134,
  "mon": 193,
  "18-21": 94,
  "thu": 158,
  "textMean": 34,
  "15-18": 168,
  "flag": "1",
  "replay": 126,
  "follow_phys": 1,
  "0-3": 103,
  "6-9": 141,
  "12-15": 166,
  "level": 70,
  "follow_art": 2,
  "follow_ofc": 3,
  "wed": 127,
  "9-12": 152,
  "3-6": 112,
  "21-24": 61,
  "screen_name": "kinmemodoki"
}
/*
{
	"guess":"電通生じゃない！",
	"most_week":["木",193],
	"word":"電通大生っぽいツイートは全然してないみたい"
}
*/

exports.res_result = function(json){
	var res = {
		"guess" : kekka(json),
		"most_week" : most_week(json),
		"words" : words(json),
		"emoji" : emoji(json)
	}
	console.log(words(json));
	return res;
}