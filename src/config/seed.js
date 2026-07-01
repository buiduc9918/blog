const mongoose = require('mongoose');
const Course = require('../app/model/Course');
const db = require('./db');

// Hàm làm sạch và tạo slug tiếng Việt chuẩn
function slugify(text) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') 
        .toLowerCase()
        .trim()
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-') 
        .replace(/[^a-z0-9-]/g, '') 
        .replace(/--+/g, '-');
}

const rawData = [
  {
    "name": "JavaScript Cơ Bản",
    "description": "Học lập trình JavaScript từ cơ bản đến nâng cao",
    "level": "Beginner",
    "image": "http://img.youtube.com/vi/0SJE9dYdpps/maxresdefault.jpg",
    "videoID": "0SJE9dYdpps",
    "createdAt": "2026-06-23T16:17:35.525Z",
    "updatedAt": "2026-06-27T08:32:56.166Z",
    "deleted": false
  },
  {
    "name": "NodeJS Backend",
    "description": "Xây dựng API backend với NodeJS và Express",
    "level": "Intermediate",
    "image": "https://images.viblo.asia/7da47988-21a4-45a2-a3d5-e650ca7d2bc6.png",
    "videoID": "z2f7RHgvddc",
    "createdAt": "2026-06-23T16:17:35.526Z",
    "updatedAt": "2026-06-27T08:32:51.854Z",
    "deleted": false
  },
  {
    "name": "MongoDB Database",
    "description": "Quản lý dữ liệu với MongoDB và Mongoose",
    "level": "Intermediate",
    "image": "http://img.youtube.com/vi/KQOPq0oO_R8/maxresdefault.jpg",
    "videoID": "KQOPq0oO_R8",
    "createdAt": "2026-06-23T16:17:35.526Z",
    "updatedAt": "2026-06-26T18:52:43.561Z",
    "deleted": true,
    "deletedAt": "2026-06-26T18:52:43.561Z"
  },
  {
    "name": "React Frontend",
    "description": "Xây dựng giao diện với React",
    "level": "Intermediate",
    "image": "http://img.youtube.com/vi/NclbvXqvnyA/maxresdefault.jpg",
    "videoID": "NclbvXqvnyA",
    "createdAt": "2026-06-23T16:17:35.526Z",
    "updatedAt": "2026-06-27T08:32:54.085Z",
    "deleted": false
  },
  {
    "name": "HTML & CSS",
    "description": "Học HTML5 và CSS3 để tạo giao diện web",
    "level": "Beginner",
    "image": "http://img.youtube.com/vi/R6plN3FvzFY/maxresdefault.jpg",
    "videoID": "R6plN3FvzFY",
    "createdAt": "2026-06-23T16:17:35.526Z",
    "updatedAt": "2026-06-27T08:32:57.933Z",
    "deleted": false
  },
  {
    "name": "Khóa học Python",
    "description": "Khóa học Python cơ bản",
    "level": "Beginner",
    "image": "http://img.youtube.com/vi/NZj6LI5a9vc/maxresdefault.jpg",
    "videoID": "NZj6LI5a9vc",
    "createdAt": "2026-06-23T17:25:23.120Z",
    "updatedAt": "2026-06-26T18:52:47.929Z",
    "deleted": true,
    "deletedAt": "2026-06-26T18:52:47.928Z"
  },
  {
    "name": "Java",
    "description": "Java co ban",
    "level": "Beginner",
    "image": "http://img.youtube.com/vi/9tQ-GGE010s/maxresdefault.jpg",
    "videoID": "9tQ-GGE010s",
    "createdAt": "2026-06-23T17:56:39.754Z",
    "updatedAt": "2026-06-27T08:32:59.800Z",
    "deleted": false
  },
  {
    "name": "Code ứng dụng di động",
    "description": "Code ứng dụng di động siêu dễ trong 15 phút với JavaScript và React-Native",
    "level": "Intermediate",
    "videoID": "uBGKrMzgY9E",
    "image": "http://img.youtube.com/vi/uBGKrMzgY9E/maxresdefault.jpg",
    "createdAt": "2026-06-24T07:31:15.332Z",
    "updatedAt": "2026-06-27T08:06:52.665Z",
    "deleted": true,
    "deletedAt": "2026-06-27T08:06:52.664Z"
  },
  {
    "name": "Unity",
    "description": "3D Survival Game Tutorial",
    "level": "Intermediate",
    "videoID": "Nxg0vQk05os",
    "image": "http://img.youtube.com/vi/Nxg0vQk05os/maxresdefault.jpg",
    "createdAt": "2026-06-24T07:42:13.645Z",
    "updatedAt": "2026-06-27T08:49:25.875Z",
    "deleted": true,
    "deletedAt": "2026-06-27T08:49:25.874Z"
  }
];

// Sắp xếp lại dữ liệu: Gán ID số tự tăng từ 1 đến 9 và tối ưu hóa slug
const courses = rawData.map((item, index) => {
    return {
        _id: index + 1, // index chạy từ 0 -> Đổi thành ID số từ 1 đến 9
        name: item.name,
        slug: slugify(item.name), 
        description: item.description,
        level: item.level,
        image: item.image,
        videoID: item.videoID,
        deleted: item.deleted || false,
        deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
    };
});

async function seedDatabase() {
    try {
        await db.connect();
        console.log('=== Đã kết nối MongoDB thành công ===');

        // 1. Xóa sạch dữ liệu cũ
        await Course.deleteMany({});
        console.log('-> Đã xóa dữ liệu cũ trong collection.');

        // 2. Ép buộc xóa index cũ để tránh lỗi xung đột cấu trúc cũ/mới
        try {
            await Course.collection.dropIndexes();
        } catch (err) {
            // Bỏ qua lỗi nếu collection trống
        }

        // 3. Tiến hành insert mảng mới với ID 1 -> 9
        const result = await Course.insertMany(courses);
        console.log(`-> Thành công import ${result.length} khóa học mới!`);
        
        result.forEach(course => {
            console.log(`   [ID: ${course._id}] [${course.deleted ? 'ĐÃ XOÁ' : 'ACTIVE'}] - ${course.name} (Slug: ${course.slug})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Thất bại khi nạp dữ liệu:', error);
        process.exit(1);
    }
}

seedDatabase();