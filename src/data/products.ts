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
      { stage: 'Đóng gói & vận chuyển', description: 'Áo được gấp gọn theo form chuẩn rồi giao đến người mặc, hạn chế nhăn trong quá trình vận chuyển.' },
    ],
    story: {
      title: 'Từ hạt cà phê buổi sáng đến chiếc áo bạn mặc cả tuần',
      paragraphs: [
        'Có những buổi sáng Sài Gòn bắt đầu bằng một ly cà phê vội. Ly cà phê ấy tỉnh giấc cùng bạn, rồi phần bã lặng lẽ bị bỏ lại chỉ sau vài phút. Chiếc áo thun này ra đời từ chính những phần bã tưởng như vô dụng đó, được Ametia Green thu gom từ các quán quen, xử lý sạch và kéo thành sợi vải mới. Mặc nó, bạn mang theo một buổi sáng đã từng có ý nghĩa.',
        'Bông hữu cơ được chọn vì trồng theo quy trình hạn chế thuốc trừ sâu tổng hợp, cho sợi mềm và bền hơn khi kéo cùng bã cà phê. Tỷ lệ 60/40 giữa hai loại sợi được thử đi thử lại nhiều lần, chỉ để chiếc áo vừa mềm trên da, vừa giữ được dáng form rộng thảnh thơi mà bạn yêu thích.',
        'Khi dệt thành vải, những hạt than hoạt tính siêu nhỏ còn sót trong sợi cà phê được cho là giúp áo thấm hút mồ hôi và giữ mùi tốt hơn cotton thường. Đây là điều Ametia Green vẫn đang lắng nghe qua phản hồi thực tế của người mặc, không phải một lời hứa tuyệt đối, mà là một hành trình đang được kể tiếp mỗi ngày.',
        'Chiếc áo được cắt theo form rộng, đường may tối giản, ít chi tiết thừa, để bạn khoác lên là thấy dễ chịu ngay: đi cà phê cuối tuần cũng hợp, mà ở nhà cả ngày cũng thoải mái. Đây là kiểu áo bạn sẽ với tay lấy đầu tiên trong tủ đồ, hết mùa này qua mùa khác.',
        'Và mỗi lần bạn chọn mặc nó thêm một lần nữa thay vì mua mới, là thêm một phần bã cà phê không bị lãng phí, thêm một lựa chọn nhẹ nhàng hơn cho môi trường quanh mình. Thời trang bền vững, với Ametia Green, bắt đầu từ những điều nhỏ và thật như thế.',
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
        'Tám giờ ở văn phòng có thể khiến một chiếc áo trở nên nặng nề. Ametia Green thiết kế chiếc sơ mi tay ngắn này cho đúng những ngày như vậy, để đến cuối giờ chiều bạn vẫn thấy nhẹ nhõm và chỉn chu như lúc vừa mặc vào buổi sáng.',
        'Sợi bông được trồng và thu hoạch theo quy trình canh tác hữu cơ, ruộng bông hạn chế thuốc trừ sâu tổng hợp trong suốt vụ mùa. Ametia Green chọn nguồn bông này vì sợi dài, đều và ít gãy hơn khi kéo thành chỉ mảnh, cho một tấm vải mịn mà vẫn chắc chắn.',
        'Để đủ nhẹ và thoáng cho một ngày làm việc trọn vẹn, vải được dệt thưa hơn áo thun thông thường. Từng chi tiết được thử nhiều lần để áo vẫn đứng form khi sơ vin, không nhàu vội sau vài giờ, giữ bạn tự tin trong mọi cuộc họp.',
        'Trước khi cắt may, vải trải qua một lần giặt định hình để hạn chế co rút sau lần giặt đầu tiên. Một bước nhỏ tưởng như không ai để ý, nhưng lại quyết định chiếc áo có còn vừa vặn với bạn sau vài tháng hay không.',
        'Kết quả là một chiếc sơ mi đủ nghiêm túc để bước vào phòng họp, đủ thoải mái để ở lại thêm giờ, và đủ tinh tế để bạn mặc đi cà phê ngay sau khi tan làm. Một món đồ giản dị, lặng lẽ đồng hành cùng bạn qua những ngày bận rộn nhất.',
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
        'Một chai nhựa uống dở có thể kết thúc ở bãi rác trong vài giây, hoặc bắt đầu một hành trình hoàn toàn khác. Lớp áo khoác mỏng này chọn hành trình thứ hai: sợi polyester của nó được kéo lại từ nhựa PET đã qua sử dụng, thu gom, làm sạch, nghiền nhỏ và thổi thành một thứ để che chở bạn.',
        'Sợi tái chế được dệt dày vừa đủ để cản gió nhưng vẫn giữ trọng lượng nhẹ, đủ để bạn gấp gọn cho vào balo và gần như quên mất nó ở đó, cho đến khi trời trở gió. Lúc cần, chỉ cần khoác lên, và bạn được che chắn ngay.',
        'Lớp hoàn thiện bề mặt giúp vải ít nhăn hơn sau khi gấp. Đây là đặc tính Ametia Green vẫn đang theo dõi qua nhiều lần giặt thực tế, chưa phải một cam kết tuyệt đối, mà là điều chúng tôi muốn trung thực chia sẻ cùng bạn.',
        'Áo được may với đường chỉ gia cố ở vai và tay, những nơi chịu ma sát nhiều nhất mỗi ngày. Chi tiết nhỏ ấy là lời hứa rằng lớp áo mỏng này sẽ bền bỉ đi cùng bạn qua thật nhiều chuyến đi.',
        'Nhẹ trên vai, nhưng mang theo một câu chuyện không hề nhẹ: rằng những gì tưởng như bỏ đi vẫn có thể quay lại, hữu ích và đẹp đẽ. Mỗi lần khoác nó lên, bạn đang kể lại câu chuyện đó theo cách của riêng mình.',
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
        'Có những món đồ khiến bạn phải nâng niu, và có những món đồ chỉ lặng lẽ ở đó mỗi khi bạn cần. Chiếc quần dài ống suông này thuộc về nhóm thứ hai: bền bỉ, dễ tính, sẵn sàng cho gần như mọi ngày trong tuần mà không đòi hỏi gì nhiều.',
        'Cũng như áo khoác mỏng, sợi vải của quần bắt nguồn từ nhựa tái chế, được kéo thành sợi bền hơn để chịu được ma sát khi ngồi, khi di chuyển và qua nhiều lần giặt. Một vòng đời mới cho vật liệu cũ, ngay trong tủ đồ của bạn.',
        'Kiểu dệt chặt hơn được chọn riêng cho dòng quần, ưu tiên độ bền và khả năng khô nhanh hơn là sự mềm mại, vì đây là món đồ được mặc gần như mỗi tuần. Ống suông được dựng theo số đo trung bình của người trẻ đi làm tại Việt Nam, đủ rộng để thoải mái, đủ gọn để lịch sự.',
        'Ít nhăn, khô nhanh sau khi giặt, không kén cách phối, chiếc quần này lấy đi một bước phải suy nghĩ mỗi buổi sáng. Bạn chỉ cần mặc và bước ra khỏi nhà, phần còn lại cứ để nó lo.',
        'Sự bền vững đôi khi không nằm ở điều gì lớn lao, mà ở một món đồ bạn giữ lại thật lâu vì nó thực sự tốt. Đó là điều Ametia Green muốn gửi gắm trong từng đường ống quần này.',
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
        'Cuối tuần là lúc bạn muốn cơ thể được tự do. Chiếc quần short này được sinh ra cho những buổi sáng lười biếng, những vòng đạp xe quanh phố và những chuyến đi ngắn không cần suy tính nhiều.',
        'Quần dùng chung nguồn sợi polyester tái chế với quần dài ống suông, nhưng được dệt pha thêm độ co giãn nhẹ để bạn thoải mái đi bộ, vận động hay chỉ đơn giản là ngồi thật thư thái mà không thấy gò bó.',
        'Độ co giãn đến từ cách dệt chéo sợi, không cần pha thêm sợi spandex. Nhờ vậy, nếu một ngày nào đó chiếc quần được tái chế, quá trình ấy sẽ đơn giản hơn vì vải chỉ có một loại sợi chính. Một lựa chọn thiết kế nhỏ, nghĩ trước cho cả chặng đường dài phía sau.',
        'Với đặc tính nhanh khô quen thuộc của dòng vải tái chế Ametia Green, quần short là bạn đồng hành gọn nhẹ cho những chuyến đi không cần mang theo nhiều đồ. Lưng dây rút giúp điều chỉnh vừa vặn mà không cần quá nhiều size, giảm bớt lượng vải dư trong sản xuất.',
        'Nhẹ, thoáng và dễ chịu, chiếc quần này nhắc bạn rằng sống có trách nhiệm với môi trường không nhất thiết phải nghiêm túc. Đôi khi, nó chỉ là một cuối tuần thảnh thơi trong một món đồ khiến bạn thấy vui khi mặc.',
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
        'Chiếc túi này không cố gắng gây chú ý. Nó chỉ ở đó, mỗi ngày, gánh giúp bạn sách vở, laptop, đồ đi chợ hay cả một buổi chiều lang thang không định trước.',
        'Vải canvas được dệt lại từ sợi cotton tái chế, thu gom từ vải vụn và vải tồn kho, dày và thô hơn vải áo thun rất nhiều để chịu được sức nặng của cả ngày dài. Từ những mảnh vải tưởng chừng bỏ đi, một chiếc túi bền bỉ được sinh ra.',
        'Vì là vật liệu tái chế, mỗi cuộn canvas có sắc độ hơi khác nhau. Đó không phải lỗi sản xuất, mà là dấu vết tự nhiên của sợi tái chế mà Ametia Green giữ nguyên thay vì nhuộm đồng đều tuyệt đối. Chiếc túi của bạn, vì thế, mang một vẻ riêng không trùng lặp.',
        'Quai túi được may đôi lớp và gia cố tại điểm nối với thân túi, nơi chịu lực kéo nhiều nhất khi túi đầy đồ. Đáy vuông giúp túi đứng form khi đặt xuống bàn hay sàn nhà, thay vì xẹp lép như nhiều túi vải mỏng thông thường.',
        'Mỗi lần bạn xách nó ra khỏi nhà thay cho một chiếc túi nilon dùng một lần, là thêm một lựa chọn nhỏ nhưng rõ ràng cho môi trường. Bền, thật và đáng tin, đây là kiểu túi bạn sẽ dùng đến sờn cũ mà vẫn muốn giữ lại.',
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
        'Chiếc mũ đẹp nhất đôi khi là chiếc mũ bạn quên mất mình đang đội. Ametia Green làm ra chiếc mũ lưỡi trai này để nó lặng lẽ hợp với mọi bộ đồ, che nắng cho bạn mà không cần lên tiếng.',
        'Mũ dùng cùng nguồn bông hữu cơ với áo sơ mi tay ngắn, nhưng được dệt dày hơn để giữ form vành ổn định qua nhiều lần đội và giặt. Một chất liệu quen thuộc, được xử lý riêng cho một mục đích riêng.',
        'Ametia Green cố tình giữ thiết kế tối giản, không thêu logo lớn hay chi tiết nổi bật, để chiếc mũ dễ đồng hành với nhiều phong cách khác nhau thay vì chỉ hợp một kiểu trang phục. Sự giản dị ấy là điều khiến bạn đội nó mỗi ngày mà không thấy chán.',
        'Khóa điều chỉnh phía sau được làm từ kim loại tái chế, giúp mũ vừa với nhiều kích cỡ đầu mà không cần sản xuất nhiều size riêng. Lớp lót bên trong dùng vải mỏng hơn để mũ không quá bí khi đội lâu ngoài trời, một chi tiết nhỏ được giữ lại qua nhiều lần thử nghiệm.',
        'Nhẹ nhàng, bền bỉ và không phô trương, chiếc mũ này giống như chính triết lý của Ametia Green: làm tốt những điều nhỏ, một cách thật và có trách nhiệm, rồi để giá trị tự lên tiếng theo thời gian.',
      ],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
