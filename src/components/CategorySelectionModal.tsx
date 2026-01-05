import { X, Check } from "lucide-react";
import ReactDOM from "react-dom";
import "../assets/styles/CategorySelectionModal.css";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string, categoryName: string) => void;
  sportName?: string;
}

export default function CategorySelectionModal({
  isOpen,
  onClose,
  categories,
  selectedCategoryId,
  onSelectCategory,
  sportName = "Cầu Lông",
}: CategorySelectionModalProps) {
  if (!isOpen) return null;

  const handleSelect = (categoryId: string, categoryName: string) => {
    onSelectCategory(categoryId, categoryName);
    onClose();
  };

  const modalContent = (
    <div className="category-modal-backdrop" onClick={onClose}>
      <div
        className="category-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="category-modal-close"
          aria-label="Đóng"
        >
          <X size={24} />
        </button>

        <div className="category-modal-header">
          <h2 className="category-modal-title">Chọn đối tượng áp dụng</h2>
        </div>

        <div className="category-modal-content">
          <div className="category-sport-label">{sportName}</div>
          <div className="category-options">
            <div
              onClick={() => handleSelect("student", "Học sinh")}
              className={`category-option ${
                selectedCategoryId === "student" ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelect("student", "Học sinh");
                }
              }}
            >
              <div className="category-option-content">
                <span className="category-option-name">Học sinh</span>
                {selectedCategoryId === "student" && (
                  <Check className="category-option-check" size={20} />
                )}
              </div>
            </div>
            <div
              onClick={() => handleSelect("adult", "Người lớn")}
              className={`category-option ${
                selectedCategoryId === "adult" ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelect("adult", "Người lớn");
                }
              }}
            >
              <div className="category-option-content">
                <span className="category-option-name">Người lớn</span>
                {selectedCategoryId === "adult" && (
                  <Check className="category-option-check" size={20} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="category-modal-footer">
          <button
            className="category-continue-btn"
            onClick={() => {
              if (selectedCategoryId) {
                const category = categories.find(
                  (c) => c.id === selectedCategoryId
                );
                if (category) {
                  handleSelect(category.id, category.name);
                }
              }
            }}
            disabled={!selectedCategoryId}
          >
            TIẾP TỤC
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
