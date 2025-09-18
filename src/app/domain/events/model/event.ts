export interface Event {
  id: string;
  title: string;
  previewImageUrl: string;
  description: string;
  amount?: number;
  eventDate: Date;
  location?: string;
  urlToPlatform?: string;
}
