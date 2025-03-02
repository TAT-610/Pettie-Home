import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { addCategory, getAllCategories, updateCategory, deleteCategory } from "../services/category/apiCategory";

type Category = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "", isActive: true });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách danh mục:", error);
    }
  };

  const handleAddOrEditCategory = async () => {
    if (!newCategory.name.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, newCategory);
      } else {
        await addCategory(newCategory);
      }
      setShowModal(false);
      setNewCategory({ name: "", description: "", isActive: true });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi thêm hoặc chỉnh sửa danh mục:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại!");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      alert("Xóa danh mục thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-[#EDF2F9] min-h-screen overflow-auto relative">
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold text-xl text-gray-600 mr-10">Quản lý danh mục</span>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Tìm kiếm danh mục..." className="pl-10 py-3 text-sm rounded-full w-full border border-gray-300 focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <button className="px-4 py-2 bg-[#ed7c44] text-white rounded-md flex items-center space-x-2" onClick={() => setShowModal(true)}>
          <FaPlus /> <span>Thêm danh mục</span>
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg my-5 mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên danh mục</th>
              <th className="px-4 py-3">Mô tả</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="bg-white border-b">
                <td className="px-4 py-3">{category.id}</td>
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3">{category.description || "Không có mô tả"}</td>
                <td className="px-4 py-3 flex justify-center space-x-3">
                  <button className="text-blue-500" onClick={() => {
                    setEditingCategory(category);
                    setNewCategory({ name: category.name, description: category.description, isActive: category.isActive });
                    setShowModal(true);
                  }}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500" onClick={() => handleDeleteCategory(category.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
            <input type="text" placeholder="Tên danh mục" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-3" />
            <textarea placeholder="Mô tả" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-3" />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2" onClick={() => { setShowModal(false); setEditingCategory(null); }}>Hủy</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddOrEditCategory}>{editingCategory ? "Lưu" : "Thêm"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
