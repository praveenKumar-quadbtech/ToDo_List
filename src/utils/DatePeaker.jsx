import { useState, useRef } from "react";
import { CiCalendar } from "react-icons/ci";

const DueDatePicker = () => {
    const [dueDate, setDueDate] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dateInputRef = useRef(null);

    const handleButtonClick = () => {
        setShowDatePicker(true); // Show the date picker container
        setTimeout(() => {
            if (dateInputRef.current) {
                dateInputRef.current.showPicker(); // Open the calendar immediately
            }
        }, 100); // Delay slightly to ensure visibility
    };

    return (
        <div className="relative">
            {/* Button to trigger the date picker */}
            <button
                className="flex gap-2 items-center px-2 py-2 border-b-2 w-full"
                onClick={handleButtonClick}
            >
                <CiCalendar className="size-4 font-bold" />
                {dueDate ? dueDate : "Add Due Date"}
            </button>

            {/* Date Input positioned inside the sidebar */}
            {showDatePicker && (
                <div className="absolute left-0 top-full mt-1 bg-white border rounded-md shadow-md p-2 z-50">
                    <input
                        type="date"
                        ref={dateInputRef}
                        value={dueDate}
                        onChange={(e) => {
                            setDueDate(e.target.value);
                            setShowDatePicker(false); // Hide picker after selection
                        }}
                        className="p-2 border rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default DueDatePicker;
