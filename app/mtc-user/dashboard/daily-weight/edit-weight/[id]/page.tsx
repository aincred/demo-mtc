"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Save, X, Download } from "lucide-react";
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
  day: string;
  value: string;
}

interface WeightData {
  childId: string;
  dailyWeightId: string;
  recordId: string;
  status: boolean;
  createdBy: string;
  createdDate: string;
  samNumber: string;
  name: string;
  weightEntries: WeightEntry[];
  minimumWeight: string;
  targetWeight: string;
}

export default function EditWeightEntryPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  const chartRef = useRef<HTMLDivElement>(null);
  
  const [child, setChild] = useState<Child | null>(null);
  const [weightData, setWeightData] = useState<WeightData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load child data and weight entries on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Load children data from localStorage
        const storedChildren = localStorage.getItem('registeredChildren');
        if (!storedChildren) {
          toast.error("No children data found");
          router.push("/mtc-user/dashboard/daily-weight");
          return;
        }

        const children = JSON.parse(storedChildren);
        const foundChild = children.find((c: Child) => c.id === childId);
        
        if (!foundChild) {
          toast.error("Child not found");
          router.push("/mtc-user/dashboard/daily-weight");
          return;
        }

        setChild(foundChild);

        // Load weight entries data from localStorage
        const storedWeights = localStorage.getItem('weightEntries');
        let weightEntries: WeightEntry[] = [];

        if (storedWeights) {
          const weights = JSON.parse(storedWeights);
          if (weights[childId]) {
            // Convert weight data to expected format
            weightEntries = Object.keys(weights[childId])
              .filter(key => key.startsWith('day'))
              .map(key => ({
                day: key.replace('day', 'DAY_').toUpperCase(),
                value: weights[childId][key] || ""
              }));
          }
        }

        // Initialize with DAY_0 as admission weight if not present
        if (!weightEntries.find(e => e.day === 'DAY_0')) {
          weightEntries.unshift({
            day: 'DAY_0',
            value: foundChild.admissionWeight
          });
        }

        // Ensure we have all days from DAY_0 to DAY_59
        const allDays: WeightEntry[] = [];
        for (let i = 0; i < 60; i++) {
          const dayName = `DAY_${i}`;
          const existingEntry = weightEntries.find(e => e.day === dayName);
          allDays.push({
            day: dayName,
            value: existingEntry ? existingEntry.value : ""
          });
        }

        // Calculate target weight (15% weight gain from admission weight)
        const admissionWeight = parseFloat(foundChild.admissionWeight) || 0;
        const targetWeight = (admissionWeight * 1.15).toFixed(2);
        const minimumWeight = (admissionWeight * 1.05).toFixed(2);

        setWeightData({
          childId: childId,
          dailyWeightId: Date.now().toString(),
          recordId: foundChild.recordNo,
          status: true,
          createdBy: "1",
          createdDate: new Date().toISOString(),
          samNumber: foundChild.samNumber,
          name: foundChild.childName,
          weightEntries: allDays,
          minimumWeight: minimumWeight,
          targetWeight: targetWeight
        });
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [childId, router]);

  // Handle weight entry change
  const handleWeightChange = (dayIndex: number, value: string) => {
    if (!weightData) return;

    const updatedEntries = [...weightData.weightEntries];
    updatedEntries[dayIndex] = {
      ...updatedEntries[dayIndex],
      value: value
    };

    setWeightData({
      ...weightData,
      weightEntries: updatedEntries
    });
  };

  // Handle minimum weight change
  const handleMinimumWeightChange = (value: string) => {
    if (!weightData) return;

    setWeightData({
      ...weightData,
      minimumWeight: value
    });
  };

  // Save weight entries
  const handleSave = async () => {
    if (!weightData || !child) return;

    setIsSaving(true);
    try {
      // Convert weight entries back to format used in localStorage
      const formattedWeights: { [key: string]: string } = {};
      weightData.weightEntries.forEach(entry => {
        const dayKey = entry.day.toLowerCase().replace('_', '');
        formattedWeights[dayKey] = entry.value;
      });

      // Get existing weight entries from localStorage
      const storedWeights = localStorage.getItem('weightEntries');
      const allWeights = storedWeights ? JSON.parse(storedWeights) : {}; // Fixed: Changed let to const

      // Update weight entries for this child
      allWeights[childId] = formattedWeights;

      // Save to localStorage
      localStorage.setItem('weightEntries', JSON.stringify(allWeights));

      toast.success("Weight entries saved successfully!");
      router.push("/mtc-user/dashboard/daily-weight");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  // Download chart as image
  const downloadChart = async () => {
    if (!chartRef.current) return;
    
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Get SVG element
      const svgElement = chartRef.current.querySelector('svg');
      if (!svgElement) return;
      
      // Get SVG dimensions
      const svgRect = svgElement.getBoundingClientRect();
      canvas.width = svgRect.width;
      canvas.height = svgRect.height;
      
      // Convert SVG to image
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (!blob) return;
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `weight-chart-${child?.childName || 'child'}.png`;
          link.href = url;
          link.click();
          
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (error) {
      console.error("Error downloading chart:", error);
      toast.error("Failed to download chart");
    }
  };

  // Simple SVG chart component
  const WeightChart = () => {
    if (!weightData) return null;

    const width = 800;
    const height = 400;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Extract data points
    const dataPoints = weightData.weightEntries
      .map((entry, index) => ({
        day: index,
        value: entry.value ? parseFloat(entry.value) : null
      }))
      .filter(point => point.value !== null);

    if (dataPoints.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
          <p className="text-gray-500">No weight data available</p>
        </div>
      );
    }

    // Find min and max values for scaling
    const allValues = [
      ...dataPoints.map(p => p.value!),
      parseFloat(weightData.targetWeight),
      parseFloat(weightData.minimumWeight)
    ];
    
    const minValue = Math.min(...allValues) * 0.95;
    const maxValue = Math.max(...allValues) * 1.05;
    const valueRange = maxValue - minValue;

    // Scale functions
    const xScale = (day: number) => padding + (day / 59) * chartWidth;
    const yScale = (value: number) => padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

    // Create path for weight line
    const pathData = dataPoints
      .map((point, index) => {
        const x = xScale(point.day);
        const y = yScale(point.value!);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    // Create area under the curve
    const areaData = `${pathData} L ${xScale(59)} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`;

    // Grid lines
    const horizontalGridLines = 5;
    const verticalGridLines = 6;

    return (
      <div className="w-full overflow-x-auto">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Background */}
          <rect width={width} height={height} fill="white" />
          
          {/* Grid lines */}
          {Array.from({ length: horizontalGridLines + 1 }).map((_, i) => {
            const y = padding + (i / horizontalGridLines) * chartHeight;
            const value = maxValue - (i / horizontalGridLines) * valueRange;
            return (
              <g key={`h-grid-${i}`}>
                <line
                  x1={padding}
                  y1={y}
                  x2={padding + chartWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {value.toFixed(1)}
                </text>
              </g>
            );
          })}
          
          {Array.from({ length: verticalGridLines + 1 }).map((_, i) => {
            const x = padding + (i / verticalGridLines) * chartWidth;
            const day = Math.round((i / verticalGridLines) * 59);
            return (
              <g key={`v-grid-${i}`}>
                <line
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={padding + chartHeight}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={padding + chartHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {day}
                </text>
              </g>
            );
          })}
          
          {/* Target weight line */}
          <line
            x1={padding}
            y1={yScale(parseFloat(weightData.targetWeight))}
            x2={padding + chartWidth}
            y2={yScale(parseFloat(weightData.targetWeight))}
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Minimum weight line */}
          <line
            x1={padding}
            y1={yScale(parseFloat(weightData.minimumWeight))}
            x2={padding + chartWidth}
            y2={yScale(parseFloat(weightData.minimumWeight))}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="3,3"
          />
          
          {/* Area under curve */}
          <path
            d={areaData}
            fill="rgba(34, 197, 94, 0.1)"
          />
          
          {/* Weight line */}
          <path
            d={pathData}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {dataPoints.map((point) => (
            <circle
              key={`point-${point.day}`}
              cx={xScale(point.day)}
              cy={yScale(point.value!)}
              r="3"
              fill="#22c55e"
            />
          ))}
          
          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + chartHeight}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding + chartHeight}
            x2={padding + chartWidth}
            y2={padding + chartHeight}
            stroke="#374151"
            strokeWidth="2"
          />
          
          {/* Title */}
          <text
            x={width / 2}
            y={20}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#111827"
          >
            Weight Progress Chart
          </text>
          
          {/* Axis labels */}
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            fontSize="14"
            fill="#374151"
          >
            Day
          </text>
          
          <text
            x={15}
            y={height / 2}
            textAnchor="middle"
            fontSize="14"
            fill="#374151"
            transform={`rotate(-90 15 ${height / 2})`}
          >
            Weight (kg)
          </text>
          
          {/* Legend */}
          <g transform={`translate(${width - 150}, 30)`}>
            <rect x="0" y="0" width="140" height="80" fill="white" stroke="#e5e7eb" rx="5" />
            
            <line x1="10" y1="20" x2="30" y2="20" stroke="#22c55e" strokeWidth="2" />
            <text x="35" y="25" fontSize="12" fill="#374151">Weight</text>
            
            <line x1="10" y1="40" x2="30" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            <text x="35" y="45" fontSize="12" fill="#374151">Target</text>
            
            <line x1="10" y1="60" x2="30" y2="60" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" />
            <text x="35" y="65" fontSize="12" fill="#374151">Minimum</text>
          </g>
        </svg>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading weight data...</p>
        </div>
      </div>
    );
  }

  if (!weightData || !child) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load weight data</p>
          <Button 
            onClick={() => router.push("/mtc-user/dashboard/daily-weight")}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => router.push("/mtc-user/dashboard/daily-weight")}
            variant="outline"
            className="border-gray-600 text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Back to Daily Weight
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Edit Weight Entry
          </h1>
        </div>

        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-4 sm:p-6">
            {/* Child Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SAM Number
                </label>
                <Input
                  value={weightData.samNumber}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child Name
                </label>
                <Input
                  value={weightData.name}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>

            {/* Weight Entries Grid */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Daily Weight Entries
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                  {weightData.weightEntries.map((entry, index) => (
                    <div key={entry.day} className="mb-2">
                      <h6 className="text-xs text-center font-medium text-gray-700 mb-1">
                        {entry.day}
                      </h6>
                      <Input
                        type="number"
                        step="0.01"
                        value={entry.value}
                        onChange={(e) => handleWeightChange(index, e.target.value)}
                        className="text-xs"
                        placeholder="0.00"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  ** Weight entered in kilograms (kg)
                </div>
              </CardContent>
            </Card>

            {/* Target Weight Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Target Weight Calculation
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Minimum weight (kg)
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          value={weightData.minimumWeight}
                          onChange={(e) => handleMinimumWeightChange(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Target weight (kg)
                        </label>
                        <Input
                          value={weightData.targetWeight}
                          readOnly
                          className="bg-gray-50 text-xs"
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        (Target weight: 15% weight gain from weight on admission)
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-700">
                        Weight Chart
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadChart}
                        className="text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div ref={chartRef} className="h-64">
                      <WeightChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push("/mtc-user/dashboard/daily-weight")}
                className="border-gray-600 text-gray-700 hover:bg-gray-100"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}