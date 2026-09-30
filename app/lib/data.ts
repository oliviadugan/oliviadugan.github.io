// All site content lives here. Edit this file to update the site;
// components only render what's below. Empty lists hide their section.

export const profile = {
  name: "Olivia Dugan",
  firstName: "Olivia",
  lastName: "Dugan",
  tagline: "Sports media, video, and the people behind the game.",
  label: "Storyteller",
  school: "UC Berkeley",
  majors: "Media Studies & Sociology",
  graduating: "Class of 2028",
  location: "Berkeley, CA",
  email: "oliviajaedugan@icloud.com",
  linkedin: "https://www.linkedin.com/in/oliviadugan",
  // Drop resume.pdf into /public and set this to "/resume.pdf" to show the button.
  resumeUrl: null as string | null,
};

export const intro =
  "I tell stories about sport and the people inside it — with a camera, on the page, and from the coach's side of the court.";

export const about = [
  "I'm a student at UC Berkeley majoring in Media Studies and double majoring in Sociology. I'm passionate about digital storytelling, brand activism, and social impact.",
  "Beyond academics, I have a background in media production — including filming a local TV ad on the sociological dangers of mass screentime. My experience ranges from field marketing in the tech sector to leadership in competitive athletics and global fundraising.",
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "$20K+", label: "raised for an all-girls school in Kenya" },
  { value: "500+", label: "sleeping mats woven from recycled plastic" },
  { value: "3×", label: "Marin IJ Prep of the Week" },
  { value: "15 hrs", label: "a week coaching an elite U11 team" },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
  photo?: "huddle" | "coffee";
  photoAlt?: string;
};

export const experiences: Experience[] = [
  {
    role: "Head Coach, U11 Competitive",
    org: "Marin Volleyball",
    period: "Nov 2023 – Present",
    bullets: [
      "Lead an elite travel team through intensive 15-hour weekly training cycles and tournament play.",
      "Cultivated a high-performance team culture centered on discipline and technical mastery.",
      "Act as primary liaison between organizational directors and families for travel logistics.",
    ],
    photo: "huddle",
    photoAlt: "Olivia's U11 team in a huddle on the court",
  },
  {
    role: "Co-Director of Social Media",
    org: "Alpha Phi, UC Berkeley",
    period: "2026 – Present",
    bullets: [],
  },
  {
    role: "Client Relations & Field Marketing",
    org: "Addictive Coffee",
    period: "Jun 2023 – Aug 2024 · Seasonal",
    bullets: [
      "Managed B2B outreach and tasting events for high-profile tech companies in the Bay Area.",
      "Increased brand awareness by coordinating on-site “Coffee Culture” activations, leading to a 15% increase in client subscription renewals.",
      "Streamlined event logistics to maximize efficiency during peak corporate break-room hours.",
    ],
    photo: "coffee",
    photoAlt: "Coffee being poured at an Addictive Coffee tasting event",
  },
];

export type Project = { title: string; role: string; body: string };

export const impact: Project[] = [
  {
    title: "Daraja Club",
    role: "Founder",
    body: "Established a school chapter to support an all-girls school in Kenya, fundraising over $20,000 for food and housing.",
  },
  {
    title: "The PLARN Project",
    role: "Director",
    body: "Directed the weaving of 500+ sleeping mats for the local homeless community using recycled plastic.",
  },
];

export type Honor = { title: string; detail: string };

export const honors: Honor[] = [
  { title: "Student-Athlete Scholarship", detail: "Varsity volleyball captain, 4.6 GPA" },
  { title: "Marin IJ “Prep of the Week”", detail: "Three-time winner" },
  { title: "Alumni Scholarship", detail: "Legacy scholarship, swim program" },
];

export const skills: Record<string, string[]> = {
  Production: ["Digital film production", "Final Cut Pro", "Ad strategy", "Scripting for local TV"],
  Communication: ["Public speaking", "B2B relations", "Fundraising ($20K+)", "Team leadership"],
  Tools: ["Social media analytics", "Google Workspace", "Canva", "Project management"],
};

// Video work. Each item shows as a click-to-play card, so nothing heavy loads
// until someone asks for it. Supported: YouTube or Vimeo links.
export type ReelItem = { title: string; context: string; url: string; year: string };

export const reel: ReelItem[] = [];
