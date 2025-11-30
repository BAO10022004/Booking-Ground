
import '../assets/styles/BottomContinueButton.css';

function BottomContinueButton({handleSubmit, selectedCells}: {handleSubmit: (selectedCells :Set<string>) => void, selectedCells: Set<string>  }) {
    return (
        <div className="booking-bottom-bar">
        <div className="booking-bottom-container">
          <button 
            className="booking-submit-btn" 
            onClick={() => handleSubmit(selectedCells)}
            disabled={selectedCells.size === 0}
          >
            TIẾP THEO {selectedCells.size > 0 && `(${selectedCells.size})`}
          </button>
        </div>
      </div>
    )
}
export default BottomContinueButton;