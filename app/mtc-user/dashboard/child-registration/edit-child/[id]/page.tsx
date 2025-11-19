"use client";

import { useState, useEffect, useCallback } from "react"; // Added useCallback import
import { useRouter, useParams } from "next/navigation";
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
import { CalendarIcon, Upload, Clock, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Import Image component

interface ChildData {
  id: string;
  recordNo: string;
  samNumber: string;
  admissionType: string;
  referredBy: string;
  referredByName?: string;
  referredByMobile?: string;
  childName: string;
  parentName: string;
  relationship: string;
  mobileNumber: string;
  bplNumber?: string;
  dateOfBirth: string;
  sex: string;
  address: string;
  caste: string;
  district: string;
  block?: string;
  icdsProject?: string;
  anganwadiCenter?: string;
  village?: string;
  admissionDate: string;
  admissionTime: string;
  admissionWeight: string;
  admissionHeight: string;
  admissionOdema: string;
  admissionMuac: string;
  breastFeeding: string;
  complementaryFeeding: string;
  appetiteTest: string;
  complications: string[];
  otherComplication?: string;
  photo?: string;
  createdAt: string;
}

export default function EditChildRegistration() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [childData, setChildData] = useState<ChildData | null>(null);
  const [referredBy, setReferredBy] = useState("");
  const [showAshaFields, setShowAshaFields] = useState(false);
  const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
  const [otherComplication, setOtherComplication] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
  const [admissionTime, setAdmissionTime] = useState<string>("");

  // Memoize the loadChildData function using useCallback
  const loadChildData = useCallback(() => {
    const storedChildren = localStorage.getItem('registeredChildren');
    if (storedChildren) {
      const children = JSON.parse(storedChildren);
      const child = children.find((c: ChildData) => c.id === childId);
      
      if (child) {
        setChildData(child);
        
        // Set form values
        setReferredBy(child.referredBy || "");
        setOtherComplication(child.otherComplication || "");
        setPhotoPreview(child.photo || null);
        setAdmissionTime(child.admissionTime || "");
        
        // Parse dates
        if (child.dateOfBirth) {
          try {
            const parsedDate = parse(child.dateOfBirth, "dd-MMM-yyyy", new Date());
            setDateOfBirth(parsedDate);
          } catch (e) {
            console.error("Error parsing date of birth:", e);
          }
        }
        
        if (child.admissionDate) {
          try {
            const parsedDate = parse(child.admissionDate, "dd-MMM-yyyy", new Date());
            setAdmissionDate(parsedDate);
          } catch (e) {
            console.error("Error parsing admission date:", e);
          }
        }
        
        // Set complications
        const complicationsObj: { [key: string]: boolean } = {};
        if (child.complications && Array.isArray(child.complications)) {
          child.complications.forEach((comp: string) => {
            complicationsObj[comp] = true;
          });
        }
        setSelectedComplications(complicationsObj);
      } else {
        toast.error("Child record not found");
        router.push("/mtc-user/dashboard/child-registration");
      }
    } else {
      toast.error("No records found");
      router.push("/mtc-user/dashboard/child-registration");
    }
  }, [childId, router]); // Dependencies for useCallback

  useEffect(() => {
    setMounted(true);
    loadChildData();
  }, [loadChildData]); // Now safe to use loadChildData as dependency

  useEffect(() => {
    setShowAshaFields(referredBy === "6");
  }, [referredBy]);

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

    if (!childData) {
      toast.error("No child data to update");
      setLoading(false);
      return;
    }

    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Collect all form values
    const updatedChild: ChildData = {
      ...childData,
      admissionType: formData.get('admissionType') as string,
      referredBy: formData.get('referredBy') as string,
      referredByName: formData.get('referredByName') as string,
      referredByMobile: formData.get('referredByMobile') as string,
      childName: formData.get('childName') as string,
      parentName: formData.get('parentName') as string,
      relationship: formData.get('relationship') as string,
      mobileNumber: formData.get('mobileNumber') as string,
      bplNumber: formData.get('bplNumber') as string,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "dd-MMM-yyyy") : "",
      sex: formData.get('sex') as string,
      address: formData.get('address') as string,
      caste: formData.get('caste') as string,
      district: formData.get('district') as string,
      block: formData.get('block') as string,
      icdsProject: formData.get('icdsProject') as string,
      anganwadiCenter: formData.get('anganwadiCenter') as string,
      village: formData.get('village') as string,
      admissionDate: admissionDate ? format(admissionDate, "dd-MMM-yyyy") : "",
      admissionTime: formData.get('admissionTime') as string,
      admissionWeight: formData.get('admissionWeight') as string,
      admissionHeight: formData.get('admissionHeight') as string,
      admissionOdema: formData.get('admissionOdema') as string,
      admissionMuac: formData.get('admissionMuac') as string,
      breastFeeding: formData.get('breastFeeding') as string,
      complementaryFeeding: formData.get('complementaryFeeding') as string,
      appetiteTest: formData.get('appetiteTest') as string,
      complications: Object.keys(selectedComplications).filter(key => selectedComplications[key]),
      otherComplication,
      photo: photoPreview || undefined,
    };

    // Get existing children from localStorage
    const existingChildren = JSON.parse(localStorage.getItem('registeredChildren') || '[]');
    
    // Update the specific child
    const updatedChildren = existingChildren.map((c: ChildData) => 
      c.id === childId ? updatedChild : c
    );
    
    // Save to localStorage
    localStorage.setItem('registeredChildren', JSON.stringify(updatedChildren));

    // Simulate API call
    setTimeout(() => {
      toast.success("Child record updated successfully!");
      setLoading(false);
      
      // Redirect to the list page
      router.push('/mtc-user/dashboard/child-registration');
    }, 1500);
  };

  if (!mounted || !childData) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-6 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/mtc-user/dashboard/child-registration')}
                className="mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-teal-700">
                Edit Child Registration
              </h1>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SAM Number + Admission Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>SAM Number</Label>
                  <Input
                    value={childData.samNumber}
                    readOnly
                    className="bg-gray-100 font-mono text-gray-700"
                  />
                </div>
                <div>
                  <Label>Admission Type <span className="text-red-500">*</span></Label>
                  <Select name="admissionType" defaultValue={childData.admissionType} required>
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
                  <Select name="referredBy" defaultValue={childData.referredBy} onValueChange={(val) => setReferredBy(val)}>
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
                    <Input name="referredByName" defaultValue={childData.referredByName || ""} placeholder="Enter Sahiya/Asha Name" />
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
                      defaultValue={childData.referredByMobile || ""}
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
                  <Input name="childName" defaultValue={childData.childName} placeholder="Enter Child Name" required />
                </div>
                <div>
                  <Label>Name of the Father/Mother/Caretaker <span className="text-red-500">*</span></Label>
                  <Input name="parentName" defaultValue={childData.parentName} placeholder="Enter Name" required />
                </div>
                <div>
                  <Label>Relationship with child <span className="text-red-500">*</span></Label>
                  <Select name="relationship" defaultValue={childData.relationship} required>
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
                    defaultValue={childData.mobileNumber}
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
                  <Input name="bplNumber" defaultValue={childData.bplNumber || ""} placeholder="Enter BPL Number" />
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
                  <Select name="sex" defaultValue={childData.sex} required>
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
                  <Textarea name="address" defaultValue={childData.address} placeholder="Enter Address" rows={1} />
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
                  <Select name="caste" defaultValue={childData.caste} required>
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
                  <Select name="district" defaultValue={childData.district} required>
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
                  <Select name="block" defaultValue={childData.block || ""}>
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
                  <Select name="icdsProject" defaultValue={childData.icdsProject || ""}>
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
                  <Select name="anganwadiCenter" defaultValue={childData.anganwadiCenter || ""}>
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
                  <Input name="village" defaultValue={childData.village || ""} placeholder="Enter Village" />
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
                  <Input name="admissionWeight" type="number" step="0.1" defaultValue={childData.admissionWeight} placeholder="Enter Weight" required />
                </div>
                <div>
                  <Label>Admission Length/Height (cm) <span className="text-red-500">*</span></Label>
                  <Input name="admissionHeight" type="number" step="0.1" defaultValue={childData.admissionHeight} placeholder="Enter Height" required />
                </div>
                <div>
                  <Label>Z-Score (SD)</Label>
                  <Input readOnly placeholder="Auto-calculated" />
                </div>
                <div>
                  <Label>Admission Odema <span className="text-red-500">*</span></Label>
                  <Select name="admissionOdema" defaultValue={childData.admissionOdema} required>
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
                  <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} placeholder="Enter MUAC" required />
                </div>
              </div>

              {/* Feeding Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Breast Feeding <span className="text-red-500">*</span></Label>
                  <Select name="breastFeeding" defaultValue={childData.breastFeeding} required>
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
                  <Select name="complementaryFeeding" defaultValue={childData.complementaryFeeding} required>
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
                  <Select name="appetiteTest" defaultValue={childData.appetiteTest} required>
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
                  {loading ? "Updating..." : "✔ Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}