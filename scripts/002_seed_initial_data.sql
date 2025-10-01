-- Insert default hero content
insert into public.hero_content (
  title_en,
  title_vi,
  subtitle_en,
  subtitle_vi,
  description_en,
  description_vi,
  cta_primary_text_en,
  cta_primary_text_vi,
  cta_primary_url,
  cta_secondary_text_en,
  cta_secondary_text_vi,
  cta_secondary_url
) values (
  'Premier Cloud Partner',
  'Đối Tác Đám Mây Hàng Đầu',
  'Empowering Your Digital Transformation',
  'Trao Quyền Chuyển Đổi Số Của Bạn',
  'Titanbases Technology delivers enterprise-grade cloud solutions across AWS, Azure, and Google Cloud Platform. Our certified experts help businesses scale securely and efficiently.',
  'Titanbases Technology cung cấp các giải pháp đám mây cấp doanh nghiệp trên AWS, Azure và Google Cloud Platform. Các chuyên gia được chứng nhận của chúng tôi giúp doanh nghiệp mở rộng quy mô một cách an toàn và hiệu quả.',
  'Get Started',
  'Bắt Đầu',
  '#contact',
  'View Solutions',
  'Xem Giải Pháp',
  '#partners'
);

-- Insert sample partners
insert into public.partners (name, logo_url, category, website_url, display_order) values
  ('Amazon Web Services', '/placeholder.svg?height=80&width=200', 'csp', 'https://aws.amazon.com', 1),
  ('Microsoft Azure', '/placeholder.svg?height=80&width=200', 'csp', 'https://azure.microsoft.com', 2),
  ('Google Cloud', '/placeholder.svg?height=80&width=200', 'csp', 'https://cloud.google.com', 3);

-- Insert sample certifications
insert into public.certifications (name_en, name_vi, provider, badge_url, display_order) values
  ('AWS Solutions Architect Professional', 'Kiến Trúc Sư Giải Pháp AWS Chuyên Nghiệp', 'aws', '/placeholder.svg?height=120&width=120', 1),
  ('Azure Solutions Architect Expert', 'Chuyên Gia Kiến Trúc Giải Pháp Azure', 'azure', '/placeholder.svg?height=120&width=120', 2),
  ('Google Cloud Professional Architect', 'Kiến Trúc Sư Chuyên Nghiệp Google Cloud', 'google-cloud', '/placeholder.svg?height=120&width=120', 3);

-- Insert sample feature cards
insert into public.feature_cards (title_en, title_vi, description_en, description_vi, icon_name, display_order) values
  ('Multi-Cloud Expertise', 'Chuyên Môn Đa Đám Mây', 'Certified across AWS, Azure, and Google Cloud platforms', 'Được chứng nhận trên các nền tảng AWS, Azure và Google Cloud', 'Cloud', 1),
  ('24/7 Support', 'Hỗ Trợ 24/7', 'Round-the-clock technical support and monitoring', 'Hỗ trợ kỹ thuật và giám sát 24/7', 'HeadphonesIcon', 2),
  ('Security First', 'Bảo Mật Ưu Tiên', 'Enterprise-grade security and compliance standards', 'Tiêu chuẩn bảo mật và tuân thủ cấp doanh nghiệp', 'Shield', 3),
  ('Cost Optimization', 'Tối Ưu Chi Phí', 'Maximize ROI with intelligent resource management', 'Tối đa hóa ROI với quản lý tài nguyên thông minh', 'TrendingUp', 4);

-- Insert sample articles
insert into public.articles (
  title_en,
  title_vi,
  slug,
  excerpt_en,
  excerpt_vi,
  content_en,
  content_vi,
  category,
  tags,
  is_published,
  published_at
) values
  (
    'Migrating to Cloud: Best Practices',
    'Di Chuyển Lên Đám Mây: Thực Hành Tốt Nhất',
    'migrating-to-cloud-best-practices',
    'Learn the essential steps for a successful cloud migration journey.',
    'Tìm hiểu các bước thiết yếu cho hành trình di chuyển đám mây thành công.',
    'Cloud migration is a critical step in digital transformation...',
    'Di chuyển đám mây là bước quan trọng trong chuyển đổi số...',
    'blog',
    ARRAY['cloud', 'migration', 'best-practices'],
    true,
    now()
  ),
  (
    'AWS vs Azure vs Google Cloud: A Comparison',
    'AWS vs Azure vs Google Cloud: So Sánh',
    'aws-vs-azure-vs-google-cloud',
    'Compare the top three cloud providers to find the best fit for your business.',
    'So sánh ba nhà cung cấp đám mây hàng đầu để tìm giải pháp phù hợp nhất cho doanh nghiệp của bạn.',
    'Choosing the right cloud provider is crucial for your business success...',
    'Chọn nhà cung cấp đám mây phù hợp là rất quan trọng cho sự thành công của doanh nghiệp...',
    'blog',
    ARRAY['aws', 'azure', 'google-cloud', 'comparison'],
    true,
    now()
  );
