// // app/mtc-user/dashboard/antibiotics-micronutrients/edit/[id]/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Home, Save, X, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // Type definitions
// interface Child {
//   id: string;
//   recordNo: string;
//   samNumber: string;
//   childName: string;
//   parentName: string;
//   dateOfBirth: string;
//   admissionWeight: string;
//   admissionHeight: string;
//   createdAt: string;
// }

// interface TreatmentEntry {
//   treatmentId: number;
//   childName: string;
//   samNumber: string;
//   createdBy: number;
//   createdDate: string;
//   recordId: number;
//   sectionId: number;
//   day0: number;
//   day1: number;
//   day2: number;
//   day3: number;
//   day4: number;
//   day5: number;
//   day6: number;
//   day7: number;
//   day8: number;
//   day9: number;
//   day10: number;
//   day11: number;
//   day12: number;
//   day13: number;
//   day14: number;
//   day15: number;
//   day16: number;
//   day17: number;
//   day18: number;
//   day19: number;
//   day20: number;
//   day21: number;
//   day22: number;
//   day23: number;
//   day24: number;
//   day25: number;
//   day26: number;
//   day27: number;
//   day28: number;
//   day29: number;
//   otherRoutine?: string;
//   result?: string;
//   others?: string;
// }

// interface LabTestEntry {
//   treatmentId: number;
//   childName: string;
//   samNumber: string;
//   createdBy: number;
//   createdDate: string;
//   recordId: number;
//   sectionId: number;
//   day0: number;
//   result?: string;
//   others?: string;
// }

// interface MicronutrientsData {
//   childId: string;
//   routineTreatments: TreatmentEntry[];
//   labTests: LabTestEntry[];
// }

// // Treatment names for routine section
// const TREATMENT_NAMES = [
//   "Deworming(Albendazole)",
//   "Zinc Syrup (ml)",
//   "Magsulph (ml)",
//   "Potchlor (ml)",
//   "Folic Acid (mg)",
//   "Anti-Malarial",
//   "Iron Syrup (ml)",
//   "Vit A........iu",
//   "Amoxicillin/Antibiotic",
//   "Multivitamin (ml)",
//   "Other Medicine"
// ];

// // Lab test names
// const LAB_TEST_NAMES = [
//   "Haemoglobin (gm/dl)",
//   "Other Tests (For repeated tests)",
//   "TB Test",
//   "Urine Test",
//   "TC/DC of WBC",
//   "Chest X-ray",
//   "Malaria Test",
//   "Blood Sugar"
// ];

// // Section IDs mapping
// const SECTION_IDS = {
//   routine: [5, 6, 7, 8, 2, 4, 9, 1, 3, 10, 19],
//   lab: [11, 18, 13, 14, 15, 16, 12, 17]
// };

// export default function EditMicronutrientsPage({ 
//   params 
// }: { 
//   params: Promise<{ id: string }> 
// }) {
//   const router = useRouter();
//   const [childId, setChildId] = useState<string>("");
//   const [child, setChild] = useState<Child | null>(null);
//   const [routineTreatments, setRoutineTreatments] = useState<TreatmentEntry[]>([]);
//   const [labTests, setLabTests] = useState<LabTestEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Resolve params
//   useEffect(() => {
//     const resolveParams = async () => {
//       const resolvedParams = await params;
//       setChildId(resolvedParams.id);
//     };
//     resolveParams();
//   }, [params]);

//   // Load child data and treatment data when childId is available
//   useEffect(() => {
//     if (!childId) return;

//     // Load child data from localStorage
//     const loadChildData = () => {
//       try {
//         const storedChildren = localStorage.getItem('registeredChildren');
//         if (storedChildren) {
//           const parsedChildren: Child[] = JSON.parse(storedChildren);
//           const foundChild = parsedChildren.find((c: Child) => c.id === childId);
          
//           if (foundChild) {
//             setChild(foundChild);
            
//             // Check if micronutrients data already exists for this child
//             const existingData = localStorage.getItem('micronutrientsData');
//             if (existingData) {
//               const allData: MicronutrientsData[] = JSON.parse(existingData);
//               const childData = allData.find((item: MicronutrientsData) => item.childId === childId);
              
