import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UA LabSign — Laboratory Attendance System | Ian Macabulos",
  description:
    "A zero-trust web and mobile laboratory attendance system using device-bound ECDSA P-256 signatures, instant geofencing, and role-based academic workflows.",
  alternates: {
    canonical: "/projects/ua-attendance",
  },
  openGraph: {
    title: "UA LabSign — Laboratory Attendance System | Ian Macabulos",
    description:
      "A zero-trust web and mobile laboratory attendance system using device-bound ECDSA P-256 signatures, instant geofencing, and role-based academic workflows.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function UAAttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}