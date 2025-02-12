import { useState, useRef, useEffect } from "react";
import { CiCalendar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../redux/slices/sideBarSlice";

const DueDatePicker = () => {
    const [dueDate, setDueDate] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dateInputRef = useRef(null);
    const { formData } = useSelector(state => state.sidebar)
    const dispatch = useDispatch()

    const handleButtonClick = () => {
        setShowDatePicker(true);
        setTimeout(() => {
            if (dateInputRef.current) {
                dateInputRef.current.showPicker();
            }
        }, 100);
    };

    
    return (
        <div className="relative">
            {/* Button to trigger the date picker */}
            <button
                className="flex gap-2 items-center px-2 py-2 border-b-[0.5px] border-green-100 w-full"
                onClick={handleButtonClick}
            >
                <CiCalendar className="size-4 font-bold" />
                {formData.deadline ? formData.deadline : "Add Due Date"}
            </button>

            {/* Date Input positioned inside the sidebar */}
            {showDatePicker && (
                <div className="absolute left-0 top-full mt-1 bg-white border rounded-md shadow-md p-2 z-50">
                    <input
                        type="date"
                        ref={dateInputRef}
                        value={formData.deadline}
                        onChange={(e) => {
                            dispatch(setFormData({ ...formData, deadline: e.target.value }));
                            setShowDatePicker(false); 
                        }}
                        className="p-2 border rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default DueDatePicker;
