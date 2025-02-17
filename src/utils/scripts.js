export const togleSearchInput = (isSearch, setisSearch) => {
  setisSearch(!isSearch);
};

export const formatDateTime = (date) => {

  
   let newDate = new Date(date)
    const formattedDate = newDate.toLocaleDateString("en-GB").replace(/\//g, "/"); // dd/mm/yy
    const formattedTime = newDate.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false 
    }); // hh:mm (24-hour format)
    
    return `${formattedDate} ${formattedTime}`;
};

