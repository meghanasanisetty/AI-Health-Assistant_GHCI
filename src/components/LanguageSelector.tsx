import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTranslation, type Language } from "@/lib/translations";

// List of supported languages for selection
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
];

interface LanguageSelectorProps {
  // Current selected language code
  selectedLanguage: string;
  // Function to update language in parent component
  onLanguageChange: (language: string) => void;
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    // Card container for better UI grouping
    <div className="bg-card rounded-2xl p-6 shadow-soft">
      
      {/* Header section with icon + title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Languages className="w-5 h-5 text-primary" />
        </div>
        {/* Title dynamically translated */}
        <h2 className="text-lg font-semibold">
          {getTranslation(selectedLanguage as Language, "chooseLanguage")}
        </h2>
      </div>

      {/* Dropdown UI for language selection */}
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full h-12 text-base">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>

        {/* Render list of languages from the array */}
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code} 
              className="text-base py-3"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
