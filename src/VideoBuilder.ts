import {YoutubeDTO} from './YoutubeDTO';
export class VideoBuilder{
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
    build():YoutubeDTO{
        return new YoutubeDTO(this);
    }
}