import type { SeatItem } from "@/components/booking/SeatGrid";

export function generateMockSeats(): SeatItem[] {
  const seats: SeatItem[] = [];
  const totalRows = 10;

  for (let r = 1; r <= totalRows; r++) {
    // Left section: 2 seats
    for (let c = 1; c <= 2; c++) {
      const isVip = r === 9 || r === 10;
      const isReserved = (r + c) % 4 === 0;
      seats.push({
        id: `L-${r}-${c}`,
        row: r,
        col: c,
        section: "left",
        status: isReserved ? "reserved" : isVip ? "vip" : "available",
        price: isVip ? 150 : 50,
      });
    }

    // Center section: 10 seats
    for (let c = 1; c <= 10; c++) {
      const isVip = r === 9 || r === 10;
      const isExecutive = r === 4 && (c === 2 || c === 9);
      const isReserved = (r * 3 + c) % 5 === 0;
      seats.push({
        id: `C-${r}-${c}`,
        row: r,
        col: c,
        section: "center",
        status: isReserved
          ? "reserved"
          : isExecutive
          ? "executive"
          : isVip
          ? "vip"
          : "available",
        price: isVip ? 150 : isExecutive ? 100 : 50,
      });
    }

    // Right section: 2 seats
    for (let c = 1; c <= 2; c++) {
      const isVip = r === 9 || r === 10;
      const isReserved = (r + c * 2) % 3 === 0;
      seats.push({
        id: `R-${r}-${c}`,
        row: r,
        col: c,
        section: "right",
        status: isReserved ? "reserved" : isVip ? "vip" : "available",
        price: isVip ? 150 : 50,
      });
    }
  }

  return seats;
}
