export class OfferModel {
  id?: string;
  title?: string;
  description?: string;
  owner?: OfferOwner;
  authors?: string;
  price?: number;
  moderationStatus?: number;
  city?: string;
  picture?: string;
  createdAt?: Date;
  regectReason?: string;
}

export class OfferOwner {
  id?: string;
  name?: string;
}
