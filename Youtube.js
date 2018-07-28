/**
 * @author: Vikas Pulluri
 * @date: 29/07/2018
 * @file: Youtube.ts
 * @description: This is a simple youtube look alike crud oriented backend code.
 *              It uses multiple classes and each class serves separate purpose
 */
/**
 * @description: This is basic data transfer object for every video. It contains all the basic
 *              properties and simple light weight functions associated with video. This is the
 *              object that carries the data between multiple processes.
 */
var VideoDTO = /** @class */ (function () {
    function VideoDTO(builder) {
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
    VideoDTO.prototype.toString = function () {
        return JSON.stringify(this);
    };
    VideoDTO.prototype.reOrder = function () {
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
    VideoDTO.prototype.updateAuthor = function (author, obj) {
        obj.author = author;
        return obj;
    };
    VideoDTO.prototype.updateTitle = function (title, obj) {
        obj.title = title;
        return obj;
    };
    return VideoDTO;
}());
/**
 * @description: This class is responsible for building/constructing the video based on the given data
 *              and returns a new instance of Data transfer object(DTO). It implements the "Builder"
 *              design pattern in order to build the video based on the given data.
 *
 */
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
        return new VideoDTO(this);
    };
    return VideoBuilder;
}());
/*
@description: 'Youtuve' class can keep track of all videos, creating, reading, updating, deleting
                individual video. This class works like a Youtube videos database and serves the similar
                kind of functionality
@methods: createVideo(), getVideos(), getVideoDetailsById(), getVideoDetailsByTitle(), updateVideoById(), deleteVideoById()
*/
var Youtube = /** @class */ (function () {
    function Youtube() {
        this.videosList = [];
    }
    Youtube.prototype.createVideo = function (videoDetails) {
        this.videosList.push(videoDetails);
        return this.videosList;
    };
    Youtube.prototype.getVideos = function () {
        for (var _i = 0, _a = this.videosList; _i < _a.length; _i++) {
            var video = _a[_i];
            console.log(objectToString(video));
        }
        return this.videosList;
    };
    Youtube.prototype.getVideoDetailsById = function (id) {
        for (var _i = 0, _a = this.videosList; _i < _a.length; _i++) {
            var video = _a[_i];
            if (Object.keys(video)[0] === String(id)) {
                console.log(objectToString(video));
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
function objectToString(obj) {
    return JSON.stringify(obj);
}
//Constructing VideoDTO by using VideoBuilder. Created 3 VideoDTO's
var video1 = new VideoBuilder(1001)
    .title("Thor")
    .categoryType("Action")
    .censored(false)
    .likes(250000)
    .dislikes(1500)
    .views(5711846)
    .author('Vikas')
    .video('https://www.youtube.com/watch?v=93dC0o2aHto')
    .videoThumbnails('https://www.gstatic.com/webp/gallery/1.sm.jpg', 'https://www.gstatic.com/webp/gallery/2.sm.jpg')
    .build()
    .reOrder();
var video2 = new VideoBuilder(1002)
    .title("Hulk")
    .categoryType("Action")
    .censored(false)
    .likes(45587744)
    .dislikes(1554)
    .author('Ganesh')
    .views(7884477946)
    .build()
    .reOrder();
var video3 = new VideoBuilder(1003)
    .title("Captain")
    .categoryType("Comic")
    .censored(false)
    .likes(4558774)
    .dislikes(154)
    .author('Sahit')
    .views(78877946)
    .build()
    .reOrder();
//creating a actual instance of youtube class which hold all info about all videos
var youtube = new Youtube();
console.log('Initially we have 2 videos:');
//Adding above videos to main youtube instance
youtube.createVideo(video1);
youtube.createVideo(video2);
youtube.getVideos();
console.log('After adding new video:');
youtube.createVideo(video3);
//Get all videos
youtube.getVideos();
//Update videos
console.log("After updating the title and author of video with id 1001: ");
youtube.updateVideoById(1001, { title: "Thor-2", uploader: "Vikas Pulluri" });
youtube.getVideos();
//Delete videos
youtube.deleteVideoById(1002);
console.log('After deletion of one video: ');
youtube.getVideos();
//Get videos by ID
console.log('Getting videos by id');
youtube.getVideoDetailsById(1003);
