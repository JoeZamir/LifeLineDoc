import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const drMarthaLines = [
    { id: 1, line: "Hello." },
    { id: 2, line: "Calm down Patrick. Tell me what is happening." },
    { id: 3, line: "Okay, stay calm. I can see where you are right now." },
    { id: 4, line: "Okay. I need you to check if he's breathing. Tilt his head back slightly and look at his chest. Can you see it moving?" },
    { id: 5, line: "Can one of the students check the Teachers bag if there are any drugs please?" },
    { id: 6, line: "Alright. Now check for a pulse. Place two fingers on the side of his neck. Can you feel a heartbeat?" },
    { id: 7, line: "How do I send the status report to the ambulance?" },
    { id: 8, line: "Impressive. We need to start CPR immediately. Have you ever done it before?" },
    { id: 9, line: "It's alright, I will guide you." },
    { id: 10, line: "Put the heel of one hand in the center of his chest. Put your other hand on top and interlock your fingers." },
    { id: 11, line: "Dyslipidemia! Now on how to Position your body: Keep your arms straight and shoulders directly above your hands. Good, you are doing very good. Now, we Start" },
    { id: 12, line: "compressions: Push hard and fast about 2 inches deep, at a rate of 100-120 compressions per minute. Let the chest fully come back up after each push." },
    { id: 13, line: "I'm seeing a notification for file sharing with the ambulance." },
    { id: 14, line: "Yes." },
    { id: 15, line: "Impressive, Keep going continuously. Don't stop. I can see the live location of the ambulance. It's on the way." },
    { id: 16, line: "Even if you get tired, try to keep compressions going until help arrives, or he shows signs of life. They are not very far." },
    { id: 17, line: "Good. Keep a steady rhythm. If possible, count out loud: one, two, three, It helps maintain the right speed." },
    { id: 18, line: "Excellent. Keep pushing. Again, Don't stop until trained personnel arrive or he starts, if he starts breathing or moves." },
    { id: 19, line: "You can stop CPR and place him on his side, It's a recovery position. Keep monitoring him. I will be right here and the ambulance is on it's way." },
    { id: 20, line: "No, thank you. You have just saved a life. You are a very brave young man." }
];

const DrTranscript = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background px-5 pt-6 pb-24">
            <header className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <div>
                    <h1 className="text-xl font-display font-bold text-foreground">Dr. Martha — Transcript</h1>
                    <p className="text-xs text-muted-foreground">Full conversation. Scroll to review.</p>
                </div>
            </header>

            <main>
                <div className="max-w-lg mx-auto">
                    <div className="medical-card px-4 py-3">
                        <div className="max-h-[70vh] overflow-y-auto space-y-3 pr-2">
                            {drMarthaLines.map((l) => (
                                <div key={l.id} className="text-foreground text-sm leading-relaxed">
                                    {l.line}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DrTranscript;
