
class ImageVenue {
 

//////////////////////////////////// Properties ////////////////////////////////////
  readonly venueId: string; 
  readonly imageId: string; 
  isImage: boolean; 


//////////////////////////////////// Constructor ////////////////////////////////////

  constructor({
    venueId,
    imageId,
    isImage = true, 
  }: {
    venueId: string;
    imageId: string;
    isImage?: boolean;
  }) {
    this.venueId = venueId; 
    this.imageId = imageId;
    this.isImage = isImage;
  }
}

export default ImageVenue;