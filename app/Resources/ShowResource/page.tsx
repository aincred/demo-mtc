"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Image as ImageIcon, Play } from "lucide-react";

type Item = {
  id: string;
  title: string;
  mediaType: "pdf" | "image" | "video";
  mediaUrl: string;
};

type Section = {
  title: string;
  items: Item[];
};

type Category = {
  name: string;
  sections: Section[];
};

const DATA: Category[] = [
  {
    name: "Guidelines & Training Modules",
    sections: [
      {
        title: "Guidelines",
        items: [
          {
            id: "1",
            title: "FACILITATOR GUIDE FOR FACILITY BASED CARE OF CHILDREN WITH SAM- ENGLISH",
            mediaType: "pdf",
            mediaUrl: "/materials/facilitator_guide.pdf",
          },
          {
            id: "2",
            title: "GUIDELINE FOR ESTABLISHMENT OF NEW 15 MTCS 2016-17",
            mediaType: "pdf",
            mediaUrl: "/materials/guideline_establishment.pdf",
          },
          {
            id: "3",
            title: "IYCF GUIDELINE FOR MTCS DURING COVID-19 LETTER NO. 583 DATED 01-05-2020",
            mediaType: "pdf",
            mediaUrl: "/materials/iycf_guideline.pdf",
          },
          {
            id: "4",
            title: "MODULE-FACILITY BASED MANAGEMENT OF CHILDREN WITH SAM - HINDI",
            mediaType: "image",
            mediaUrl: "/materials/module_hindi.jpg",
          },
          {
            id: "5",
            title: "MoHFW F-SAM Operational Guidelines on SAM_2011",
            mediaType: "pdf",
            mediaUrl: "/materials/f_sam_guidelines.pdf",
          },
          {
            id: "6",
            title: "MUAC-GUIDELINE",
            mediaType: "pdf",
            mediaUrl: "/materials/muac_guideline.pdf",
          },
          {
            id: "7",
            title: "Guide23",
            mediaType: "pdf",
            mediaUrl: "/materials/guide23.pdf",
          },
        ],
      },
      {
        title: "Protocols",
        items: [
          {
            id: "8",
            title: "PROTOCOL POSTER - SET-A",
            mediaType: "image",
            mediaUrl: "/materials/protocol_a.jpg",
          },
          {
            id: "9",
            title: "PROTOCOL POSTER - SET-B",
            mediaType: "image",
            mediaUrl: "/materials/protocol_b.jpg",
          },
          {
            id: "10",
            title: "PROTOCOL POSTER - SET-D",
            mediaType: "pdf",
            mediaUrl: "/materials/protocol_d.pdf",
          },
        ],
      },
      {
        title: "Manuals",
        items: [
          {
            id: "11",
            title: "Participant Manual MTC MoHFW",
            mediaType: "pdf",
            mediaUrl: "/materials/participant_manual_mtc.pdf",
          },
          {
            id: "12",
            title: "Participant Manual_ Facility Based Management of Children With SAM- English",
            mediaType: "pdf",
            mediaUrl: "/materials/participant_manual_sam.pdf",
          },
          {
            id: "13",
            title: "Compendium of Letters",
            mediaType: "pdf",
            mediaUrl: "/materials/compendium_letters.pdf",
          },
          {
            id: "14",
            title: "Discharge Card",
            mediaType: "pdf",
            mediaUrl: "/materials/discharge_card.pdf",
          },
          {
            id: "15",
            title: "List of Malnutrition Treatment Centers",
            mediaType: "pdf",
            mediaUrl: "/materials/mtc_list.pdf",
          },
          {
            id: "16",
            title: "SAM Chart",
            mediaType: "pdf",
            mediaUrl: "/materials/sam_chart.pdf",
          },
          {
            id: "17",
            title: "MTC_MIS_User_Manual for MTC Staff",
            mediaType: "pdf",
            mediaUrl: "/materials/mtc_mis_user_manual.pdf",
          },
          {
            id: "18",
            title: "MTC MIS Manual for State and District Users",
            mediaType: "pdf",
            mediaUrl: "/materials/mtc_mis_state_manual.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Awareness Generation- Interpersonal Communication",
    sections: [
      {
        title: "MTC",
        items: [
          {
            id: "19",
            title: "Child Case Sheet",
            mediaType: "pdf",
            mediaUrl: "/materials/child_case_sheet.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Mass Media",
    sections: [
      {
        title: "Corona Virus",
        items: [
          {
            id: "20",
            title: "General Nutrition & Lifestyle Tips",
            mediaType: "pdf",
            mediaUrl: "/materials/nutrition_tips.pdf",
          },
          {
            id: "21",
            title: "Does Corona Virus Spread Through Food",
            mediaType: "pdf",
            mediaUrl: "/materials/corona_food.pdf",
          },
          {
            id: "22",
            title: "Alternatives To Fresh Foods In The Time of Covid 19",
            mediaType: "pdf",
            mediaUrl: "/materials/alternatives_fresh_foods.pdf",
          },
          {
            id: "23",
            title: "Can Corona Virus Spread Through Food Packaging?",
            mediaType: "pdf",
            mediaUrl: "/materials/corona_food_packaging.pdf",
          },
          {
            id: "24",
            title: "Covid 19 & Nutrition Myths & Facts",
            mediaType: "pdf",
            mediaUrl: "/materials/covid_nutrition_myths.pdf",
          },
          {
            id: "25",
            title: "Nutrition in Pregnancy During Covid 19",
            mediaType: "image",
            mediaUrl: "/materials/nutrition_pregnancy_covid.jpg",
          },
        ],
      },
      {
        title: "MTC MIS Training Video",
        items: [
          {
            id: "26",
            title: "MTC log in and data entry video",
            mediaType: "video",
            mediaUrl: "/materials/mtc_login_video.mp4",
          },
          {
            id: "27",
            title: "MTC MIS State and District user video",
            mediaType: "video",
            mediaUrl: "/materials/mtc_state_district_video.mp4",
          },
        ],
      },
    ],
  },
  {
    name: "Social Media",
    sections: [
      {
        title: "MTC",
        items: [
          {
            id: "28",
            title: "Communication",
            mediaType: "image",
            mediaUrl: "/materials/communication.jpg",
          },
          {
            id: "29",
            title: "new343",
            mediaType: "image",
            mediaUrl: "/materials/new343.jpg",
          },
        ],
      },
    ],
  },
  {
    name: "Case Studies",
    sections: [
      {
        title: "Case Studies",
        items: [
          {
            id: "30",
            title: "Case Study Format",
            mediaType: "pdf",
            mediaUrl: "/materials/case_study_format.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Other",
    sections: [
      {
        title: "MTC",
        items: [
          {
            id: "31",
            title: "Other Files",
            mediaType: "pdf",
            mediaUrl: "/materials/other_files.pdf",
          },
        ],
      },
    ],
  },
];

export default function CommunicationMaterialsPage() {
  const [selectedCategory, setSelectedCategory] = useState(DATA[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
            CATEGORIES
          </h2>
          <ul className="space-y-2">
            {DATA.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                    selectedCategory.name === cat.name
                      ? "bg-teal-700 text-white"
                      : "bg-teal-600/80 text-white hover:bg-teal-700"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl shadow p-6">
          <h1 className="text-xl font-bold text-indigo-700 mb-2">
            COMMUNICATION MATERIALS
          </h1>
          <h2 className="text-gray-600 font-semibold mb-4">
            {selectedCategory.name}
          </h2>

          {selectedCategory.sections.length === 0 ? (
            <p className="text-gray-500">No materials available.</p>
          ) : (
            selectedCategory.sections.map((section) => (
              <div key={section.title} className="mb-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1">
                  {section.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      {/* Media Preview */}
                      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                        {item.mediaType === "image" ? (
                          <Image
                            src={item.mediaUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : item.mediaType === "video" ? (
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Play size={40} />
                            <span className="mt-2 text-sm">VIDEO</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <FileText size={40} />
                            <span className="mt-2 text-sm">PDF</span>
                          </div>
                        )}
                      </div>

                      {/* Title + Open Button */}
                      <div className="p-4 text-center">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          {item.title}
                        </h4>
                        <a
                          href={item.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          {item.mediaType === "pdf" ? (
                            <>
                              <FileText size={14} />
                              Open PDF
                            </>
                          ) : item.mediaType === "video" ? (
                            <>
                              <Play size={14} />
                              Play Video
                            </>
                          ) : (
                            <>
                              <ImageIcon size={14} />
                              View Image
                            </>
                          )}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}