//               if (childData) {
//                 setRoutineTreatments(childData.routineTreatments);
//                 setLabTests(childData.labTests);
//                 setLoading(false);
//                 return;
//               }
//             }
            
//             // Initialize routine treatments
//             const initialRoutineTreatments: TreatmentEntry[] = TREATMENT_NAMES.map((name, index) => ({
//               treatmentId: 0,
//               childName: foundChild.childName,
//               samNumber: foundChild.samNumber,
//               createdBy: 0,
//               createdDate: new Date().toISOString(),
//               recordId: 556653,
//               sectionId: SECTION_IDS.routine[index],
//               day0: 0,
//               day1: 0,
//               day2: 0,
//               day3: 0,
//               day4: 0,
//               day5: 0,
//               day6: 0,
//               day7: index === 8 ? 1 : 0, // Amoxicillin starts from day 7
//               day8: index === 8 ? 1 : 0,
//               day9: index === 8 ? 1 : 0,
//               day10: index === 8 ? 1 : 0,
//               day11: index === 8 ? 1 : 0,
//               day12: index === 8 ? 1 : 0,
//               day13: index === 8 ? 1 : 0,
//               day14: index === 8 ? 1 : 0,
//               day15: index === 8 ? 1 : 0,
//               day16: index === 8 ? 1 : 0,
//               day17: index === 8 ? 1 : 0,
//               day18: index === 8 ? 1 : 0,
//               day19: index === 8 ? 1 : 0,
//               day20: index === 8 ? 1 : 0,
//               day21: index === 8 ? 1 : 0,
//               day22: index === 8 ? 1 : 0,
//               day23: index === 8 ? 1 : 0,
//               day24: index === 8 ? 1 : 0,
//               day25: index === 8 ? 1 : 0,
//               day26: index === 8 ? 1 : 0,
//               day27: index === 8 ? 1 : 0,
//               day28: index === 8 ? 1 : 0,
//               day29: index === 8 ? 1 : 0,
//               otherRoutine: index === 10 ? "" : undefined,
//             }));
            
//             setRoutineTreatments(initialRoutineTreatments);
            
//             // Initialize lab tests
//             const initialLabTests: LabTestEntry[] = LAB_TEST_NAMES.map((name, index) => ({
//               treatmentId: 0,
//               childName: foundChild.childName,
//               samNumber: foundChild.samNumber,
//               createdBy: 0,
//               createdDate: new Date().toISOString(),
//               recordId: 556653,
//               sectionId: SECTION_IDS.lab[index],
//               day0: 0,
//               result: index === 7 ? "" : undefined,
//               others: index === 7 ? "" : undefined
//             }));
            
//             setLabTests(initialLabTests);
//           }
//         }
//       } catch (error) {
//         console.error("Error loading child data:", error);
//         toast.error("Failed to load child data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadChildData();
//   }, [childId]);

//   // Handle checkbox change for routine treatments
//   const handleCheckboxChange = (treatmentIndex: number, dayIndex: number) => {
//     setRoutineTreatments(prevTreatments => {
//       const updatedTreatments = [...prevTreatments];
//       const treatment = { ...updatedTreatments[treatmentIndex] };
      
//       // Create a type-safe way to update day property
//       const dayValues = [
//         treatment.day0, treatment.day1, treatment.day2, treatment.day3, treatment.day4, treatment.day5,
//         treatment.day6, treatment.day7, treatment.day8, treatment.day9, treatment.day10, treatment.day11,
//         treatment.day12, treatment.day13, treatment.day14, treatment.day15, treatment.day16, treatment.day17,
//         treatment.day18, treatment.day19, treatment.day20, treatment.day21, treatment.day22, treatment.day23,
//         treatment.day24, treatment.day25, treatment.day26, treatment.day27, treatment.day28, treatment.day29
//       ];
      
//       // Toggle value between 0 and 1
//       const newValue = dayValues[dayIndex] === 0 ? 1 : 0;
//       dayValues[dayIndex] = newValue;
      
