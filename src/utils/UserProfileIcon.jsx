const UserProfileIcon = ({ user }) => {
    const initial = user?.name?.charAt(0).toUpperCase() || "?";

    return (
        <div className="flex flex-col gap-1 items-center justify-center">
            {/* Profile icon */}
            <div
                className="flex items-center justify-center text-md w-6 h-6 md:w-16 md:h-16 rounded-full bg-orange-500 text-white font-bold md:text-4xl"
                title={user?.name || "Unknown User"}
            >
                {initial}
            </div>
            {/* User's full name */}
            <span className="flex items-center dark:text-white">
                <p className="text-[10px]  mb-0 pb-0">Hey👋</p>
                <h3 className="text-[12px] md:text-sm md:font-medium mb-0 pb-0">{user?.name}</h3>
            </span>
        </div>
    );
};

export default UserProfileIcon
