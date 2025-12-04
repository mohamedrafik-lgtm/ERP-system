/**
 * Trainee Certificate Page (Server Component)
 * Main page for displaying trainee certificate
 */

import { CertificateClient } from "@/components/certificates/CertificateClient";

interface PageProps {
  params: {
    traineeId: string;
  };
}

export default function TraineeCertificatePage({ params }: PageProps) {
  const traineeId = parseInt(params.traineeId);
  
  return <CertificateClient traineeId={traineeId} />;
}