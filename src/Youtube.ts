import {VideoBuilder} from './VideoBuilder';

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

    updateVideoById(id:number,updatedObject:object):{[k:string]:any}[]{
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

let video1 = new VideoBuilder(1001)
                        .title("Thor")
                        .categoryType("Action")
                        .censored(false)
                        .likes(250000)
                        .dislikes(1500)
                        .views(5711846)
                        .author('Vikas')
                        .build()
                        .reOrder();
let video2 = new VideoBuilder(1002)
                        .title("Hulk")
                        .categoryType("Action")
                        .censored(false)
                        .likes(45587744)
                        .dislikes(1554)
                        .views(7884477946)
                        .build()
                        .reOrder();
let video3 = new VideoBuilder(1003)
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
