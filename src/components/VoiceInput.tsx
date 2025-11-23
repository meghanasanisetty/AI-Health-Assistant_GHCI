import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language: string;
}

const VoiceInput = ({ onTranscript, language }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false); // Track recording state
  const [recognition, setRecognition] = useState<any>(null); // Speech recognition instance

  useEffect(() => {
    // Check if browser supports webkitSpeechRecognition (Supported: Chrome/Android, Limited on iOS)
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      // Speech recognition language mapping (Indian languages support)
      const languageMap: Record<string, string> = {
        en: "en-US",
        hi: "hi-IN",
        bn: "bn-IN",
        te: "te-IN",
        ta: "ta-IN",
        mr: "mr-IN",
        gu: "gu-IN",
        kn: "kn-IN",
        ml: "ml-IN",
        pa: "pa-IN",
        or: "or-IN",
        as: "as-IN",
      };

      // Setup configuration
      recognitionInstance.continuous = false; // Stop listening after one input
      recognitionInstance.interimResults = false; // Only return final result
      recognitionInstance.lang = languageMap[language] || "en-US";

      // Callback: speech recognized successfully
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript); // Send recognized text back to parent
        setIsListening(false);
      };

      // Callback: handling errors like no speech or mic blocked
      recognitionInstance.onerror = (event: any) => {
        if (event.error === "no-speech") {
          toast.error("No speech detected. Please try again.");
        } else if (event.error === "not-allowed") {
          toast.error("Microphone access denied.");
        } else {
          toast.error("Could not understand speech.");
        }
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false); // Ensure UI resets if recognition stops
      };

      setRecognition(recognitionInstance);
    }
  }, [language, onTranscript]); // Reconfigure recognition when language changes

  // Toggle speech recognition ON/OFF
  const toggleListening = () => {
    if (!recognition) {
      toast.error("Voice input not supported on this device");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast.info("Listening... Speak now");
    }
  };

  return (
    <Button
      onClick={toggleListening}
      size="lg"
      className={`w-20 h-20 rounded-full transition-all ${
        isListening
          ? "bg-destructive animate-pulse"
          : "bg-primary hover:bg-primary/90"
      }`}
    >
      {isListening ? (
        <MicOff className="w-8 h-8 text-white" />
      ) : (
        <Mic className="w-8 h-8 text-white" />
      )}
    </Button>
  );
};

export default VoiceInput;


