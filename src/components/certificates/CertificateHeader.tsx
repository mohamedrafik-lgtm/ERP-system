/**
 * Certificate Header Component (Server Component)
 * Displays logo and trainee photo
 */

import Image from "next/image";
import logo from "@/img/502585454_122235753458244801_413190920156398012_n-removebg-preview.png";
import { TraineeAvatar } from "@/components/shared";

interface CertificateHeaderProps {
  photoUrl: unknown;
  traineeName: string;
}

export function CertificateHeader({ photoUrl, traineeName }: CertificateHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-12">
      <div className="w-32 h-32 border-4 border-orange-500 rounded-2xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
        <Image
          src={logo}
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      
      <div className="border-4 border-blue-600 rounded-lg overflow-hidden">
        <TraineeAvatar 
          photoUrl={photoUrl}
          name={traineeName}
          size="xl"
          showFallbackText={true}
        />
      </div>
    </div>
  );
}