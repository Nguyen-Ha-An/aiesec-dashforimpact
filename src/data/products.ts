export interface ProductFeature {
  label: string;
  simulated?: boolean;
}

export interface ProductTimelineStep {
  stage: string;
  description: string;
}

export interface ProductStory {
  title: string;
  paragraphs: string[];
}

export interface Product {
  slug: string;
  name: string;
  priceVnd: number;
  sku: string;
  materials: string;
  features: ProductFeature[];
  care: string[];
  timeline: ProductTimelineStep[];
  story: ProductStory;
}

export const products: Product[] = [
  {
    slug: 'ao-thun-form-rong',
    name: 'Áo thun form rộng',
    priceVnd: 599000,
    sku: 'AG-ATR-001',
    materials: '60% bông hữu cơ & 40% sợi bã cà phê tái chế, mềm mại, thấm hút mồ hôi, khử mùi tự nhiên và chống tia UV.',
    features: [
      { label: 'Mềm mại, thấm hút mồ hôi tốt' },
      { label: 'Khử mùi tự nhiên', simulated: true },
      { label: 'Chống tia UV', simulated: true },
      { label: 'Form rộng, dễ phối nhiều phong cách' },
    ],
    care: [
      'Giặt máy ở 30°C với đồ cùng màu',
      'Không dùng thuốc tẩy',
      'Phơi trong bóng râm, tránh ánh nắng trực tiếp',
      'Ủi ở nhiệt độ thấp nếu cần',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Bông hữu cơ và bã cà phê thu gom từ các quán quen thuộc tại Sài Gòn được xử lý riêng trước khi pha trộn.' },
      { stage: 'Dệt & xử lý vải', description: 'Sợi bông và sợi bã cà phê được kéo cùng nhau theo tỷ lệ 60/40 rồi dệt thành tấm vải form rộng.' },
      { stage: 'Cắt may', description: 'Vải được cắt theo rập form rộng, đường may đơn giản, hạn chế chi tiết thừa để mặc được lâu dài.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Từng áo được kiểm tra đường may, độ đều màu và độ co giãn trước khi đóng gói.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Áo được gấp gọn, đóng gói bằng vật liệu hạn chế nhựa dùng một lần rồi giao đến người mặc.' },
    ],
    story: {
      title: 'Từ hạt cà phê buổi sáng đến chiếc áo bạn mặc cả tuần',
      paragraphs: [
        'Mỗi bã cà phê dùng để tạo ra sợi vải trong chiếc áo này từng là một cốc cà phê sáng ở đâu đó tại Sài Gòn. Sau khi pha xong, phần bã thường bị bỏ đi trong vài phút. Ametia Green thu gom một phần bã cà phê từ các quán quen thuộc, xử lý và kết hợp với bông hữu cơ để tạo thành sợi vải mới.',
        'Bông hữu cơ được chọn vì trồng theo quy trình hạn chế thuốc trừ sâu tổng hợp, mềm và bền hơn khi kéo sợi cùng bã cà phê. Tỷ lệ 60/40 giữa hai loại sợi được thử nghiệm nhiều lần để vải vừa mềm mại, vừa giữ được form rộng đặc trưng.',
        'Khi dệt thành vải, các hạt than hoạt tính siêu nhỏ còn sót lại trong sợi cà phê được cho là góp phần giúp vải thấm hút mồ hôi và hạn chế mùi tốt hơn vải cotton thông thường. Đây là đặc tính Ametia Green vẫn đang tiếp tục theo dõi qua phản hồi người mặc thực tế, chưa phải một cam kết tuyệt đối.',
        'Từ tấm vải, mỗi chiếc áo được cắt theo form rộng, đường may đơn giản, ít chi tiết thừa, để mặc được lâu qua nhiều mùa mà không lỗi mốt.',
      ],
    },
  },
  {
    slug: 'ao-so-mi-tay-ngan',
    name: 'Áo sơ mi tay ngắn',
    priceVnd: 699000,
    sku: 'AG-SMI-001',
    materials: '100% cotton hữu cơ, chất vải nhẹ, thoáng khí.',
    features: [
      { label: 'Chất vải nhẹ, thoáng khí' },
      { label: 'Form vừa vặn, phù hợp môi trường công sở' },
      { label: 'Ít nhăn sau vài giờ mặc', simulated: true },
      { label: 'Dễ phối với quần tây và quần dài ống suông' },
    ],
    care: [
      'Giặt máy nhẹ ở 30°C',
      'Ủi ở nhiệt độ trung bình khi vải còn hơi ẩm',
      'Phơi trên móc để giữ form vai',
      'Không dùng thuốc tẩy',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Bông hữu cơ được thu hoạch từ vùng trồng hạn chế thuốc trừ sâu tổng hợp, chọn lọc theo độ dài sợi.' },
      { stage: 'Dệt & xử lý vải', description: 'Sợi bông được dệt thưa hơn áo thun để vải nhẹ và thoáng hơn, sau đó giặt định hình để hạn chế co rút.' },
      { stage: 'Cắt may', description: 'Áo được cắt theo form vừa vặn công sở, cổ và tay áo được gia cố đường may kỹ hơn.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Kiểm tra độ đứng form cổ áo, hàng cúc và đường chỉ trước khi đóng gói.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Áo được gấp theo form chuẩn để hạn chế nhăn trong quá trình vận chuyển.' },
    ],
    story: {
      title: 'Một tấm vải mỏng, sinh ra để chịu được cả ngày dài ở văn phòng',
      paragraphs: [
        'Sợi bông trong chiếc sơ mi này được trồng và thu hoạch theo quy trình canh tác hữu cơ, nghĩa là ruộng bông hạn chế sử dụng thuốc trừ sâu tổng hợp trong suốt vụ mùa. Ametia Green chọn nguồn bông này vì sợi dài, đều và ít gãy hơn khi kéo thành chỉ mảnh.',
        'Để vải đủ nhẹ và thoáng cho một ngày làm việc tám tiếng, sợi bông được dệt theo kiểu thưa hơn áo thun thông thường. Quá trình này được thử nhiều lần để vải vẫn đứng form khi bỏ vào quần, không bị nhàu ngay sau vài giờ mặc.',
        'Trước khi cắt may, vải trải qua một lần giặt định hình để hạn chế co rút sau lần giặt đầu tiên của người mặc, một bước nhỏ nhưng quyết định việc áo có còn vừa vặn sau vài tháng sử dụng hay không.',
        'Kết quả là một chiếc sơ mi tay ngắn nhẹ, thoáng khí, đủ nghiêm túc cho văn phòng nhưng vẫn thoải mái để mặc suốt ngày dài.',
      ],
    },
  },
  {
    slug: 'ao-khoac-mong',
    name: 'Áo khoác mỏng',
    priceVnd: 1190000,
    sku: 'AG-KHM-001',
    materials: '100% polyester tái chế, trọng lượng nhẹ, chống gió và chống nhăn.',
    features: [
      { label: 'Trọng lượng nhẹ, gấp gọn mang theo được' },
      { label: 'Chống gió', simulated: true },
      { label: 'Chống nhăn', simulated: true },
      { label: 'Đường chỉ gia cố ở vai và tay' },
    ],
    care: [
      'Lau sạch bằng khăn ẩm cho vết bẩn nhẹ',
      'Giặt máy ở chế độ nhẹ, nước lạnh',
      'Không sấy ở nhiệt độ cao',
      'Phơi nơi thoáng, tránh ánh nắng trực tiếp',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Nhựa PET đã qua sử dụng được thu gom, làm sạch và nghiền nhỏ để chuẩn bị kéo sợi.' },
      { stage: 'Dệt & xử lý vải', description: 'Sợi polyester tái chế được dệt dày vừa đủ để cản gió nhưng vẫn giữ trọng lượng nhẹ.' },
      { stage: 'Cắt may', description: 'Áo khoác được cắt với đường chỉ gia cố tại vai và tay, những vị trí chịu ma sát nhiều nhất.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Kiểm tra độ kín đường may và khả năng gấp gọn trước khi đóng gói.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Áo được gấp gọn trong túi kèm theo để thuận tiện mang theo khi di chuyển.' },
    ],
    story: {
      title: 'Từ chai nhựa đã qua sử dụng đến lớp áo chắn gió',
      paragraphs: [
        'Sợi polyester trong áo khoác này bắt đầu từ nhựa PET đã qua sử dụng, được thu gom, làm sạch, nghiền nhỏ và kéo lại thành sợi mới thay vì dùng nhựa nguyên sinh. Đây là loại vật liệu Ametia Green đang thử nghiệm ở nhóm sản phẩm ngoài trời nhẹ.',
        'Sợi tái chế được dệt dày vừa đủ để cản gió nhưng vẫn giữ trọng lượng nhẹ, phù hợp gấp gọn mang theo trong túi hoặc balo khi thời tiết thay đổi bất chợt.',
        'Lớp hoàn thiện bề mặt giúp vải ít nhăn hơn sau khi gấp, nhưng đây là đặc tính Ametia Green vẫn đang theo dõi qua nhiều lần giặt thực tế, chưa phải một cam kết tuyệt đối.',
        'Áo được may với đường chỉ gia cố ở vai và tay, những vị trí chịu ma sát nhiều nhất khi mặc hàng ngày, để lớp áo mỏng này vẫn bền theo thời gian.',
      ],
    },
  },
  {
    slug: 'quan-dai-ong-suong',
    name: 'Quần dài ống suông',
    priceVnd: 990000,
    sku: 'AG-QDS-001',
    materials: '100% polyester tái chế, bền, nhanh khô và dễ bảo quản.',
    features: [
      { label: 'Bền, chịu được giặt nhiều lần' },
      { label: 'Nhanh khô' },
      { label: 'Dễ bảo quản, ít cần ủi' },
      { label: 'Ống suông, dễ phối với sơ mi và áo thun' },
    ],
    care: [
      'Giặt máy ở 30°C',
      'Không sấy ở nhiệt độ cao',
      'Ủi nhẹ nếu cần, tránh ủi trực tiếp lên đường may',
      'Phơi trên móc quần để giữ dáng ống',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Sợi polyester tái chế cùng nguồn với áo khoác mỏng, được chọn kéo dày hơn để tăng độ bền.' },
      { stage: 'Dệt & xử lý vải', description: 'Kiểu dệt chặt hơn được ưu tiên để chịu ma sát khi ngồi và di chuyển nhiều lần trong tuần.' },
      { stage: 'Cắt may', description: 'Ống suông được thiết kế theo số đo trung bình của người trẻ đi làm tại Việt Nam.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Kiểm tra độ đều của đường ống quần và độ chắc chắn của đường chỉ lưng quần.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Quần được gấp theo nếp ống chuẩn để hạn chế nhăn khi vận chuyển.' },
    ],
    story: {
      title: 'Một chiếc quần không đòi hỏi bạn phải chăm sóc quá nhiều',
      paragraphs: [
        'Cũng như áo khoác mỏng, sợi vải của quần dài ống suông bắt nguồn từ nhựa tái chế, được kéo thành sợi bền hơn để chịu được ma sát khi ngồi, di chuyển và giặt nhiều lần.',
        'Kiểu dệt chặt hơn được chọn riêng cho dòng quần, ưu tiên độ bền và khả năng khô nhanh hơn là sự mềm mại, vì đây là món đồ được mặc gần như mỗi tuần.',
        'Ống suông được thiết kế dựa trên số đo trung bình của người trẻ đi làm tại Việt Nam, đủ rộng để thoải mái di chuyển nhưng vẫn giữ được đường dáng gọn gàng.',
        'Một chiếc quần ít nhăn, khô nhanh sau khi giặt và không kén cách phối đồ, để việc mặc đẹp mỗi ngày bớt đi một bước phải nghĩ.',
      ],
    },
  },
  {
    slug: 'quan-short',
    name: 'Quần short',
    priceVnd: 799000,
    sku: 'AG-QSH-001',
    materials: '100% polyester tái chế, co giãn nhẹ.',
    features: [
      { label: 'Co giãn nhẹ, thoải mái vận động' },
      { label: 'Nhanh khô' },
      { label: 'Lưng dây rút điều chỉnh vừa vặn' },
      { label: 'Phù hợp cho các hoạt động cuối tuần' },
    ],
    care: [
      'Giặt máy ở chế độ nhẹ',
      'Tránh vắt mạnh để giữ độ co giãn',
      'Phơi nơi thoáng',
      'Không dùng thuốc tẩy',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Sợi polyester tái chế cùng nguồn với quần dài ống suông, dệt pha thêm độ co giãn nhẹ.' },
      { stage: 'Dệt & xử lý vải', description: 'Độ co giãn đến từ cách dệt chéo sợi, không pha thêm spandex, giữ vải thuần một loại sợi chính.' },
      { stage: 'Cắt may', description: 'Quần được cắt với lưng dây rút nhẹ để điều chỉnh vừa vặn mà không cần quá nhiều size.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Kiểm tra độ co giãn và độ chắc chắn của dây rút trước khi đóng gói.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Quần được gấp gọn, phù hợp mang theo cho các chuyến đi ngắn ngày.' },
    ],
    story: {
      title: 'Sợi vải co giãn cho những ngày cuối tuần',
      paragraphs: [
        'Quần short dùng chung nguồn sợi polyester tái chế với quần dài ống suông, nhưng được dệt pha thêm độ co giãn nhẹ để phù hợp với các hoạt động ngoài công việc như đi bộ, đạp xe hoặc chỉ đơn giản là ngồi thoải mái hơn.',
        'Độ co giãn đến từ cách dệt chéo sợi, không cần pha thêm sợi spandex, giúp việc tái chế vải sau này, nếu có, đơn giản hơn vì chỉ có một loại sợi chính.',
        'Với đặc tính nhanh khô tương tự các sản phẩm polyester tái chế khác của Ametia Green, quần short phù hợp cho những chuyến đi ngắn ngày không cần mang theo nhiều đồ.',
        'Lưng quần có dây rút nhẹ để điều chỉnh vừa vặn mà không cần quá nhiều size khác nhau, giảm bớt lượng vải dư thừa trong quá trình sản xuất.',
      ],
    },
  },
  {
    slug: 'tui-tote',
    name: 'Túi tote',
    priceVnd: 299000,
    sku: 'AG-TUI-001',
    materials: 'Canvas tái chế, chịu lực tốt.',
    features: [
      { label: 'Chịu lực tốt, phù hợp mang đồ hàng ngày' },
      { label: 'Đáy vuông, đứng form khi đặt xuống' },
      { label: 'Quai may đôi lớp, gia cố tại điểm nối' },
      { label: 'Sắc độ vải tự nhiên, không đồng nhất tuyệt đối' },
    ],
    care: [
      'Lau sạch vết bẩn bằng khăn ẩm',
      'Giặt tay nếu cần, tránh giặt máy',
      'Phơi tự nhiên, tránh ánh nắng gắt',
      'Không dùng thuốc tẩy',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Vải canvas được dệt lại từ sợi cotton tái chế, thu gom từ vải vụn và vải tồn kho.' },
      { stage: 'Dệt & xử lý vải', description: 'Sợi tái chế được dệt dày và thô hơn vải áo thun để tăng khả năng chịu lực.' },
      { stage: 'Cắt may', description: 'Túi được cắt với đáy vuông và quai may đôi lớp, gia cố tại điểm nối với thân túi.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Kiểm tra độ chắc chắn của quai túi bằng cách thử tải trọng trước khi đóng gói.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Túi được xếp phẳng để tiết kiệm không gian đóng gói và vận chuyển.' },
    ],
    story: {
      title: 'Một mảnh vải bố cũ, một hành trình chịu lực mới',
      paragraphs: [
        'Vải canvas của túi tote được dệt lại từ sợi cotton tái chế, dày và thô hơn vải áo thun rất nhiều, để chịu được trọng lượng của sách vở, laptop hoặc đồ đi chợ hàng ngày.',
        'Vì là vật liệu tái chế, mỗi cuộn vải canvas có sắc độ hơi khác nhau một chút. Đây không phải lỗi sản xuất mà là đặc điểm tự nhiên của sợi tái chế mà Ametia Green giữ nguyên thay vì nhuộm đồng đều tuyệt đối.',
        'Quai túi được may đôi lớp và gia cố tại điểm nối với thân túi, vị trí chịu lực kéo nhiều nhất khi túi được xách đầy đồ.',
        'Ametia Green thiết kế tote với đáy vuông để đứng form khi đặt xuống bàn hoặc sàn, thay vì xẹp lép như nhiều túi vải mỏng thông thường.',
      ],
    },
  },
  {
    slug: 'mu-luoi-trai',
    name: 'Mũ lưỡi trai',
    priceVnd: 269000,
    sku: 'AG-MLT-001',
    materials: '100% cotton hữu cơ, kiểu dáng tối giản, dễ phối với nhiều trang phục.',
    features: [
      { label: 'Kiểu dáng tối giản, không chi tiết thừa' },
      { label: 'Dễ phối với nhiều phong cách' },
      { label: 'Khóa điều chỉnh từ kim loại tái chế' },
      { label: 'Lớp lót thoáng, đội lâu ngoài trời' },
    ],
    care: [
      'Lau nhẹ bằng khăn ẩm',
      'Tránh giặt máy để giữ form vành mũ',
      'Phơi tự nhiên, tránh vò hoặc gập vành',
      'Không dùng thuốc tẩy',
    ],
    timeline: [
      { stage: 'Nguồn nguyên liệu', description: 'Cùng nguồn bông hữu cơ với áo sơ mi tay ngắn, chọn sợi dệt dày hơn để giữ form vành mũ.' },
      { stage: 'Dệt & xử lý vải', description: 'Vải được dệt dày và định hình để vành mũ ổn định qua nhiều lần đội và giặt.' },
      { stage: 'Cắt may', description: 'Mũ được cắt và may theo thiết kế tối giản, không thêu chi tiết lớn hay logo nổi bật.' },
      { stage: 'Hoàn thiện & kiểm tra', description: 'Khóa điều chỉnh từ kim loại tái chế được kiểm tra độ chắc chắn trước khi lắp vào mũ.' },
      { stage: 'Đóng gói & vận chuyển', description: 'Mũ được đóng gói giữ form vành, tránh móp trong quá trình vận chuyển.' },
    ],
    story: {
      title: 'Một chiếc mũ được thiết kế để không ai để ý đến nó trước',
      paragraphs: [
        'Mũ lưỡi trai dùng cùng nguồn bông hữu cơ với áo sơ mi tay ngắn, nhưng được dệt dày hơn để giữ form vành mũ ổn định qua nhiều lần đội và giặt.',
        'Ametia Green cố tình giữ thiết kế tối giản, không thêu logo lớn hay chi tiết nổi bật, để chiếc mũ dễ phối với nhiều phong cách khác nhau thay vì chỉ hợp với một kiểu trang phục nhất định.',
        'Phần khóa điều chỉnh phía sau được làm từ kim loại tái chế, giúp mũ vừa với nhiều kích cỡ đầu khác nhau mà không cần sản xuất nhiều size riêng biệt.',
        'Một chi tiết nhỏ nhưng được giữ lại qua nhiều lần thử nghiệm: lớp lót bên trong dùng vải mỏng hơn để mũ không quá bí khi đội lâu ngoài trời.',
      ],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