//       // Update the treatment object with new values
//       treatment.day0 = dayValues[0];
//       treatment.day1 = dayValues[1];
//       treatment.day2 = dayValues[2];
//       treatment.day3 = dayValues[3];
//       treatment.day4 = dayValues[4];
//       treatment.day5 = dayValues[5];
//       treatment.day6 = dayValues[6];
//       treatment.day7 = dayValues[7];
//       treatment.day8 = dayValues[8];
//       treatment.day9 = dayValues[9];
//       treatment.day10 = dayValues[10];
//       treatment.day11 = dayValues[11];
//       treatment.day12 = dayValues[12];
//       treatment.day13 = dayValues[13];
//       treatment.day14 = dayValues[14];
//       treatment.day15 = dayValues[15];
//       treatment.day16 = dayValues[16];
//       treatment.day17 = dayValues[17];
//       treatment.day18 = dayValues[18];
//       treatment.day19 = dayValues[19];
//       treatment.day20 = dayValues[20];
//       treatment.day21 = dayValues[21];
//       treatment.day22 = dayValues[22];
//       treatment.day23 = dayValues[23];
//       treatment.day24 = dayValues[24];
//       treatment.day25 = dayValues[25];
//       treatment.day26 = dayValues[26];
//       treatment.day27 = dayValues[27];
//       treatment.day28 = dayValues[28];
//       treatment.day29 = dayValues[29];
      
//       updatedTreatments[treatmentIndex] = treatment;
//       return updatedTreatments;
//     });
//   };

//   // Handle dropdown change for lab tests
//   const handleLabTestStatusChange = (testIndex: number, value: string) => {
//     setLabTests(prevTests => {
//       const updatedTests = [...prevTests];
//       updatedTests[testIndex] = {
//         ...updatedTests[testIndex],
//         day0: parseInt(value)
//       };
      
//       // Clear result if status is not "Yes"
//       if (value !== "1") {
//         updatedTests[testIndex].result = "";
//       }
      
//       return updatedTests;
//     });
//   };

//   // Handle text input change for lab test results
//   const handleLabTestResultChange = (testIndex: number, value: string) => {
//     setLabTests(prevTests => {
//       const updatedTests = [...prevTests];
//       updatedTests[testIndex] = {
//         ...updatedTests[testIndex],
//         result: value
//       };
//       return updatedTests;
//     });
//   };

//   // Handle text input change for other medicine
//   const handleOtherMedicineChange = (value: string) => {
//     setRoutineTreatments(prevTreatments => {
//       const updatedTreatments = [...prevTreatments];
//       updatedTreatments[10] = {
//         ...updatedTreatments[10],
//         otherRoutine: value
//       };
//       return updatedTreatments;
//     });
//   };

//   // Handle text input change for chest x-ray
//   const handleChestXRayChange = (value: string) => {
//     setLabTests(prevTests => {
//       const updatedTests = [...prevTests];
//       updatedTests[7] = {
//         ...updatedTests[7],
//         others: value
//       };
//       return updatedTests;
//     });
//   };

//   // Save form data
//   const handleSave = async () => {
//     setSaving(true);
    
//     try {
//       // Save to localStorage
//       const micronutrientsData: MicronutrientsData = {
//         childId,
//         routineTreatments,
//         labTests
//       };
      
//       // Get existing data or create new array
//       const existingData = localStorage.getItem('micronutrientsData');
//       let allData: MicronutrientsData[] = existingData ? JSON.parse(existingData) : [];
      
//       // Find if data for this child already exists
//       const existingIndex = allData.findIndex((item: MicronutrientsData) => item.childId === childId);
      
//       if (existingIndex >= 0) {
//         // Update existing data
//         allData[existingIndex] = micronutrientsData;
//       } else {
//         // Add new data
//         allData.push(micronutrientsData);
//       }
      
//       localStorage.setItem('micronutrientsData', JSON.stringify(allData));
      
//       toast.success("Micronutrients & Antibiotics data saved successfully!");
      
//       // Navigate back to list page after a short delay
//       setTimeout(() => {
//         router.push("/mtc-user/dashboard/micronutrients");
//       }, 1500);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to save data");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Redirect to Home page
//   const handleBackToHome = () => {
//     router.push("/mtc-user/dashboard/home");
//   };

