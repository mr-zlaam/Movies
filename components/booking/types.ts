export type SeatStatus = "available" | "selected" | "reserved" | "vip" | "executive";

export interface SeatItem {
  id: string;
  row: number;
  col: number;
  section: "left" | "center" | "right";
  status: SeatStatus;
  price: number;
}

export interface SeatGridProps {
  seats: SeatItem[];
  selectedSeatIds: string[];
  onToggleSeat: (seat: SeatItem) => void;
}

export interface SeatRowProps {
  rowIndex: number;
  rowSeats: SeatItem[];
  selectedSeatIds: string[];
  onToggleSeat: (seat: SeatItem) => void;
}

export interface SeatIconProps {
  status?: SeatStatus;
  isSelected?: boolean;
  color?: string;
  size?: number;
}

export interface SeatChipsProps {
  selectedSeats: SeatItem[];
  onRemoveSeat: (seatId: string) => void;
}

export interface DateSelectorProps {
  dates: string[];
  selectedDate: string;
  onSelectDate?: (date: string) => void;
}

export interface HallCardProps {
  time: string;
  hallName: string;
  price: number;
  bonus: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export interface BookingSuccessModalProps {
  visible: boolean;
  movieTitle: string;
  date: string;
  hallTime: string;
  seatCount: number;
  totalPrice: number;
  onClose: () => void;
}
