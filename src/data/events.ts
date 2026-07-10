export type EventStatus = 'sap-dien-ra' | 'dang-mo-dang-ky' | 'da-ket-thuc';

export interface AmetiaEvent {
  slug: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: EventStatus;
  imageSlug: string;
}

export const events: AmetiaEvent[] = [
  {
    slug: 'workshop-sua-ao',
    name: 'Workshop: Sửa áo cùng Ametia Green',
    date: '2026-07-25',
    location: 'Xưởng may Ametia Green, 45 Nguyễn Văn Đậu, Bình Thạnh, TP.HCM',
    description: 'Buổi hướng dẫn sửa các lỗi thường gặp trên áo thun và áo sơ mi: sứt chỉ, bung cúc, giãn cổ áo. Người tham gia mang theo áo cũ để thực hành trực tiếp.',
    status: 'dang-mo-dang-ky',
    imageSlug: 'workshop-sua-ao',
  },
  {
    slug: 'diem-thu-hoi-luu-dong-q7',
    name: 'Điểm thu hồi lưu động - Quận 7',
    date: '2026-07-19',
    location: 'Sảnh trước Toong Coworking, Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM',
    description: 'Mang quần áo cũ không còn sử dụng đến đổi lấy phiếu quà tặng. Áp dụng cho mọi thương hiệu, không riêng sản phẩm Ametia Green.',
    status: 'dang-mo-dang-ky',
    imageSlug: 'diem-thu-hoi-luu-dong-q7',
  },
  {
    slug: 'ngay-hoi-doi-do-cu',
    name: 'Ngày hội đổi và thu hồi quần áo cũ',
    date: '2026-08-09',
    location: 'Sân trong The Factory Contemporary Arts Centre, Quận 2, TP.HCM',
    description: 'Sự kiện đổi đồ quy mô lớn kết hợp khu vực thu hồi quần áo cũ, có sự tham gia của một số thương hiệu địa phương khác.',
    status: 'sap-dien-ra',
    imageSlug: 'ngay-hoi-doi-do-cu',
  },
  {
    slug: 'buoi-tro-chuyen-hanh-trinh-mot-chiec-ao',
    name: 'Buổi trò chuyện: Hành trình một chiếc áo',
    date: '2026-08-22',
    location: 'Không gian sự kiện Toong Coworking, Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
    description: 'Đại diện xưởng may chia sẻ về quá trình chọn nguyên liệu, dệt vải và cắt may của một sản phẩm Ametia Green, từ ý tưởng đến thành phẩm.',
    status: 'sap-dien-ra',
    imageSlug: 'buoi-tro-chuyen-hanh-trinh-mot-chiec-ao',
  },
  {
    slug: 'workshop-cham-soc-vai-tai-che',
    name: 'Workshop: Chăm sóc vải tái chế đúng cách',
    date: '2026-06-14',
    location: 'Xưởng may Ametia Green, 45 Nguyễn Văn Đậu, Bình Thạnh, TP.HCM',
    description: 'Hướng dẫn giặt, phơi và bảo quản các sản phẩm từ polyester tái chế và canvas tái chế để giữ form lâu hơn.',
    status: 'da-ket-thuc',
    imageSlug: 'workshop-cham-soc-vai-tai-che',
  },
];

export function getEventBySlug(slug: string): AmetiaEvent | undefined {
  return events.find((e) => e.slug === slug);
}
