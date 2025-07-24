import { PhotoType } from "./photo-type.type";
import { Comment } from "./comment.interface";

export class PhotoShare {

    location? : string;
    id : string;
    authorId? : string;
    comments: Comment[] = [];

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public createdAt: Date,
        public snaps: number,
        public hasSnapped: boolean,
        public onSnapped: string,
        authorId?: string
    ) {
        this.id = crypto.randomUUID().substring(0, 8);
        this.authorId = authorId;
        this.comments = [];
    }


    snap(photoType : PhotoType): void {
        if (photoType === 'snap'){
            this.snaps++;
        }else if (photoType === 'unsnap') {
            this.snaps--;
        }
    }

    setLocation(location: string): void {
        this.location = location;
    }

    withLocation(location: string): PhotoShare {
        this.setLocation(location);
        return this;
    }
}