//   // Cancel and go back to list
//   const handleCancel = () => {
//     router.push("/mtc-user/dashboard/micronutrients");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//         <div className="text-center">
//           <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto" />
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!child) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg">Child not found</p>
//           <Button onClick={handleBackToHome} className="mt-4">
//             Back to Home
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
//             Micronutrients & Antibiotics
//           </h1>
//           <Button
//             onClick={handleBackToHome}
//             variant="outline"
//             className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
//           >
//             <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
//             <span className="hidden sm:inline">Back to Home</span>
//             <span className="sm:hidden">Home</span>
//           </Button>
//         </div>

//         {/* Child Information */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardContent className="pt-4 sm:pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-end">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   SAM Number
//                 </label>
//                 <Input
//                   value={child.samNumber}
//                   readOnly
//                   className="text-xs sm:text-sm bg-gray-50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Child Name
//                 </label>
//                 <Input
//                   value={child.childName}
//                   readOnly
//                   className="text-xs sm:text-sm bg-gray-50"
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Routine Treatment Section */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader className="pb-2 sm:pb-4">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               TO BE FILLED UP BY THE DOCTOR / PARAMEDICAL STAFF AS APPLICABLE
//             </h2>
//           </CardHeader>

//           <CardContent>
//             <div className="overflow-x-auto rounded-lg">
//               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
//                 <thead>
//                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Treatment</th>
//                     <th className="py-2 sm:py-3 px-1 sm:px-2 text-center font-semibold">Days</th>
//                     {Array.from({ length: 30 }, (_, i) => (
//                       <th key={i} className="py-2 sm:py-3 px-1 sm:px-2 text-center font-semibold">
//                         {i}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {routineTreatments.map((treatment, index) => (
//                     <tr
//                       key={index}
//                       className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
//                     >
//                       <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
//                         {TREATMENT_NAMES[index]}
//                       </td>
                      
//                       {/* Day 0 - Day 29 Checkboxes */}
//                       {Array.from({ length: 30 }, (_, dayIndex) => {
//                         // Get day value in a type-safe way
//                         const dayValues = [
//                           treatment.day0, treatment.day1, treatment.day2, treatment.day3, treatment.day4, treatment.day5,
//                           treatment.day6, treatment.day7, treatment.day8, treatment.day9, treatment.day10, treatment.day11,
//                           treatment.day12, treatment.day13, treatment.day14, treatment.day15, treatment.day16, treatment.day17,
//                           treatment.day18, treatment.day19, treatment.day20, treatment.day21, treatment.day22, treatment.day23,
//                           treatment.day24, treatment.day25, treatment.day26, treatment.day27, treatment.day28, treatment.day29
//                         ];
                        
//                         const isDisabled = index === 8 && dayIndex < 7; // Amoxicillin disabled for days 0-6
                        
//                         return (
//                           <td key={dayIndex} className="py-2 sm:py-3 px-1 sm:px-2 text-center">
//                             <input
//                               type="checkbox"
//                               className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 disabled:opacity-50"
//                               checked={dayValues[dayIndex] === 1}
//                               onChange={() => handleCheckboxChange(index, dayIndex)}
//                               disabled={isDisabled}
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))}
                  
//                   {/* Other Medicine Row */}
//                   <tr className="bg-white hover:bg-indigo-50 transition">
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
//                       Other Medicine
//                     </td>
//                     <td colSpan={30} className="py-2 sm:py-3 px-2 sm:px-4">
//                       <Input
//                         value={routineTreatments[10]?.otherRoutine || ""}
//                         onChange={(e) => handleOtherMedicineChange(e.target.value)}
//                         placeholder="Enter other medicine details"
//                         className="text-xs sm:text-sm"
//                       />
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Laboratory Tests Section */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader className="pb-2 sm:pb-4">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               TO BE FILLED UP BY THE DOCTOR / PARAMEDICAL STAFF AS APPLICABLE
//             </h2>
//           </CardHeader>

//           <CardContent>
//             <div className="overflow-x-auto rounded-lg">
//               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
//                 <thead>
//                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Test Name</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Test Conducted Status</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Value/Result</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {labTests.map((test, index) => (
//                     <tr
//                       key={index}
//                       className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
//                     >
//                       <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
//                         {LAB_TEST_NAMES[index]}
//                       </td>
                      
