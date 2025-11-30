class Image {
  readonly imageId: string; 

  name: string | null; 

  imageUrl: string; 

  constructor({
    imageId,
    name = null, 
    imageUrl,
  }: {
    imageId: string;
    name?: string | null;
    imageUrl: string;
  }) {
    this.imageId = imageId; 
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

export default Image;