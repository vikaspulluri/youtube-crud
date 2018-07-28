import {VideoBuilder} from './VideoBuilder';
export class YoutubeDTO {
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