//                       {index < 7 ? (
//                         <>
//                           <td className="py-2 sm:py-3 px-2 sm:px-4">
//                             <select
//                               className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                               value={test.day0}
//                               onChange={(e) => handleLabTestStatusChange(index, e.target.value)}
//                             >
//                               <option value="0">Select</option>
//                               <option value="1">Yes</option>
//                               <option value="2">No</option>
//                             </select>
//                           </td>
//                           <td className="py-2 sm:py-3 px-2 sm:px-4">
//                             <Input
//                               value={test.result || ""}
//                               onChange={(e) => handleLabTestResultChange(index, e.target.value)}
//                               placeholder="Enter result"
//                               className="text-xs sm:text-sm"
//                               disabled={test.day0 !== 1}
//                             />
//                           </td>
//                         </>
//                       ) : (
//                         <td colSpan={2} className="py-2 sm:py-3 px-2 sm:px-4">
//                           <Input
//                             value={test.others || ""}
//                             onChange={(e) => handleChestXRayChange(e.target.value)}
//                             placeholder="Enter details"
//                             className="text-xs sm:text-sm"
//                           />
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-2 sm:gap-4">
//           <Button
//             onClick={handleSave}
//             disabled={saving}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm"
//           >
//             {saving ? (
//               <>
//                 <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
//                 Save
//               </>
//             )}
//           </Button>
//           <Button
//             onClick={handleCancel}
//             variant="outline"
//             className="border-gray-600 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
//           >
//             <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/mtc-user/dashboard/antibiotics-micronutrients/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Home, Save, X, Loader2 } from "lucide-react";
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

interface TreatmentEntry {
  treatmentId: number;
  childName: string;
  samNumber: string;
  createdBy: number;
  createdDate: string;
  recordId: number;
  sectionId: number;
  day0: number;
  day1: number;
  day2: number;
  day3: number;
  day4: number;
  day5: number;
  day6: number;
  day7: number;
  day8: number;
  day9: number;
  day10: number;
  day11: number;
  day12: number;
  day13: number;
  day14: number;
  day15: number;
  day16: number;
  day17: number;
  day18: number;
  day19: number;
  day20: number;
  day21: number;
  day22: number;
  day23: number;
  day24: number;
  day25: number;
  day26: number;
  day27: number;
  day28: number;
  day29: number;
  otherRoutine?: string;
  result?: string;
  others?: string;
}

interface LabTestEntry {
  treatmentId: number;
  childName: string;
  samNumber: string;
  createdBy: number;
  createdDate: string;
  recordId: number;
  sectionId: number;
  day0: number;
  result?: string;
  others?: string;
}

interface MicronutrientsData {
  childId: string;
  routineTreatments: TreatmentEntry[];
  labTests: LabTestEntry[];
}

// Treatment names for routine section
const TREATMENT_NAMES = [
  "Deworming(Albendazole)",
  "Zinc Syrup (ml)",
  "Magsulph (ml)",
  "Potchlor (ml)",
  "Folic Acid (mg)",
  "Anti-Malarial",
  "Iron Syrup (ml)",
  "Vit A........iu",
  "Amoxicillin/Antibiotic",
  "Multivitamin (ml)",
  "Other Medicine"
];

// Lab test names
const LAB_TEST_NAMES = [
  "Haemoglobin (gm/dl)",
  "Other Tests (For repeated tests)",
  "TB Test",
  "Urine Test",
  "TC/DC of WBC",
  "Chest X-ray",
  "Malaria Test",
  "Blood Sugar"
];

// Section IDs mapping
const SECTION_IDS = {
  routine: [5, 6, 7, 8, 2, 4, 9, 1, 3, 10, 19],
  lab: [11, 18, 13, 14, 15, 16, 12, 17]
};

