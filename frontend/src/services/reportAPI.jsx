import API from "./api";

// Daily reports
export const getDailyReports = () => API.get("/reports/daily");

// Weekly reports
export const getWeeklyReports = () => API.get("/reports/weekly");

// Monthly reports
export const getMonthlyReports = () => API.get("/reports/monthly");
