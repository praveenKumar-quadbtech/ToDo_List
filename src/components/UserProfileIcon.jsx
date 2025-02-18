const UserProfileIcon = ({ user }) => {
    const initial = user?.name?.charAt(0).toUpperCase() || "?";

    let name = user?.name
    if (name.length > 15) {
        name = name.split(" ")
        name = name[0] + " " + name[1]
    }
    return (
        <div className="flex md:flex-col md:gap-1 items-center justify-center">
            {/* Profile icon */}
            <div
                className="flex items-center justify-center text-sm w-6 h-6 md:w-16 md:h-16 rounded-full bg-orange-500 text-white font-bold md:text-4xl"
                title={user?.name || "Unknown User"}
            >
                {initial}
            </div>
            {/* User's full name */}
            <span className="hidden md:flex items-center dark:text-white text-[11px]">
                <p className="text-[11px] mb-0 pb-0">Hey👋</p>
                <h3 className="text-[10px] md:text-sm md:font-medium mb-0 pb-0">{name}</h3>
            </span>
        </div>
    );
};

export default UserProfileIcon
