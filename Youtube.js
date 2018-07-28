var VideoBuilder = /** @class */ (function () {
    function VideoBuilder(_id) {
        this._id = _id;
        this._name = "";
        this._videoUrl = "";
        this._category = "General";
        this._thumbnails = [];
        this._isCensored = false;
        this._views = 0;
        this._likes = 0;
        this._dislikes = 0;
        this._uploader = "";
        this._id = _id;
    }
    Object.defineProperty(VideoBuilder.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoBuilder.prototype, "getDislikes", {
        get: function () {
            return this._dislikes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoBuilder.prototype, "getLikes", {
        get: function () {
            return this._likes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoBuilder.prototype, "getViews", {
        get: function () {
            return this._views;
        },
        enumerable: true,
        configurable: true
    });
    VideoBuilder.prototype.title = function (name) {
        this._name = name;
        return this;
    };
    VideoBuilder.prototype.video = function (path) {
        this._videoUrl = path;
        return this;
    };
    VideoBuilder.prototype.categoryType = function (type) {
        this._category = type;
        return this;
    };
    VideoBuilder.prototype.videoThumbnails = function () {
        var images = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            images[_i] = arguments[_i];
        }
        this._thumbnails = images;
        return this;
    };
    VideoBuilder.prototype.censored = function (flag) {
        this._isCensored = flag;
        return this;
    };
    VideoBuilder.prototype.author = function (uploader) {
        this._uploader = uploader;
        return this;
    };
    VideoBuilder.prototype.views = function (views) {
        this._views = views;
        return this;
    };
    VideoBuilder.prototype.likes = function (likes) {
        this._likes = likes;
        return this;
    };
    VideoBuilder.prototype.dislikes = function (dislikes) {
        this._dislikes = dislikes;
        return this;
    };
    VideoBuilder.prototype.build = function () {
        return new YoutubeDTO(this);
    };
    return VideoBuilder;
}());
var YoutubeDTO = /** @class */ (function () {
    function YoutubeDTO(builder) {
        this.numberOfViews = 0;
        this.likes = 0;
        this.dislikes = 0;
        this.title = builder._name;
        this._id = builder.ID;
        this.videoUrl = builder._videoUrl;
        this.videoCategory = builder._category;
        this.videoThumbnailsUrl = builder._thumbnails || [];
        this.isCensoredConent = builder._isCensored || false;
        this.uploader = builder._uploader;
        this.likes = builder.getLikes;
        this.dislikes = builder.getDislikes;
        this.numberOfViews = builder.getViews;
    }
    ;
    YoutubeDTO.prototype.toString = function () {
        return JSON.stringify(this);
    };
    YoutubeDTO.prototype.reOrder = function () {
        var obj = {};
        var self = this;
        for (var key in this) {
            if (this.hasOwnProperty(key) && key !== this._id) {
                obj[key] = this[key];
            }
        }
        var obj2 = {};
        obj2[this._id] = obj;
        return obj2;
    };
    YoutubeDTO.prototype.updateAuthor = function (author, obj) {
        obj.author = author;
        return obj;
    };
    YoutubeDTO.prototype.updateTitle = function (title, obj) {
        obj.title = title;
        return obj;
    };
    return YoutubeDTO;
}());
var Youtube = /** @class */ (function () {
    function Youtube() {
        this.videosList = [];
    }
    Youtube.prototype.createVideo = function (videoDetails) {
        this.videosList.push(videoDetails);
        return this.videosList;
    };
    Youtube.prototype.getVideos = function () {
        for (var i = 1; i < this.videosList.length + 1; i++) {
            console.log("Video - " + i);
            console.log(this.videosList[i - 1]);
        }
        return this.videosList;
    };
    Youtube.prototype.getVideoDetailsById = function (id) {
        for (var _i = 0, _a = this.videosList; _i < _a.length; _i++) {
            var video = _a[_i];
            if (Object.keys(video)[0] === String(id)) {
                return video;
            }
        }
        return {};
    };
    Youtube.prototype.getVideoDetailsByTitle = function (title) {
        for (var _i = 0, _a = this.videosList; _i < _a.length; _i++) {
            var video = _a[_i];
            for (var item in video) {
                if (video[item].title === title) {
                    return video;
                }
            }
        }
        return {};
    };
    Youtube.prototype.deleteVideoById = function (id) {
        for (var _i = 0, _a = this.videosList; _i < _a.length; _i++) {
            var video = _a[_i];
            var index = this.videosList.indexOf(video);
            if (Object.keys(video)[0] === String(id) && index !== 1) {
                this.videosList.splice(index, 1);
            }
        }
        return this.videosList;
    };
    Youtube.prototype.updateVideoById = function (id, updatedObject) {
        for (var _i = 0, _a = this.videosList; _i < _a.length; _i++) {
            var video = _a[_i];
            var index = this.videosList.indexOf(video);
            var vid = Object.keys(video)[0];
            if (vid === String(id) && index !== 1) {
                this.videosList[index][vid] = Object.assign(this.videosList[index][vid], updatedObject);
            }
        }
        return this.videosList;
    };
    return Youtube;
}());
var video1 = new VideoBuilder(1001)
    .title("Thor")
    .categoryType("Action")
    .censored(false)
    .likes(250000)
    .dislikes(1500)
    .views(5711846)
    .author('Vikas')
    .build()
    .reOrder();
var video2 = new VideoBuilder(1002)
    .title("Hulk")
    .categoryType("Action")
    .censored(false)
    .likes(45587744)
    .dislikes(1554)
    .views(7884477946)
    .build()
    .reOrder();
var video3 = new VideoBuilder(1003)
    .title("Captain")
    .categoryType("Comic")
    .censored(false)
    .likes(4558774)
    .dislikes(154)
    .views(78877946)
    .build()
    .reOrder();
var youtube = new Youtube();
console.log('Initial videos:');
//Creating videos
youtube.createVideo(video1);
youtube.createVideo(video2);
youtube.getVideos();
console.log('After adding new videos:');
youtube.createVideo(video3);
//Get videos
youtube.getVideos();
//Update videos
console.log("After updation: ");
youtube.updateVideoById(1001, { title: "Thor-2", uploader: "Vikas Pulluri" });
console.log(video1);
//Delete videos
youtube.deleteVideoById(1003);
console.log('After Deletion: ');
youtube.getVideos();
//Get videos by ID
console.log('Getting videos by id');
console.log(youtube.getVideoDetailsById(1002));
