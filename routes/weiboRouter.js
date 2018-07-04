const express = require('express');
const bodyParser = require('body-parser');

const Weibo = require('../models/weibo')

const weiboRouter = express.Router();

weiboRouter.use(bodyParser.json());

weiboRouter.route('/')
    .get((req, res, next) => {
        const pageNum = Number.parseInt(req.query.page) || 0;
        const pageSize = Number.parseInt(req.query.size) || 30;
        console.log(req.query);

        Weibo.find({}).skip(pageNum * pageSize).limit(pageSize)
            .then((weibos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                res.json(weibos);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

weiboRouter.route('/:id')
    .get((req, res, next) => {
        Weibo.find({ id: req.params.id })
            .then((weibo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                res.json(weibo);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = weiboRouter;