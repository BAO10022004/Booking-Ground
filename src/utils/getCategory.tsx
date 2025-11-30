import Category from "../models/Category";
function GetListCategory(){
    const categories : Category[] = [
        { categoryId: '1', name: 'Đặt lịch trực quan' },
        { categoryId: '2', name: 'Đặt lịch sự kiện ' }
    ];
    return categories;
}

export default GetListCategory;
