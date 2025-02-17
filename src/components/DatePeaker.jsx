import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ".././index.css";
import { formatDateTime } from "../utils/scripts";

const MyDatePicker = ({ deadline, handleChange }) => {
    const [selectedDate, setSelectedDate] = useState(deadline ?? null);
    const [error, setError] = useState("");
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setError(""); 

        const deadline = new Date(date).toISOString()
        handleChange({ target: { name: "deadline" , value : deadline}});
    };


    return (
        <div className="flex flex-col gap-2 px-3 py-2 justify-start border-b-[0.5px] border-black dark:border-green-100">
            <button className="flex gap-2 items-center">
                <CiCalendar className="size-4 font-bold" />
                {selectedDate ? `Due Date  : ${formatDateTime(selectedDate)}` : "Add Due Date  :  No Due Date"}
            </button>
            <div className="flex justify-center">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className=""
                    inline
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="Time"
                    filterTime={(time) => {
                        return time > new Date(); 
                    }}
                />

            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default MyDatePicker;