export default function EditMicronutrientsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const router = useRouter();
  const [childId, setChildId] = useState<string>("");
  const [child, setChild] = useState<Child | null>(null);
  const [routineTreatments, setRoutineTreatments] = useState<TreatmentEntry[]>([]);
  const [labTests, setLabTests] = useState<LabTestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setChildId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  // Load child data and treatment data when childId is available
  useEffect(() => {
    if (!childId) return;

    // Load child data from localStorage
    const loadChildData = () => {
      try {
        const storedChildren = localStorage.getItem('registeredChildren');
        if (storedChildren) {
          const parsedChildren: Child[] = JSON.parse(storedChildren);
          const foundChild = parsedChildren.find((c: Child) => c.id === childId);
          
          if (foundChild) {
            setChild(foundChild);
            
            // Check if micronutrients data already exists for this child
            const existingData = localStorage.getItem('micronutrientsData');
            if (existingData) {
              const allData: MicronutrientsData[] = JSON.parse(existingData);
              const childData = allData.find((item: MicronutrientsData) => item.childId === childId);
              
              if (childData) {
                setRoutineTreatments(childData.routineTreatments);
                setLabTests(childData.labTests);
                setLoading(false);
                return;
              }
            }
            
            // Initialize routine treatments
            const initialRoutineTreatments: TreatmentEntry[] = TREATMENT_NAMES.map((name, index) => ({
              treatmentId: 0,
              childName: foundChild.childName,
              samNumber: foundChild.samNumber,
              createdBy: 0,
              createdDate: new Date().toISOString(),
              recordId: 556653,
              sectionId: SECTION_IDS.routine[index],
              day0: 0,
              day1: 0,
              day2: 0,
              day3: 0,
              day4: 0,
              day5: 0,
              day6: 0,
              day7: index === 8 ? 1 : 0, // Amoxicillin starts from day 7
              day8: index === 8 ? 1 : 0,
              day9: index === 8 ? 1 : 0,
              day10: index === 8 ? 1 : 0,
              day11: index === 8 ? 1 : 0,
              day12: index === 8 ? 1 : 0,
              day13: index === 8 ? 1 : 0,
              day14: index === 8 ? 1 : 0,
              day15: index === 8 ? 1 : 0,
              day16: index === 8 ? 1 : 0,
              day17: index === 8 ? 1 : 0,
              day18: index === 8 ? 1 : 0,
              day19: index === 8 ? 1 : 0,
              day20: index === 8 ? 1 : 0,
              day21: index === 8 ? 1 : 0,
              day22: index === 8 ? 1 : 0,
              day23: index === 8 ? 1 : 0,
              day24: index === 8 ? 1 : 0,
              day25: index === 8 ? 1 : 0,
              day26: index === 8 ? 1 : 0,
              day27: index === 8 ? 1 : 0,
              day28: index === 8 ? 1 : 0,
              day29: index === 8 ? 1 : 0,
              otherRoutine: index === 10 ? "" : undefined,
            }));
            
            setRoutineTreatments(initialRoutineTreatments);
            
            // Initialize lab tests
            const initialLabTests: LabTestEntry[] = LAB_TEST_NAMES.map((name, index) => ({
              treatmentId: 0,
              childName: foundChild.childName,
              samNumber: foundChild.samNumber,
              createdBy: 0,
              createdDate: new Date().toISOString(),
              recordId: 556653,
              sectionId: SECTION_IDS.lab[index],
              day0: 0,
              result: index === 7 ? "" : undefined,
              others: index === 7 ? "" : undefined
            }));
            
            setLabTests(initialLabTests);
          }
        }
      } catch (error) {
        console.error("Error loading child data:", error);
        toast.error("Failed to load child data");
      } finally {
        setLoading(false);
      }
    };

    loadChildData();
  }, [childId]);

  // Handle checkbox change for routine treatments
  const handleCheckboxChange = (treatmentIndex: number, dayIndex: number) => {
    setRoutineTreatments(prevTreatments => {
      const updatedTreatments = [...prevTreatments];
      const treatment = { ...updatedTreatments[treatmentIndex] };
      
      // Create a type-safe way to update day property
      const dayValues = [
        treatment.day0, treatment.day1, treatment.day2, treatment.day3, treatment.day4, treatment.day5,
        treatment.day6, treatment.day7, treatment.day8, treatment.day9, treatment.day10, treatment.day11,
        treatment.day12, treatment.day13, treatment.day14, treatment.day15, treatment.day16, treatment.day17,
        treatment.day18, treatment.day19, treatment.day20, treatment.day21, treatment.day22, treatment.day23,
        treatment.day24, treatment.day25, treatment.day26, treatment.day27, treatment.day28, treatment.day29
      ];
      
      // Toggle value between 0 and 1
      const newValue = dayValues[dayIndex] === 0 ? 1 : 0;
      dayValues[dayIndex] = newValue;
      
      // Update the treatment object with new values
      treatment.day0 = dayValues[0];
      treatment.day1 = dayValues[1];
      treatment.day2 = dayValues[2];
      treatment.day3 = dayValues[3];
      treatment.day4 = dayValues[4];
      treatment.day5 = dayValues[5];
      treatment.day6 = dayValues[6];
      treatment.day7 = dayValues[7];
      treatment.day8 = dayValues[8];
      treatment.day9 = dayValues[9];
      treatment.day10 = dayValues[10];
      treatment.day11 = dayValues[11];
      treatment.day12 = dayValues[12];
      treatment.day13 = dayValues[13];
      treatment.day14 = dayValues[14];
      treatment.day15 = dayValues[15];
      treatment.day16 = dayValues[16];
      treatment.day17 = dayValues[17];
      treatment.day18 = dayValues[18];
      treatment.day19 = dayValues[19];
      treatment.day20 = dayValues[20];
      treatment.day21 = dayValues[21];
      treatment.day22 = dayValues[22];
      treatment.day23 = dayValues[23];
      treatment.day24 = dayValues[24];
      treatment.day25 = dayValues[25];
      treatment.day26 = dayValues[26];
      treatment.day27 = dayValues[27];
      treatment.day28 = dayValues[28];
      treatment.day29 = dayValues[29];
      
      updatedTreatments[treatmentIndex] = treatment;
      return updatedTreatments;
    });
  };

  // Handle dropdown change for lab tests
  const handleLabTestStatusChange = (testIndex: number, value: string) => {
    setLabTests(prevTests => {
      const updatedTests = [...prevTests];
      updatedTests[testIndex] = {
        ...updatedTests[testIndex],
        day0: parseInt(value)
      };
      
      // Clear result if status is not "Yes"
      if (value !== "1") {
        updatedTests[testIndex].result = "";
      }
      
      return updatedTests;
    });
  };

  // Handle text input change for lab test results
  const handleLabTestResultChange = (testIndex: number, value: string) => {
    setLabTests(prevTests => {
      const updatedTests = [...prevTests];
      updatedTests[testIndex] = {
        ...updatedTests[testIndex],
        result: value
      };
      return updatedTests;
    });
  };

  // Handle text input change for other medicine
  const handleOtherMedicineChange = (value: string) => {
    setRoutineTreatments(prevTreatments => {
      const updatedTreatments = [...prevTreatments];
      updatedTreatments[10] = {
        ...updatedTreatments[10],
        otherRoutine: value
      };
      return updatedTreatments;
    });
  };

  // Handle text input change for chest x-ray
  const handleChestXRayChange = (value: string) => {
    setLabTests(prevTests => {
      const updatedTests = [...prevTests];
      updatedTests[7] = {
        ...updatedTests[7],
        others: value
      };
      return updatedTests;
    });
  };

  // Save form data
  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Save to localStorage
      const micronutrientsData: MicronutrientsData = {
        childId,
        routineTreatments,
        labTests
      };
      
      // Get existing data or create new array
      const existingData = localStorage.getItem('micronutrientsData');
      const allData: MicronutrientsData[] = existingData ? JSON.parse(existingData) : [];
      
      // Find if data for this child already exists
      const existingIndex = allData.findIndex((item: MicronutrientsData) => item.childId === childId);
      
      if (existingIndex >= 0) {
        // Update existing data
        allData[existingIndex] = micronutrientsData;
      } else {
        // Add new data
        allData.push(micronutrientsData);
      }
      
      localStorage.setItem('micronutrientsData', JSON.stringify(allData));
      
      toast.success("Micronutrients & Antibiotics data saved successfully!");
      
      // Navigate back to list page after a short delay
      setTimeout(() => {
        router.push("/mtc-user/dashboard/micronutrients");
      }, 1500);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  // Redirect to Home page
  const handleBackToHome = () => {
    router.push("/mtc-user/dashboard/home");
  };

  // Cancel and go back to list
  const handleCancel = () => {
    router.push("/mtc-user/dashboard/micronutrients");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Child not found</p>
          <Button onClick={handleBackToHome} className="mt-4">
            Back to Home
          </Button>
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
            Micronutrients & Antibiotics
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

        {/* Child Information */}
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-end">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  SAM Number
                </label>
                <Input
                  value={child.samNumber}
                  readOnly
                  className="text-xs sm:text-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Child Name
                </label>
                <Input
                  value={child.childName}
                  readOnly
                  className="text-xs sm:text-sm bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routine Treatment Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              TO BE FILLED UP BY THE DOCTOR / PARAMEDICAL STAFF AS APPLICABLE
            </h2>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Treatment</th>
                    <th className="py-2 sm:py-3 px-1 sm:px-2 text-center font-semibold">Days</th>
                    {Array.from({ length: 30 }, (_, i) => (
                      <th key={i} className="py-2 sm:py-3 px-1 sm:px-2 text-center font-semibold">
                        {i}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routineTreatments.map((treatment, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                    >
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                        {TREATMENT_NAMES[index]}
                      </td>
                      
                      {/* Day 0 - Day 29 Checkboxes */}
                      {Array.from({ length: 30 }, (_, dayIndex) => {
                        // Get day value in a type-safe way
                        const dayValues = [
                          treatment.day0, treatment.day1, treatment.day2, treatment.day3, treatment.day4, treatment.day5,
                          treatment.day6, treatment.day7, treatment.day8, treatment.day9, treatment.day10, treatment.day11,
                          treatment.day12, treatment.day13, treatment.day14, treatment.day15, treatment.day16, treatment.day17,
                          treatment.day18, treatment.day19, treatment.day20, treatment.day21, treatment.day22, treatment.day23,
                          treatment.day24, treatment.day25, treatment.day26, treatment.day27, treatment.day28, treatment.day29
                        ];
                        
                        const isDisabled = index === 8 && dayIndex < 7; // Amoxicillin disabled for days 0-6
                        
                        return (
                          <td key={dayIndex} className="py-2 sm:py-3 px-1 sm:px-2 text-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 disabled:opacity-50"
                              checked={dayValues[dayIndex] === 1}
                              onChange={() => handleCheckboxChange(index, dayIndex)}
                              disabled={isDisabled}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  
                  {/* Other Medicine Row */}
                  <tr className="bg-white hover:bg-indigo-50 transition">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      Other Medicine
                    </td>
                    <td colSpan={30} className="py-2 sm:py-3 px-2 sm:px-4">
                      <Input
                        value={routineTreatments[10]?.otherRoutine || ""}
                        onChange={(e) => handleOtherMedicineChange(e.target.value)}
                        placeholder="Enter other medicine details"
                        className="text-xs sm:text-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Laboratory Tests Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              TO BE FILLED UP BY THE DOCTOR / PARAMEDICAL STAFF AS APPLICABLE
            </h2>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Test Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Test Conducted Status</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Value/Result</th>
                  </tr>
                </thead>
                <tbody>
                  {labTests.map((test, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                    >
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                        {LAB_TEST_NAMES[index]}
                      </td>
                      
                      {index < 7 ? (
                        <>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">
                            <select
                              className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={test.day0}
                              onChange={(e) => handleLabTestStatusChange(index, e.target.value)}
                            >
                              <option value="0">Select</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">
                            <Input
                              value={test.result || ""}
                              onChange={(e) => handleLabTestResultChange(index, e.target.value)}
                              placeholder="Enter result"
                              className="text-xs sm:text-sm"
                              disabled={test.day0 !== 1}
                            />
                          </td>
                        </>
                      ) : (
                        <td colSpan={2} className="py-2 sm:py-3 px-2 sm:px-4">
                          <Input
                            value={test.others || ""}
                            onChange={(e) => handleChestXRayChange(e.target.value)}
                            placeholder="Enter details"
                            className="text-xs sm:text-sm"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 sm:gap-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm"
          >
            {saving ? (
              <>
                <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Save
              </>
            )}
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-gray-600 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
          >
            <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}