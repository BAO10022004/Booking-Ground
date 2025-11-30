
class Category {
//////////////////////////////////// Properties ////////////////////////////////////
  readonly categoryId: string; 
  name: string; 

//////////////////////////////////// Constructor ////////////////////////////////////
  constructor({
    categoryId,
    name,
  }: {
    categoryId: string;
    name: string;
  }) {
    this.categoryId = categoryId; 
    this.name = name;
  }
}

export default Category;