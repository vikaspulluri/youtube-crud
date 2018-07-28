class YoutubeBuilder{
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

    title(name:string):YoutubeBuilder{
        this._name = name;
        return this;
    }

    video(path:string):YoutubeBuilder{
        this._videoUrl = path;
        return this;
    }

    categoryType(type:string):YoutubeBuilder{
        this._category = type;
        return this;
    }

    videoThumbnails(...images:string[]):YoutubeBuilder{
        this._thumbnails = images;
        return this;
    }

    censored(flag:boolean):YoutubeBuilder{
        this._isCensored = flag;
        return this;
    }

    author(uploader:string):YoutubeBuilder{
        this._uploader = uploader;
        return this;
    }
    views(views:number):YoutubeBuilder{
        this._views = views;
        return this;
    }
    likes(likes:number):YoutubeBuilder{
        this._likes = likes;
        return this;
    }
    dislikes(dislikes:number):YoutubeBuilder{
        this._dislikes = dislikes;
        return this;
    }
    build():YoutubeDTO{
        return new YoutubeDTO(this);
    }
}

class YoutubeDTO {
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
    constructor(builder:YoutubeBuilder){
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

class Youtube{
    protected videosList:object[] = [];
    constructor(){}

    createVideo(videoDetails:object):object[]{
        this.videosList.push(videoDetails);
        return this.videosList;
    }

    getVideos(){
        for(let i=1;i<this.videosList.length+1;i++){
            console.log(`Video - ${i}`);
            console.log(this.videosList[i-1]);
        }
        return this.videosList;
    }

    getVideoDetailsById(id:number):object{
        for(let video of this.videosList){
            if(Object.keys(video)[0] === String(id)){
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
                this.videosList[index][vid] = Object.assign(this.videosList[index][vid],updatedObject);
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
console.log("After updation: ")
youtube.updateVideoById(1001,{title:"Thor-2",uploader:"Vikas Pulluri"});

console.log(video1);

//Delete videos
youtube.deleteVideoById(1003);
console.log('After Deletion: ');
youtube.getVideos();

//Get videos by ID
console.log('Getting videos by id');
console.log(youtube.getVideoDetailsById(1002));
