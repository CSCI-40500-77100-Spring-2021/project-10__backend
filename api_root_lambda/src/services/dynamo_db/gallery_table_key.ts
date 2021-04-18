export class GalleryTablePrimaryKey {
  static userId(id: string) : string {
    return `userid#${id}`;
  }
}

export class GalleryTableSecondaryKey {
  private static Prefix = {
    PhotoId: 'photoId#',
  }

  static photoId(id: string) : string {
    return `${this.Prefix.PhotoId}${id}`;
  }

  static parsePhotoId(sortKey: string) : string {
    return sortKey.substring(this.Prefix.PhotoId.length);
  }
}
