import { useEffect, useState } from "react";

const SetReminder = ({ isOpen, setIsOpen, deadline, handelChange }) => {
    const [reminderTime, setReminderTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0
    });
    const [remainingTime, setRemainingTime] = useState(0);
    const [reminder, setReminder] = useState(null);

    console.log("reminderTime", reminderTime);
    console.log("remainingTime", remainingTime);
    
    const current = new Date();
    const dueDate = new Date(deadline);
    console.log(dueDate,dueDate);
    

    const totalRemainingMinutes = Math.floor(remainingTime / (1000 * 60));

    
    const remainingDays = Math.floor(totalRemainingMinutes / (60 * 24));
    const remainingHours = Math.floor((totalRemainingMinutes % (60 * 24)) / 60);
    const remainingMinutes = totalRemainingMinutes % 60;

    console.log("remainingDays", remainingDays);
    console.log("remainingHours", remainingHours);
    console.log("remainingMinutes", remainingMinutes);
    

    useEffect(() => {
        setRemainingTime(dueDate - current);
    }, [deadline]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = Math.max(0, parseInt(value, 10) || 0);

        setReminderTime((prev) => {
            const updatedTime = { ...prev, [name]: parsedValue };

            const totalMillis =
                (updatedTime.days * 24 * 60 * 60 * 1000) +
                (updatedTime.hours * 60 * 60 * 1000) +
                (updatedTime.minutes * 60 * 1000);

            setRemainingTime((dueDate - current) - totalMillis);

            return updatedTime;
        });
    };


    const calculateReminder = () => {
        if (!deadline || remainingTime <= 0) return;

        // Create new reminder date
        const reminderDate = new Date(dueDate);
        reminderDate.setMinutes(reminderDate.getMinutes() - reminderTime.minutes);
        reminderDate.setHours(reminderDate.getHours() - reminderTime.hours);
        reminderDate.setDate(reminderDate.getDate() - reminderTime.days);

        setReminder(reminderDate.toLocaleString());
        const ISOFormat = reminderDate.toISOString();

        console.log("Reminder Time (ISO Format):", ISOFormat);
        handelChange({ target: { name: "reminders", value: ISOFormat } });
    };

    return (
        <div className="relative w-full md:w-3/4 md:m-auto p-3 border rounded-md bg-white dark:bg-[#2c2c2c] shadow-md">
            <div className="flex justify-between gap-2 my-1">
                {/* Days Input */}
                <div className="flex flex-col w-1/3 gap-1">
                    <label className="text-sm text-gray-700 dark:text-gray-200">Days</label>
                    <input
                        type="number"
                        value={reminderTime.days}
                        name="days"
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded-md bg-white dark:bg-[#232323] dark:text-gray-200"
                        min="0"
                    
                    />
                </div>

                {/* Hours Input */}
                <div className="flex flex-col w-1/3 gap-1">
                    <label className="text-sm text-gray-700 dark:text-gray-200">Hours</label>
                    <input
                        type="number"
                        value={reminderTime.hours}
                        name="hours"
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded-md bg-white dark:bg-[#232323] dark:text-gray-200"
                        min="0"
                        max="23"
                    />
                </div>

                {/* Minutes Input */}
                <div className="flex flex-col w-1/3 gap-1">
                    <label className="text-sm text-gray-700 dark:text-gray-200">Minutes</label>
                    <input
                        type="number"
                        value={reminderTime.minutes}
                        name="minutes"
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded-md bg-white dark:bg-[#232323] text-gray-700 dark:text-gray-200"
                        min="0"
                        max="59"
                    />
                </div>
            </div>

            <p>Before DueDate</p>
            <button
                onClick={() => {
                    setIsOpen(false);
                    calculateReminder();
                }}
                className="w-full mt-3 p-2 bg-[#357136] font-bold text-white rounded-md"
            >
                Set Reminder
            </button>
        </div>
    );
};

export default SetReminder;
