
const mongoose = require('mongoose');
require('mongoose-geojson-schema');
const Schema = mongoose.Schema;
const collectionName = 'weibo';

const weiboSchema = new Schema({
    // User Info
    id: String,
    user_name: String,
    tool: String,
    // Verbs
    forward: Number,
    comment: Number,
    like: Number,
    // Content
    content: String,
    // Location Info
    loc_url: String,
    loc_info: String,
    location: Schema.Types.Point,
    // Publish Time
    pub_time: String,
    pub_time2: Number,

}, {
        collection: collectionName
    });

var weiboModels = mongoose.model(
    collectionName,
    weiboSchema,
    collectionName
);

module.exports = weiboModels;