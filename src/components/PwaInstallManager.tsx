import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const PwaInstallManager = () => {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState(false);

  const { needRefresh, updateServiceWorker } = useRegisterSW();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
      setIsInstallPromptVisible(true);
    };

    const handleInstalled = () => {
      setInstallPromptEvent(null);
      setIsInstallPromptVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPromptEvent) {
      return;
    }

    await installPromptEvent.prompt();
    await installPromptEvent.userChoice;
    setInstallPromptEvent(null);
    setIsInstallPromptVisible(false);
  };

  if (!isInstallPromptVisible && !needRefresh[0]) {
    return null;
  }

  return (
    <div className="fixed top-10 right-4 z-50 flex flex-col gap-2 sm:bottom-6">
      {isInstallPromptVisible ? (
        <Button onClick={installApp} size="sm" className="shadow-lg">
          Install app
        </Button>
      ) : null}

      {needRefresh[0] ? (
        <Button onClick={() => updateServiceWorker(true)} size="sm" variant="secondary" className="shadow-lg">
          Install updates
        </Button>
      ) : null}
    </div>
  );
};

export default PwaInstallManager;
