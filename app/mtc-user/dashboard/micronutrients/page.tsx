"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Type definitions
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

interface SearchFilters {
  fromDate: string;
  toDate: string;
  childName: string;
  samNumber: string;
  recordId: string;
}

export default function AntibioticsMicronutrientsPage() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [filters, setFilters] = useState<SearchFilters>({
    fromDate: "",
    toDate: "",
    childName: "",
    samNumber: "",
    recordId: ""
  });

  // Load children data from localStorage
  useEffect(() => {
    const loadChildren = () => {
      try {
        const storedChildren = localStorage.getItem('registeredChildren');
        if (storedChildren) {
          const parsedChildren: Child[] = JSON.parse(storedChildren);
          setChildren(parsedChildren);
          setFilteredChildren(parsedChildren);
        }
      } catch (error) {
        console.error("Error loading children data:", error);
        toast.error("Failed to load children data");
      } finally {
        setLoading(false);
      }
    };

    loadChildren();
  }, []);

  // Handle filter changes
  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    setSearching(true);
    
    setTimeout(() => {
      let filtered = [...children];
      
      if (filters.childName) {
        filtered = filtered.filter(child => 
          child.childName.toLowerCase().includes(filters.childName.toLowerCase())
        );
      }
      
      if (filters.samNumber) {
        filtered = filtered.filter(child => 
          child.samNumber.toLowerCase().includes(filters.samNumber.toLowerCase())
        );
      }
      
      if (filters.recordId) {
        filtered = filtered.filter(child => 
          child.recordNo.includes(filters.recordId)
        );
      }
      
      // Date filters would need more complex logic with date parsing
      // For simplicity, we're not implementing them in this example
      
      setFilteredChildren(filtered);
      setCurrentPage(1); // Reset to first page after filtering
      setSearching(false);
      toast.success(`Found ${filtered.length} matching records`);
    }, 500);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      childName: "",
      samNumber: "",
      recordId: ""
    });
    setFilteredChildren(children);
    setCurrentPage(1);
  };

  // Navigate to edit page
  const handleEdit = (childId: string) => {
    router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Antibiotics and Micronutrients Entry
          </h1>
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

        {/* Search Filters */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Search Filters
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                    className="text-xs sm:text-sm pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => handleFilterChange("toDate", e.target.value)}
                    className="text-xs sm:text-sm pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Child Name
                </label>
                <Input
                  value={filters.childName}
                  onChange={(e) => handleFilterChange("childName", e.target.value)}
                  placeholder="Enter child name"
                  className="text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  SAM Number
                </label>
                <Input
                  value={filters.samNumber}
                  onChange={(e) => handleFilterChange("samNumber", e.target.value)}
                  placeholder="Enter SAM number"
                  className="text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Record ID
                </label>
                <Input
                  value={filters.recordId}
                  onChange={(e) => handleFilterChange("recordId", e.target.value)}
                  placeholder="Enter record ID"
                  className="text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-end gap-2">
                <Button
                  onClick={applyFilters}
                  disabled={searching}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                >
                  {searching ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-1 h-3 w-3" />
                      Search
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="border-gray-600 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Select a child to update Antibiotics and Micronutrients details
            </h2>
          </CardHeader>
          <CardContent>
            {filteredChildren.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No children found matching your criteria.</p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="mt-4 border-gray-600 text-gray-700 hover:bg-gray-100"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Parent Name</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Date Of Birth</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Admission Weight(kg)</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Admission Height(cm)</th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((child, index) => (
                        <tr
                          key={child.id}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                        >
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{child.parentName}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{child.dateOfBirth}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{child.admissionWeight}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{child.admissionHeight}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                            <Button
                              onClick={() => handleEdit(child.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                  <div className="text-xs sm:text-sm text-gray-700">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredChildren.length)} of {filteredChildren.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 mr-4">
                      <span className="text-xs sm:text-sm text-gray-700">Show</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span className="text-xs sm:text-sm text-gray-700">entries</span>
                    </div>
                    <div className="flex">
                      <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm p-1 sm:p-2"
                      >
                        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            className={`mx-1 text-xs sm:text-sm p-1 sm:p-2 ${
                              currentPage === pageNum
                                ? "bg-indigo-600 text-white"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm p-1 sm:p-2"
                      >
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}