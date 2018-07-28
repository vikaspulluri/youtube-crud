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
class VideoDTO {
    public title:string; 
    public videoUrl:string;
    public videoCategory:string;
    public videoThumbnailsUrl:string[];
    public isCensoredConent:boolean;
    public numberOfViews:number = 0;;
    public likes:number = 0;
    public dislikes:number = 0;
    public uploader:string ;
    public _id:number;
    constructor(builder:VideoBuilder){
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

    toString():string{
        return JSON.stringify(this);
    }

    reOrder():object{
        let obj: {[k: string]: any} = {};
        let self = this;
        for(let key in this){
            if(this.hasOwnProperty(key) && key !== this._id){
                obj[key] = this[key];
            }
        }
        let obj2: {[k: number]: any} = {};
        obj2[this._id] = obj;
        return obj2;
    }
    updateAuthor(author:string,obj:{[k:string]:any}):object{
        obj.author = author;
        return obj;
    }
    updateTitle(title:string,obj:{[k:string]:any}):object{
        obj.title = title;
        return obj;
    }
    
}

/**
 * @description: This class is responsible for building/constructing the video based on the given data
 *              and returns a new instance of Data transfer object(DTO). It implements the "Builder" 
 *              design pattern in order to build the video based on the given data.
 *               
 */
class VideoBuilder{
    public _name:string = "";
    public _videoUrl:string = "";
    public _category:string = "General";
    public _thumbnails:string[] = [];
    public _isCensored:boolean = false;
    protected _views:number = 0;
    protected _likes:number = 0;
    protected _dislikes:number = 0;
    public _uploader:string = "";
    
    constructor(protected _id:number){
        this._id = _id;
    }

    get ID():number{
        return this._id;
    }

    get getDislikes(){
        return this._dislikes;
    }

    get getLikes():number{
        return this._likes;
    }

    get getViews():number{
        return this._views;
    }

    title(name:string):VideoBuilder{
        this._name = name;
        return this;
    }

    video(path:string):VideoBuilder{
        this._videoUrl = path;
        return this;
    }

    categoryType(type:string):VideoBuilder{
        this._category = type;
        return this;
    }

    videoThumbnails(...images:string[]):VideoBuilder{
        this._thumbnails = images;
        return this;
    }

    censored(flag:boolean):VideoBuilder{
        this._isCensored = flag;
        return this;
    }

    author(uploader:string):VideoBuilder{
        this._uploader = uploader;
        return this;
    }
    views(views:number):VideoBuilder{
        this._views = views;
        return this;
    }
    likes(likes:number):VideoBuilder{
        this._likes = likes;
        return this;
    }
    dislikes(dislikes:number):VideoBuilder{
        this._dislikes = dislikes;
        return this;
    }
    build():VideoDTO{
        return new VideoDTO(this);
    }
}

/*
@description: 'Youtuve' class can keep track of all videos, creating, reading, updating, deleting
                individual video. This class works like a Youtube videos database and serves the similar
                kind of functionality
@methods: createVideo(), getVideos(), getVideoDetailsById(), getVideoDetailsByTitle(), updateVideoById(), deleteVideoById()
*/
class Youtube{
    protected videosList:object[] = [];
    constructor(){}

    createVideo(videoDetails:object):object[]{
        this.videosList.push(videoDetails);
        return this.videosList;
    }

    getVideos(){
        for(let video of this.videosList){
            console.log(objectToString(video));
        }
        return this.videosList;
    }

    getVideoDetailsById(id:number):object{
        for(let video of this.videosList){
            if(Object.keys(video)[0] === String(id)){
                console.log(objectToString(video));
                return video;
            }
        }
        return {};
    }

    getVideoDetailsByTitle(title:string):object{
        for(let video of this.videosList){
            for(let item in video){
                if(video[item].title === title){
                    return video;
                }
            }
        }
        return {};
    }

    deleteVideoById(id:number):object[]{
        for(let video of this.videosList){
            let index = this.videosList.indexOf(video);
            if(Object.keys(video)[0] === String(id) && index !== 1){
                this.videosList.splice(index,1);
            }
        }
        return this.videosList;
    }

    updateVideoById(id:number,updatedObject:object):object[]{
        for(let video of this.videosList){
            let index = this.videosList.indexOf(video);
            let vid:any = Object.keys(video)[0];
            if(vid === String(id) && index !== 1){
                this.videosList[index][vid] = (<any>Object).assign(this.videosList[index][vid],updatedObject);
            }
        }
        return this.videosList;
    }
}

function objectToString(obj:object):string{
    return JSON.stringify(obj);
}

//Constructing VideoDTO by using VideoBuilder. Created 3 VideoDTO's
let video1 = new VideoBuilder(1001)
                        .title("Thor")
                        .categoryType("Action")
                        .censored(false)
                        .likes(250000)
                        .dislikes(1500)
                        .views(5711846)
                        .author('Vikas')
                        .video('https://www.youtube.com/watch?v=93dC0o2aHto')
                        .videoThumbnails('https://www.gstatic.com/webp/gallery/1.sm.jpg','https://www.gstatic.com/webp/gallery/2.sm.jpg')
                        .build()
                        .reOrder();
let video2 = new VideoBuilder(1002)
                        .title("Hulk")
                        .categoryType("Action")
                        .censored(false)
                        .likes(45587744)
                        .dislikes(1554)
                        .author('Ganesh')
                        .views(7884477946)
                        .build()
                        .reOrder();
let video3 = new VideoBuilder(1003)
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
const youtube = new Youtube();

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
console.log("After updating the title and author of video with id 1001: ")
youtube.updateVideoById(1001,{title:"Thor-2",uploader:"Vikas Pulluri"});

youtube.getVideos();

//Delete videos
youtube.deleteVideoById(1002);
console.log('After deletion of one video: ');
youtube.getVideos();

//Get videos by ID
console.log('Getting videos by id');
youtube.getVideoDetailsById(1003);
