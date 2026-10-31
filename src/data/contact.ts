export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface EmailContactLink extends ContactLink {
  address: string;
  subject: string;
  body: string;
}

export interface SocialContactLink extends ContactLink {
  label: "GitHub" | "LinkedIn";
  external: true;
}

const emailAddress = "kostyukanzhelika@gmail.com";
const emailSubject = "Portfolio inquiry";
const emailBody = [
  "Hi Anzhelika,",
  "",
  "I came across your portfolio and would like to connect about a software role, project, or collaboration.",
  "",
  "Best,",
].join("\n");

function buildMailtoHref(address: string, subject: string, body: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const contactLinks: {
  email: EmailContactLink;
  github: SocialContactLink;
  linkedin: SocialContactLink;
} = {
  email: {
    label: "Email",
    href: buildMailtoHref(emailAddress, emailSubject, emailBody),
    address: emailAddress,
    subject: emailSubject,
    body: emailBody,
  },
  github: {
    label: "GitHub",
    href: "https://github.com/A-coderr",
    external: true,
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anzhelikakostyuk",
    external: true,
  },
};

export const socialContactLinks = [
  contactLinks.github,
  contactLinks.linkedin,
] as const;

export const resumeLink = {
  label: "Download Resume",
  href: "/resume/resume_anzhelika_kostyuk.pdf",
} as const;
