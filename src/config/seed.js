const mongoose = require('mongoose');
const Course = require('../app/model/Course');
const db = require('./db');

const courses = [
    {
        name: 'JavaScript Cơ Bản',
        description: 'Học lập trình JavaScript từ cơ bản đến nâng cao',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop'
    },
    {
        name: 'NodeJS Backend',
        description: 'Xây dựng API backend với NodeJS và Express',
        image: 'https://images.viblo.asia/7da47988-21a4-45a2-a3d5-e650ca7d2bc6.png'
    },
    {
        name: 'MongoDB Database',
        description: 'Quản lý dữ liệu với MongoDB và Mongoose',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
        name: 'React Frontend',
        description: 'Xây dựng giao diện với React',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop'
    },
    {
        name: 'HTML & CSS',
        description: 'Học HTML5 và CSS3 để tạo giao diện web',
        image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=300&h=200&fit=crop'
    }
];

async function seedDatabase() {
    try {
        await db.connect();
        console.log('Đã kết nối database');

        // Xóa tất cả khóa học cũ
        await Course.deleteMany({});
        console.log('Đã xóa dữ liệu cũ');

        // Thêm khóa học mới
        const result = await Course.insertMany(courses);
        console.log(`Đã tạo ${result.length} khóa học`);

        result.forEach(course => {
            console.log(`- ${course.name}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Lỗi:', error);
        process.exit(1);
    }
}

seedDatabase();
