class YoutubeBuilder {
    constructor(_id) {
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
    get ID() {
        return this._id;
    }
    get getDislikes() {
        return this._dislikes;
    }
    get getLikes() {
        return this._likes;
    }
    get getViews() {
        return this._views;
    }
    title(name) {
        this._name = name;
        return this;
    }
    video(path) {
        this._videoUrl = path;
        return this;
    }
    categoryType(type) {
        this._category = type;
        return this;
    }
    videoThumbnails(...images) {
        this._thumbnails = images;
        return this;
    }
    censored(flag) {
        this._isCensored = flag;
        return this;
    }
    author(uploader) {
        this._uploader = uploader;
        return this;
    }
    views(views) {
        this._views = views;
        return this;
    }
    likes(likes) {
        this._likes = likes;
        return this;
    }
    dislikes(dislikes) {
        this._dislikes = dislikes;
        return this;
    }
    build() {
        return new YoutubeDTO(this);
    }
}
class YoutubeDTO {
    constructor(builder) {
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
    toString() {
        return JSON.stringify(this);
    }
    reOrder() {
        let obj = {};
        let self = this;
        for (let key in this) {
            if (this.hasOwnProperty(key) && key !== this._id) {
                obj[key] = this[key];
            }
        }
        let obj2 = {};
        obj2[this._id] = obj;
        return obj2;
    }
    updateAuthor(author, obj) {
        obj.author = author;
        return obj;
    }
    updateTitle(title, obj) {
        obj.title = title;
        return obj;
    }
}
class Youtube {
    constructor() {
        this.videosList = [];
    }
    createVideo(videoDetails) {
        this.videosList.push(videoDetails);
        return this.videosList;
    }
    getVideos() {
        for (let i = 1; i < this.videosList.length + 1; i++) {
            console.log(`Video - ${i}`);
            console.log(this.videosList[i - 1]);
        }
        return this.videosList;
    }
    getVideoDetailsById(id) {
        for (let video of this.videosList) {
            if (Object.keys(video)[0] === String(id)) {
                return video;
            }
        }
        return {};
    }
    getVideoDetailsByTitle(title) {
        for (let video of this.videosList) {
            for (let item in video) {
                if (video[item].title === title) {
                    return video;
                }
            }
        }
        return {};
    }
    deleteVideoById(id) {
        for (let video of this.videosList) {
            let index = this.videosList.indexOf(video);
            if (Object.keys(video)[0] === String(id) && index !== 1) {
                this.videosList.splice(index, 1);
            }
        }
        return this.videosList;
    }
    updateVideoById(id, updatedObject) {
        for (let video of this.videosList) {
            let index = this.videosList.indexOf(video);
            let vid = Object.keys(video)[0];
            if (vid === String(id) && index !== 1) {
                this.videosList[index][vid] = Object.assign(this.videosList[index][vid], updatedObject);
            }
        }
        return this.videosList;
    }
}
let video1 = new YoutubeBuilder(1001)
    .title("Thor")
    .categoryType("Action")
    .censored(false)
    .likes(250000)
    .dislikes(1500)
    .views(5711846)
    .author('Vikas')
    .build()
    .reOrder();
let video2 = new YoutubeBuilder(1002)
    .title("Hulk")
    .categoryType("Action")
    .censored(false)
    .likes(45587744)
    .dislikes(1554)
    .views(7884477946)
    .build()
    .reOrder();
let video3 = new YoutubeBuilder(1003)
    .title("Captain")
    .categoryType("Comic")
    .censored(false)
    .likes(4558774)
    .dislikes(154)
    .views(78877946)
    .build()
    .reOrder();
const youtube = new Youtube();
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
