"use client";

import { useState, useEffect, useCallback } from "react"; // Added useCallback import
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CalendarIcon, Home, Save, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface BedOccupancyRecord {
  id: string;
  date: string;
  year: number;
  month: number;
  day: number;
  bedSanctioned: number;
  utilizedBed: number;
  bedOccupancyPercentage: number;
  createdAt: string;
}

interface MonthlyData {
  month: string;
  occupancy: number;
}

export default function BedOccupancyPage() {
  const router = useRouter();
  
  // Form state
  const [date, setDate] = useState("");
  const [bedSanctioned, setBedSanctioned] = useState("");
  const [utilizedBed, setUtilizedBed] = useState("");
  const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  
  // Data state
  const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
  const [dailyData, setDailyData] = useState<number[][]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Memoized generateTableData function
  const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
    // Initialize daily data array (31 days x 12 months)
    const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
    // Initialize monthly data array
    const newMonthlyData: MonthlyData[] = [
      { month: "January", occupancy: 0 },
      { month: "February", occupancy: 0 },
      { month: "March", occupancy: 0 },
      { month: "April", occupancy: 0 },
      { month: "May", occupancy: 0 },
      { month: "June", occupancy: 0 },
      { month: "July", occupancy: 0 },
      { month: "August", occupancy: 0 },
      { month: "September", occupancy: 0 },
      { month: "October", occupancy: 0 },
      { month: "November", occupancy: 0 },
      { month: "December", occupancy: 0 }
    ];
    
    // Filter records for the selected year
    const yearRecords = allRecords.filter(record => record.year === parseInt(year));
    
    // Populate daily data and calculate monthly totals
    yearRecords.forEach(record => {
      const dayIndex = record.day - 1;
      const monthIndex = record.month - 1;
      
      if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
        newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
        newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
      }
    });
    
    // Calculate monthly averages
    newMonthlyData.forEach((monthData, monthIndex) => {
      const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
      const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
      if (monthRecords.length > 0) {
        monthData.occupancy = monthData.occupancy / daysInMonth;
      }
    });
    
    setDailyData(newDailyData);
    setMonthlyData(newMonthlyData);
  }, []); // Empty dependency array since this function doesn't depend on any external values
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const storedRecords = localStorage.getItem('bedOccupancyRecords');
    if (storedRecords) {
      const parsedRecords = JSON.parse(storedRecords);
      setRecords(parsedRecords);
      generateTableData(parsedRecords, selectedYear);
    } else {
      // Initialize with empty arrays when no data exists
      setRecords([]);
      setDailyData([]);
      setMonthlyData([]);
    }
  }, [selectedYear, generateTableData]); // Added generateTableData to dependencies
  
  // Update table data when year changes
  useEffect(() => {
    generateTableData(records, selectedYear);
  }, [selectedYear, records, generateTableData]); // Added generateTableData to dependencies
  
  // Calculate bed occupancy percentage when inputs change
  useEffect(() => {
    if (bedSanctioned && utilizedBed) {
      const percentage = (parseFloat(utilizedBed) / parseFloat(bedSanctioned)) * 100;
      setBedOccupancyPercentage(percentage.toFixed(2));
    } else {
      setBedOccupancyPercentage("");
    }
  }, [bedSanctioned, utilizedBed]);
  
  // Extract year, month, day from date
  useEffect(() => {
    if (date) {
      const dateObj = new Date(date);
      setYear(dateObj.getFullYear().toString());
      setMonth((dateObj.getMonth() + 1).toString());
      setDay(dateObj.getDate().toString());
    } else {
      setYear("");
      setMonth("");
      setDay("");
    }
  }, [date]);
  
  const handleSave = () => {
    // Validate form
    if (!date || !bedSanctioned || !utilizedBed) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Create new record
    const newRecord: BedOccupancyRecord = {
      id: editingId || Date.now().toString(),
      date,
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      bedSanctioned: parseFloat(bedSanctioned),
      utilizedBed: parseFloat(utilizedBed),
      bedOccupancyPercentage: parseFloat(bedOccupancyPercentage),
      createdAt: new Date().toISOString()
    };
    
    // Update records
    let updatedRecords;
    if (editingId) {
      // Update existing record
      updatedRecords = records.map(record => 
        record.id === editingId ? newRecord : record
      );
      setEditingId(null);
    } else {
      // Add new record
      updatedRecords = [...records, newRecord];
    }
    
    // Save to localStorage
    localStorage.setItem('bedOccupancyRecords', JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
    
    // Reset form
    handleClear();
    
    toast.success(editingId ? "Record updated successfully!" : "Record saved successfully!");
  };
  
  const handleClear = () => {
    setDate("");
    setBedSanctioned("");
    setUtilizedBed("");
    setBedOccupancyPercentage("");
    setYear("");
    setMonth("");
    setDay("");
    setEditingId(null);
  };
  
  const handleDelete = () => {
    if (!editingId) {
      toast.error("No record selected for deletion");
      return;
    }
    
    // Show confirmation dialog
    toast((t) => (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <p className="text-lg font-medium mb-4">Are you sure you want to delete this record?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Delete the record
              const updatedRecords = records.filter(record => record.id !== editingId);
              localStorage.setItem('bedOccupancyRecords', JSON.stringify(updatedRecords));
              setRecords(updatedRecords);
              setEditingId(null);
              handleClear();
              toast.dismiss(t.id);
              toast.success("Record deleted successfully!");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: "top-center",
    });
  };
  
  const handleEdit = (record: BedOccupancyRecord) => {
    setDate(record.date);
    setBedSanctioned(record.bedSanctioned.toString());
    setUtilizedBed(record.utilizedBed.toString());
    setEditingId(record.id);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
  };
  
  // Generate year options (current year and 10 years before)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i).map(year => year.toString());
  
  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Bed Occupancy Management
          </h1>
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={() => router.push("/mtc-user/dashboard/home")}
              variant="outline"
              className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
            >
              <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </div>
        </div>
        
        {/* Form Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
              Daily Bed Occupancy Entry
            </h2>
          </CardHeader>
          
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pr-8 sm:pr-10"
                  />
                  <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed Sanctioned
                </label>
                <select
                  value={bedSanctioned}
                  onChange={(e) => setBedSanctioned(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Utilized Bed
                </label>
                <Input
                  type="number"
                  value={utilizedBed}
                  onChange={(e) => setUtilizedBed(e.target.value)}
                  maxLength={5}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed Occupancy %
                </label>
                <Input
                  value={bedOccupancyPercentage}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
              {editingId && (
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              )}
              <Button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-gray-600 text-gray-700 hover:bg-gray-100"
              >
                <X className="mr-2 h-4 w-4" /> Clear
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Table Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
              Daily Bed Occupancy Table
            </h2>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Year</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold"></th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
                    <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.length > 0 ? (
                    dailyData.map((row, dayIndex) => (
                      <tr key={dayIndex} className={dayIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <th className="py-2 px-2 sm:px-4 font-medium">Day {dayIndex + 1}</th>
                        {row.map((value, monthIndex) => (
                          <td 
                            key={monthIndex} 
                            className="py-2 px-2 sm:px-4 cursor-pointer hover:bg-indigo-50"
                            onClick={() => {
                              if (value > 0) {
                                // Find the record for this day and month
                                const record = records.find(r => 
                                  r.year === parseInt(selectedYear) && 
                                  r.month === monthIndex + 1 && 
                                  r.day === dayIndex + 1
                                );
                                if (record) {
                                  handleEdit(record);
                                }
                              }
                            }}
                          >
                            {value > 0 ? `${value.toFixed(2)}` : ""}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={13} className="py-8 text-center text-gray-500">
                        No data available for the selected year
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: "rgb(11,145,140)" }}>
                Monthly Bed Occupancy Table
              </h3>
              <div className="font-medium mb-2">Year: {selectedYear}</div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">Month</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <th className="py-2 px-2 sm:px-4 font-medium">Bed Occupancy%</th>
                      {monthlyData.map((data, index) => (
                        <td key={index} className="py-2 px-2 sm:px-4">
                          {data.occupancy > 0 ? data.occupancy.toFixed(2) : ""}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}