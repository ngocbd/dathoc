const express = require('express')
const app = express()
const port = 3000
redsearch = require('redredisearch')
redis     = require('redis')
const client = redis.createClient();
redsearch.setClient(client);       
redsearch.createSearch('youtube', {}, function(err,search) {
	search.index('mot con vit', 'https://www.youtube.com/watch?v=Aa7pDQIChO8');
	search.index('cong chua diana','https://www.youtube.com/watch?v=ZhqCgP0ak3s');
	search.index('mot con vit remix','https://www.youtube.com/watch?v=9nP7opBuTtA');
	search.index('con de trung','https://www.youtube.com/watch?v=lRn2Y0Bb_z0');
});
app.get('/', (req, res) => {
	redsearch.createSearch('youtube',{},function(err,search) {
		if(err) throw err;
		var begin = Date.now();
		search.query(req.query.q).end(function(err, ids){
		            if (err) throw err;
		            console.log(ids);
			    res.send(ids);
			    res.end();
			var end = Date.now();
			console.log(" search time %d in milis",end-begin);
		          });
	});
})

app.listen(port, () => {
	  console.log(`app listening at http://localhost:${port}`)
})
