Blog - Website học khóa học bằng Node.js và MongoDB

Mô tả dự án
- Đây là một website blog đơn giản dùng để quản lý và hiển thị các khóa học online.
- Ứng dụng được xây dựng bằng Node.js, Express, MongoDB, Handlebars và SCSS.
- Dự án minh họa cách triển khai một web theo mô hình MVC và kết nối dữ liệu thực tế.

Công nghệ sử dụng
- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars
- SCSS
- Nodemon
- Slugify

Cấu trúc chính
- src/index.js: điểm khởi chạy server
- src/routes/: route cho các trang
- src/app/controllers/: controller xử lý logic
- src/app/model/: schema và model dữ liệu
- src/config/db/: kết nối database
- src/resource/views/: giao diện Handlebars
- src/public/: file tĩnh và assets

Cài đặt và chạy dự án
1. Cài đặt dependencies:
   npm install
2. Đảm bảo MongoDB đang chạy
3. Seed dữ liệu mẫu:
   npm run seed
4. Chạy ứng dụng:
   npm start
5. Mở trình duyệt tại:
   http://localhost:3000

Các lệnh hữu ích
- npm start: chạy server
- npm run watch: theo dõi SCSS
- npm run seed: tạo dữ liệu mẫu
- npm run kill: dừng port 3000 nếu đang bị chiếm

Quy trình Git và commit
- Xem thay đổi: git status
- Thêm file vào stage: git add .
- Commit với thông điệp rõ nghĩa:
  - feat: thêm tính năng mới
  - fix: sửa lỗi
  - style: chỉnh giao diện
  - docs: cập nhật tài liệu
  - chore: thay đổi cấu hình hoặc công cụ
- Ví dụ:
  git commit -m "feat: add course detail page"
  git push origin main

Ghi chú
- Nếu gặp lỗi thiếu package, hãy chạy npm install <package>
- Nếu cần tạo nhánh mới cho công việc, dùng:
  git checkout -b feature/ten-tinh-nang
- Luôn kiểm tra lại code trước khi push lên remote

Các mốc phát triển đã hoàn thành
- 2026-07-01: Hoàn thiện khóa học Node.js và các tính năng chính của web
- 2026-07-01: Cải thiện bố cục và sắp xếp nhiều cột trong giao diện
- 2026-06-30: Tìm hiểu sâu hơn về Handlebars, middleware và open-iconic
- 2026-06-30: Thêm nhiều tính năng liên quan đến khóa học
- 2026-06-29: Hoàn thiện chức năng xóa và khôi phục dữ liệu

Lịch sử commit gần đây
- ba96ddd | 2026-07-01 | Hoan thien khoa hoc nodejs
- 419a820 | 2026-07-01 | thiet lap thanh cong sap sep nhieu column
- bb40d98 | 2026-07-01 | loi xcc 1
- 98bf849 | 2026-06-30 | trick
- f4392b6 | 2026-06-30 | trick midle rename
