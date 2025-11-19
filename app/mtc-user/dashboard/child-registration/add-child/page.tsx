"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Upload, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Import the Image component

export default function ChildRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [samNumber, setSamNumber] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [showAshaFields, setShowAshaFields] = useState(false);
  const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
  const [otherComplication, setOtherComplication] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Date states
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
  const [admissionTime, setAdmissionTime] = useState<string>("");

  // Fix hydration issue by ensuring component is mounted before rendering dynamic content
  useEffect(() => {
    setMounted(true);
    generateSamNumber();
  }, []);

  // Show/hide ASHA fields based on referred by selection
  useEffect(() => {
    setShowAshaFields(referredBy === "6");
  }, [referredBy]);

  const generateSamNumber = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newSam = `JH/WSB/CBS/${randomNum}`;
    setSamNumber(newSam);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Photo size must be less than 2MB");
        return;
      }
      
      // Validate file type (JPEG/PNG only)
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        toast.error("Only JPEG and PNG images are allowed");
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplicationChange = (id: string, checked: boolean) => {
    setSelectedComplications(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Collect all form values
    const admissionType = formData.get('admissionType') as string;
    const childName = formData.get('childName') as string;
    const parentName = formData.get('parentName') as string;
    const relationship = formData.get('relationship') as string;
    const mobileNumber = formData.get('mobileNumber') as string;
    const bplNumber = formData.get('bplNumber') as string;
    const sex = formData.get('sex') as string;
    const address = formData.get('address') as string;
    const caste = formData.get('caste') as string;
    const district = formData.get('district') as string;
    const block = formData.get('block') as string;
    const icdsProject = formData.get('icdsProject') as string;
    const anganwadiCenter = formData.get('anganwadiCenter') as string;
    const village = formData.get('village') as string;
    const admissionWeight = formData.get('admissionWeight') as string;
    const admissionHeight = formData.get('admissionHeight') as string;
    const admissionOdema = formData.get('admissionOdema') as string;
    const admissionMuac = formData.get('admissionMuac') as string;
    const breastFeeding = formData.get('breastFeeding') as string;
    const complementaryFeeding = formData.get('complementaryFeeding') as string;
    const appetiteTest = formData.get('appetiteTest') as string;
    
    // Get selected complications
    const complications = Object.keys(selectedComplications).filter(key => selectedComplications[key]);
    
    // Create child object
    const newChild = {
      id: Date.now().toString(),
      recordNo: Math.floor(100000 + Math.random() * 900000).toString(),
      samNumber,
      admissionType,
      referredBy,
      referredByName: formData.get('referredByName') as string,
      referredByMobile: formData.get('referredByMobile') as string,
      childName,
      parentName,
      relationship,
      mobileNumber,
      bplNumber,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "dd-MMM-yyyy") : "",
      sex,
      address,
      caste,
      district,
      block,
      icdsProject,
      anganwadiCenter,
      village,
      admissionDate: admissionDate ? format(admissionDate, "dd-MMM-yyyy") : "",
      admissionTime,
      admissionWeight,
      admissionHeight,
      admissionOdema,
      admissionMuac,
      breastFeeding,
      complementaryFeeding,
      appetiteTest,
      complications,
      otherComplication,
      photo: photoPreview,
      createdAt: new Date().toISOString()
    };

    // Get existing children from localStorage
    const existingChildren = JSON.parse(localStorage.getItem('registeredChildren') || '[]');
    
    // Add new child to array
    const updatedChildren = [...existingChildren, newChild];
    
    // Save to localStorage
    localStorage.setItem('registeredChildren', JSON.stringify(updatedChildren));

    // Simulate API call
    setTimeout(() => {
      toast.success("Child registered successfully!");
      setLoading(false);
      
      // Redirect to list page
      router.push('/mtc-user/dashboard/child-registration');
    }, 1500);
  };

  // Don't render until component is mounted on client
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <h1 className="text-2xl font-bold text-teal-700">
              Child Registration
            </h1>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SAM Number + Admission Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>SAM Number</Label>
                  <Input
                    value={samNumber}
                    readOnly
                    className="bg-gray-100 font-mono text-gray-700"
                  />
                </div>
                <div>
                  <Label>Admission Type <span className="text-red-500">*</span></Label>
                  <Select name="admissionType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">NEW ADMISSION</SelectItem>
                      <SelectItem value="2">RE ADMISSION</SelectItem>
                      <SelectItem value="3">RELAPSE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Referred By</Label>
                  <Select name="referredBy" onValueChange={(val) => setReferredBy(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Sahiya/ASHA</SelectItem>
                      <SelectItem value="1">ANGANWADI</SelectItem>
                      <SelectItem value="2">ANM</SelectItem>
                      <SelectItem value="7">Poshan Sakhi</SelectItem>
                      <SelectItem value="8">RBSK Team</SelectItem>
                      <SelectItem value="3">OPD</SelectItem>
                      <SelectItem value="4">SELF</SelectItem>
                      <SelectItem value="5">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {showAshaFields && (
                  <div>
                    <Label>Name of Sahiya/Asha</Label>
                    <Input name="referredByName" placeholder="Enter Sahiya/Asha Name" />
                  </div>
                )}
              </div>

              {/* ASHA Mobile Number */}
              {showAshaFields && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Sahiya/Asha Mobile</Label>
                    <Input
                      name="referredByMobile"
                      type="tel"
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>
              )}

              {/* Child Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Child Name <span className="text-red-500">*</span></Label>
                  <Input name="childName" placeholder="Enter Child Name" required />
                </div>
                <div>
                  <Label>Name of the Father/Mother/Caretaker <span className="text-red-500">*</span></Label>
                  <Input name="parentName" placeholder="Enter Name" required />
                </div>
                <div>
                  <Label>Relationship with child <span className="text-red-500">*</span></Label>
                  <Select name="relationship" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Father</SelectItem>
                      <SelectItem value="2">Mother</SelectItem>
                      <SelectItem value="3">Any Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Mobile Number <span className="text-red-500">*</span></Label>
                  <Input
                    name="mobileNumber"
                    type="tel"
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
              </div>

              {/* BPL Number, DOB, Sex */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>BPL Number</Label>
                  <Input name="bplNumber" placeholder="Enter BPL Number" />
                </div>
                <div>
                  <Label>Date of Birth <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Sex <span className="text-red-500">*</span></Label>
                  <Select name="sex" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="2">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address <span className="text-red-500">*</span></Label>
                  <Textarea name="address" placeholder="Enter Address" rows={1} />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Upload Photo (max 2MB, png/jpeg only)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="file" 
                      accept=".jpg,.jpeg,.png" 
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                </div>
                {photoPreview && (
                  <div className="col-span-3">
                    {/* Replaced img with Next.js Image component */}
                    <div className="relative h-32 w-auto">
                      <Image 
                        src={photoPreview} 
                        alt="Child Photo" 
                        fill
                        className="rounded border object-contain"
                        unoptimized // Required for data URLs
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Caste, District, Block */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Caste <span className="text-red-500">*</span></Label>
                  <Select name="caste" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">ST</SelectItem>
                      <SelectItem value="2">SC</SelectItem>
                      <SelectItem value="3">OBC</SelectItem>
                      <SelectItem value="4">OTHERS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>District <span className="text-red-500">*</span></Label>
                  <Select name="district" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">BOKARO</SelectItem>
                      <SelectItem value="2">CHATRA</SelectItem>
                      <SelectItem value="16">DEOGHAR</SelectItem>
                      <SelectItem value="4">DHANBAD</SelectItem>
                      <SelectItem value="17">DUMKA</SelectItem>
                      <SelectItem value="22">EAST SINGHBHUM</SelectItem>
                      <SelectItem value="14">GARHWA</SelectItem>
                      <SelectItem value="3">GIRIDIH</SelectItem>
                      <SelectItem value="18">GODDA</SelectItem>
                      <SelectItem value="9">GUMLA</SelectItem>
                      <SelectItem value="6">HAZARIBAGH</SelectItem>
                      <SelectItem value="19">JAMTARA</SelectItem>
                      <SelectItem value="10">KHUNTI</SelectItem>
                      <SelectItem value="7">KODERMA</SelectItem>
                      <SelectItem value="15">LATEHAR</SelectItem>
                      <SelectItem value="11">LOHARDAGA</SelectItem>
                      <SelectItem value="20">PAKUR</SelectItem>
                      <SelectItem value="13">PALAMU</SelectItem>
                      <SelectItem value="5">RAMGARH</SelectItem>
                      <SelectItem value="8">RANCHI</SelectItem>
                      <SelectItem value="21">SAHIBGANJ</SelectItem>
                      <SelectItem value="23">SERAIKELA</SelectItem>
                      <SelectItem value="12">SIMDEGA</SelectItem>
                      <SelectItem value="24">WEST SINGHBHUM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Block</Label>
                  <Select name="block">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="block1">Block 1</SelectItem>
                      <SelectItem value="block2">Block 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ICDS Project</Label>
                  <Select name="icdsProject">
                    <SelectTrigger>
                      <SelectValue placeholder="Select ICDS Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icds1">ICDS Project 1</SelectItem>
                      <SelectItem value="icds2">ICDS Project 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Anganwadi Center, Village, Admission Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Anganwadi Center</Label>
                  <Select name="anganwadiCenter">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Anganwadi Center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anganwadi1">Anganwadi Center 1</SelectItem>
                      <SelectItem value="anganwadi2">Anganwadi Center 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Village</Label>
                  <Input name="village" placeholder="Enter Village" />
                </div>
                <div>
                  <Label>Admission Date <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !admissionDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {admissionDate ? format(admissionDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={admissionDate}
                        onSelect={setAdmissionDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Admission Time <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      name="admissionTime"
                      type="time"
                      value={admissionTime}
                      onChange={(e) => setAdmissionTime(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Height, Z-Score, Odema, MUAC */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
                  <Input name="admissionWeight" type="number" step="0.1" placeholder="Enter Weight" required />
                </div>
                <div>
                  <Label>Admission Length/Height (cm) <span className="text-red-500">*</span></Label>
                  <Input name="admissionHeight" type="number" step="0.1" placeholder="Enter Height" required />
                </div>
                <div>
                  <Label>Z-Score (SD)</Label>
                  <Input readOnly placeholder="Auto-calculated" />
                </div>
                <div>
                  <Label>Admission Odema <span className="text-red-500">*</span></Label>
                  <Select name="admissionOdema" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">+</SelectItem>
                      <SelectItem value="2">++</SelectItem>
                      <SelectItem value="3">+++</SelectItem>
                      <SelectItem value="4">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* MUAC */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Admission MUAC (cm) <span className="text-red-500">*</span></Label>
                  <Input name="admissionMuac" type="number" step="0.1" placeholder="Enter MUAC" required />
                </div>
              </div>

              {/* Feeding Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Breast Feeding <span className="text-red-500">*</span></Label>
                  <Select name="breastFeeding" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="2">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
                  <Select name="complementaryFeeding" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="2">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Appetite Test <span className="text-red-500">*</span></Label>
                  <Select name="appetiteTest" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">PASS</SelectItem>
                      <SelectItem value="2">FAIL</SelectItem>
                      <SelectItem value="3">NOT DONE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Medical Complications */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Complications <span className="text-red-500">*</span>
                </Label>
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: "0", label: "NO COMPLICATION" },
                      { id: "1", label: "PRESENCE OF ANY OF EMERGENCY SIGNS" },
                      { id: "2", label: "VERY WEAK, APATHETIC" },
                      { id: "3", label: "ODEMA OF BOTH FEET" },
                      { id: "4", label: "SEVERE PALMAR PALLOR" },
                      { id: "5", label: "SICK YOUNG INFANT LESS THAN 2 MONTHS" },
                      { id: "6", label: "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS" },
                      { id: "7", label: "CONTINUALLY IRRITABLE AND RESTLESS" },
                      { id: "8", label: "ANY RESPIRATORY DISTRESS" },
                      { id: "9", label: "SIGN SUGGESTING SEVERE DEHYDRATION WITH DIARRHOEA" },
                      { id: "10", label: "PRESISTENT VOMITING" },
                      { id: "11", label: "HYPOTHERMIA (<35 DEGREE CENTIGRADE)" },
                      { id: "12", label: "SEVERE ANEMIA" },
                      { id: "13", label: "FEVER (>38.5 DEGREE CENTIGRADE)" },
                      { id: "14", label: "EXTENSIVE SKIN LESIONS, EYE LESIONS, POST-MEASLES STATES" },
                      { id: "15", label: "TUBERCULOSIS" },
                      { id: "16", label: "MALARIA" },
                      { id: "17", label: "OTHERS" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`complication-${item.id}`}
                          checked={selectedComplications[item.id] || false}
                          onChange={(e) => handleComplicationChange(item.id, e.target.checked)}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <Label htmlFor={`complication-${item.id}`} className="text-sm">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {selectedComplications["17"] && (
                    <div className="mt-3">
                      <Label htmlFor="other-complication">Other Complication Details</Label>
                      <Input
                        id="other-complication"
                        value={otherComplication}
                        onChange={(e) => setOtherComplication(e.target.value)}
                        placeholder="Please specify other complication"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/mtc-user/dashboard/child-registration')}
                  className="bg-gray-100"
                >
                  ✕ Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? "Registering..." : "✔ Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}