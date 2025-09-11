import { Phone, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function SOSButton() {
  const [isPulsing, setIsPulsing] = useState(false);
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);

  const handleSOSClick = () => {
    setShowEmergencyOptions(!showEmergencyOptions);
  };

  const handleEmergencyCall = () => {
    // In a real app, this would trigger an emergency call
    window.open('tel:112'); // Emergency number (works in most countries)
    setShowEmergencyOptions(false);
  };

  // Pulsing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {showEmergencyOptions && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64 space-y-3 animate-in fade-in-20">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-semibold">Emergency Assistance</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Call emergency services for immediate help.
          </p>
          <div className="flex flex-col gap-2">
            <Button 
              variant="destructive" 
              className="w-full justify-start gap-2"
              onClick={handleEmergencyCall}
            >
              <Phone className="h-4 w-4" />
              Call Emergency (112)
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => setShowEmergencyOptions(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      <button
        onClick={handleSOSClick}
        className={`
          relative flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-lg
          hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          ${isPulsing ? 'animate-pulse' : ''}
        `}
        aria-label="Emergency SOS"
      >
        <div className="absolute inset-0 rounded-full bg-red-600 opacity-75 animate-ping"></div>
        <Phone className="h-6 w-6" />
      </button>
    </div>
  );
}
