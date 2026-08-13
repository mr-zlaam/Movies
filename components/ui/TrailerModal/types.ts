export interface TrailerModalProps {
  visible: boolean;
  trailerKey: string | null;
  movieTitle?: string;
  onClose: () => void;
}
