import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link, Share, Copy, Check } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';
import { LevelProgress } from "@/types/user";

interface ProfileStatsWidgetProps {
  userId?: string | undefined;
  levelProgress: LevelProgress | undefined;
}

const calculateProgressPercentage = (experiencePoints: number): number => {
  const XP_PER_LEVEL = 500;
  const xpInCurrentLevel = experiencePoints % XP_PER_LEVEL;
  return Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100);
};

function ProfileStatsWidget({ userId, levelProgress }: ProfileStatsWidgetProps) {
  const router = useRouter();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const profileUrl = `${window.location.origin}/profile/${userId}`;
  const progressPercentage = levelProgress 
    ? calculateProgressPercentage(levelProgress.experiencePoints)
    : 0;
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handlePublicView = () => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="flex items-center gap-10 px-4 bg-gray-50 border-2 border-gray-300 shadow-xl rounded-lg">
      <div className="flex flex-col p-2 max-w-md mx-auto">
        <div className="flex flex-col w-20 space-y-2">
          <span className="text-sm font-bold text-gray-800">
            Nivel {levelProgress?.level}
          </span>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {progressPercentage}%
          </span>
        </div>
      </div>
      {
        userId && (
                <>
                <div
            className="h-12 w-[1.2px]"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #9CA3AF 20%, #9CA3AF 80%, transparent 100%)' }} /><div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 px-4 gap-2"
                  onClick={handlePublicView}
                >
                  <Link className="h-4 w-4" />
                  Vista Pública
                </Button>
                <Button
                  className="flex-1 px-4 gap-2"
                  onClick={() => setShowShareDialog(true)}
                >
                  <Share className="h-4 w-4" />
                  Compartir Perfil
                </Button>
              </div>
            </div><Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Compartir Perfil</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Alert className="flex items-center justify-between p-6">
                    <span className="text-sm break-all">{profileUrl}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(profileUrl)}
                      className="ml-2"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </Alert>
                </div>
              </DialogContent>
            </Dialog>
            </>
        )
      }

    </div>
  );
}

export default ProfileStatsWidget;
