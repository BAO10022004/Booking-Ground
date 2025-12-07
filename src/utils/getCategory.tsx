import Category from "../models/Category";
function GetListCategory(){
     const categories: Category[] = [
    { categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201', name: 'Cầu lông' },
    { categoryId: 'c4e2f8d1-7b3e-4e5c-9bf9-11a9d714ff02', name: 'Bóng đá' },
    { categoryId: '9df1c5b2-6f8a-4e2c-81e2-22b0f1cabb03', name: 'Tennis' },
    { categoryId: 'e3a7b9d9-5c2f-4d33-b4c4-33f1d765cd04', name: 'Pickleball' },
    { categoryId: 'f9c8e2b1-3d2a-4f46-96d9-44d2e8abfe05', name: 'Bóng rổ' },
    { categoryId: 'b7d5c1e9-8f1e-495c-9f8f-55a3e9bbac06', name: 'Bóng chuyền' },
    { categoryId: 'd6e9a3f2-4e8b-4b22-a9d3-66b4c4ccde07', name: 'Futsal' },
    { categoryId: '3f2b8e4d-7c19-4e0b-a2e4-77a5d5eeef08', name: 'Billiards' },
    { categoryId: '8e3c4d2f-9b8a-4e55-bd33-88b6f6ffaa09', name: 'Gym Fitness' },
    { categoryId: '1b4d6c7f-5a38-4f1b-91e1-99a7d2bbbc10', name: 'Yoga' },
];

    return categories;
}

export default GetListCategory;
