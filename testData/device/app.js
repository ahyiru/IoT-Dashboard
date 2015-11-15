var express = require('express')
var app = express()

//post中间件
app.use(express.bodyParser())
app.set('views', './page/')
app.set('view engine', 'jade')

//数据操作对象
var Dev = require('./data/dev')

//模版
app.get('/', function(req, res) {
	Dev.find(function(err, dev) {
		res.render('device', {
			dev: dev
		});
		//console.log(dev);
	})
});

//保存数据
app.post('/add', function(req, res) {
	var dev = req.body.dev;
	if (!dev) {
		console.log(dev)
		return
	}
	var dev = new Dev(dev)
		//保存数据
	dev.save(function(err) {
		if (err) {
			console.log('保存失败')
		}
		console.log('数据保存成功')
		return res.redirect('/')
	});
});


//修改数据
app.get('/update/:id', function(req, res) {
	var id = req.params.id;
	if (id) {
		//查找指定要修改的数据
		Dev.findOne({_id: id},function(err,oneDev){
			res.render('device', {
				 oneDev : oneDev
			})
		})
	}
})

//更新数据
app.post('/update', function(req, res) {
	var oneDev = req.body.oneDev;
	if (!oneDev) {
		return
	}
	Dev.update({_id: oneDev._id}, {
		$set: {deviceId: oneDev.deviceId,macAddr:oneDev.macAddr,status:oneDev.status}
	}, function(err) {
		if(err){
			console.log(err)
			return
		}
		console.log('更新成功')
		return res.redirect('/')
	});
});


//删除数据
app.get('/delete/:id', function(req, res) {
	var id = req.params.id;
	if (id) {
		Dev.remove({
			_id: id
		}, function(err) {
			if (err) {
				console.log(err)
				return
			}
			console.log('删除成功')
			return res.redirect('/')
		});
	}
})

app.listen(3001)