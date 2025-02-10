const UserProfileIcon = ({ user }) => {
    const initial = user?.name?.charAt(0).toUpperCase() || "?";

    return (
        <div className="flex gap-1 items-center">
            {/* Profile icon */}
            <div
                className="flex items-center justify-center text-sm w-4 h-4 md:w-8 md:h-8 rounded-full bg-blue-500 text-white font-bold md:text-lg"
                title={user?.name || "Unknown User"}
            >
                {initial}
            </div>
            {/* User's full name */}
            <span className="flex items-center">
                <p className="text-[10px] mb-0 pb-0">Hey👋</p>
                <h3 className="text-[12px] md:text-sm md:font-medium mb-0 pb-0">{user?.name}</h3>
            </span>
        </div>
    );
};

export default UserProfileIcon
