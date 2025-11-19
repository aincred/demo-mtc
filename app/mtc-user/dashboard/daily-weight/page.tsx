"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CalendarIcon, Search, Pencil, Home } from "lucide-react"; // Removed Save and X imports
import toast, { Toaster } from "react-hot-toast";

interface Child {
  id: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  dateOfBirth: string;
  admissionWeight: string;
  admissionHeight: string;
  createdAt: string;
}

interface WeightEntry {
  childId: string;
  day0: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
}

export default function DailyWeightEntryPage() {
  const router = useRouter();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [weightEntries, setWeightEntries] = useState<{ [key: string]: WeightEntry }>({});
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Load children data from localStorage on component mount
  useEffect(() => {
    const storedChildren = localStorage.getItem('registeredChildren');
    if (storedChildren) {
      const parsedChildren = JSON.parse(storedChildren);
      setChildren(parsedChildren);
      setFilteredChildren(parsedChildren);
      
      // Initialize weight entries if they exist in localStorage
      const storedWeights = localStorage.getItem('weightEntries');
      if (storedWeights) {
        setWeightEntries(JSON.parse(storedWeights));
      } else {
        // Initialize empty weight entries for all children
        const initialWeights: { [key: string]: WeightEntry } = {};
        parsedChildren.forEach((child: Child) => {
          initialWeights[child.id] = {
            childId: child.id,
            day0: child.admissionWeight,
            day1: "",
            day2: "",
            day3: "",
            day4: "",
            day5: "",
            day6: ""
          };
        });
        setWeightEntries(initialWeights);
      }
    }
  }, []);

  // Filter children based on search criteria
  useEffect(() => {
    let filtered = [...children];
    
    if (recordNo) {
      filtered = filtered.filter(child => 
        child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
      );
    }
    
    if (samNumber) {
      filtered = filtered.filter(child => 
        child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
      );
    }
    
    if (childName) {
      filtered = filtered.filter(child => 
        child.childName.toLowerCase().includes(childName.toLowerCase())
      );
    }
    
    if (fromDate) {
      filtered = filtered.filter(child => {
        const childDate = new Date(child.createdAt);
        const filterDate = new Date(fromDate);
        return childDate >= filterDate;
      });
    }
    
    if (toDate) {
      filtered = filtered.filter(child => {
        const childDate = new Date(child.createdAt);
        const filterDate = new Date(toDate);
        filterDate.setHours(23, 59, 59, 999); // Include the entire day
        return childDate <= filterDate;
      });
    }
    
    setFilteredChildren(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [children, recordNo, samNumber, childName, fromDate, toDate]);

  const handleSearch = () => {
    toast.success("Search applied successfully!");
  };

  // Redirect to Home page
  const handleBackToHome = () => {
    router.push("/mtc-user/dashboard/home");
  };

  // Navigate to edit page for a child
  const handleEdit = (childId: string) => {
    router.push(`/mtc-user/dashboard/daily-weight/edit-weight/${childId}`);
  };

  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredChildren.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredChildren.length / entriesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Daily Weight Entry
          </h1>
          <Button
            onClick={handleBackToHome}
            variant="outline"
            className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
          >
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Button>
        </div>

        {/* Filters Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="pr-8 sm:pr-10 text-xs sm:text-sm"
                  />
                  <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="pr-8 sm:pr-10 text-xs sm:text-sm"
                  />
                  <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Record No
                </label>
                <Input
                  placeholder="Enter Record No"
                  value={recordNo}
                  onChange={(e) => setRecordNo(e.target.value)}
                  className="text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  SAM Number
                </label>
                <Input
                  placeholder="Enter SAM Number"
                  value={samNumber}
                  onChange={(e) => setSamNumber(e.target.value)}
                  className="text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Child Name
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Child Name"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="text-xs sm:text-sm"
                  />
                  <Button
                    onClick={handleSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3"
                  >
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              List of Children Currently Admitted
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">Show</span>
              <select 
                value={entriesPerPage} 
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-xs sm:text-sm text-gray-600">entries</span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 0</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 1</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 2</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 3</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 4</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 5</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Day 6</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.length > 0 ? (
                    currentEntries.map((child) => (
                      <tr
                        key={child.id}
                        className="hover:bg-indigo-50 transition"
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
                        
                        {/* Day 0 - Day 6 Weight Entries - Display only */}
                        {["day0", "day1", "day2", "day3", "day4", "day5", "day6"].map((day) => (
                          <td key={day} className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                            <span>{weightEntries[child.id]?.[day as keyof WeightEntry] || "-"}</span>
                          </td>
                        ))}
                        
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 p-1 sm:p-2"
                            onClick={() => handleEdit(child.id)}
                          >
                            <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                          </div>
                          <p className="font-medium">No children found</p>
                          <p className="mt-1">Please adjust your search criteria or register new children</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {filteredChildren.length > entriesPerPage && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs sm:text-sm text-gray-600">
                  Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredChildren.length)} of {filteredChildren.length} entries
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-xs"
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(i + 1)}
                      className="text-xs"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-xs"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}