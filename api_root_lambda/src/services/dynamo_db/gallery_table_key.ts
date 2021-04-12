export class GalleryTablePrimaryKey {
  static userId(id: string) : string {
    return `userid#${id}`;
  }
}

export class GalleryTableSecondaryKey {
  static photoId(id: string) : string {
    return `photoId#${id}`;
  }
}
