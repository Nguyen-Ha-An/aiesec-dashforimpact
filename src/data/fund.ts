export interface FundProject {
  name: string;
  description: string;
  goalVnd: number;
  raisedVnd: number;
}

export interface FundWeekUpdate {
  weekLabel: string;
  note: string;
}

export interface GreenLoopFundData {
  balanceVnd: number;
  itemsCollected: number;
  projects: FundProject[];
  weeklyUpdates: FundWeekUpdate[];
}

export const fundData: GreenLoopFundData = {
  balanceVnd: 18450000,
  itemsCollected: 327,
  projects: [
    {
      name: 'Máy tái chế sợi vải mini cho xưởng may',
      description: 'Đầu tư máy nghiền và kéo sợi công suất nhỏ để xử lý vải vụn ngay tại xưởng, giảm phụ thuộc vào đơn vị xử lý bên ngoài.',
      goalVnd: 60000000,
      raisedVnd: 41200000,
    },
    {
      name: 'Điểm thu hồi quần áo tại 5 quận nội thành',
      description: 'Mở rộng mạng lưới điểm thu hồi quần áo cũ tại các quận trung tâm để người mua dễ dàng trả lại sản phẩm đã qua sử dụng.',
      goalVnd: 30000000,
      raisedVnd: 30000000,
    },
    {
      name: 'Chuỗi workshop sửa chữa và làm mới quần áo',
      description: 'Tổ chức các buổi workshop hướng dẫn sửa chữa, làm mới và phối lại quần áo cũ, giúp khách hàng kéo dài vòng đời sản phẩm thay vì thải bỏ sớm.',
      goalVnd: 45000000,
      raisedVnd: 12800000,
    },
  ],
  weeklyUpdates: [
    { weekLabel: 'Tuần 28, 2026', note: 'Hoàn tất lắp đặt điểm thu hồi thứ năm tại Quận 7, nâng tổng số điểm thu hồi đang hoạt động lên 5.' },
    { weekLabel: 'Tuần 27, 2026', note: 'Nhận thêm 42 sản phẩm quần áo cũ từ chương trình đổi đồ tại The Factory Contemporary Arts Centre.' },
    { weekLabel: 'Tuần 26, 2026', note: 'Chuyển 18.500.000 VNĐ vào dự án máy tái chế sợi vải mini sau đợt vận động cuối tháng 6.' },
    { weekLabel: 'Tuần 25, 2026', note: 'Khởi động chuỗi workshop sửa chữa và làm mới quần áo cho khách hàng thành viên.' },
    { weekLabel: 'Tuần 24, 2026', note: 'Dự án điểm thu hồi quần áo tại 5 quận nội thành đạt 100% mục tiêu gọi vốn.' },
    { weekLabel: 'Tuần 23, 2026', note: 'Ametia Green công bố Green Loop Fund và mục tiêu gọi vốn cho quý 3.' },
  ],
};
