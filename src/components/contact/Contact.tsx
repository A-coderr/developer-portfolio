import { contactLinks, socialContactLinks, type SocialContactLink } from "@/data/contact";
import type { SVGProps } from "react";
import { ContactEmailCta } from "./ContactEmailCta";

const primaryStatement =
  "Looking for an engineer who can work across software, interactive systems and gameplay?";

const socialIcons: Record<SocialContactLink["label"], typeof GitHubIcon> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-theme="feature"
      className="bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="font-mono text-xs font-medium uppercase text-muted">
            CONTACT
          </p>
          <h2
            id="contact-title"
            className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {primaryStatement}
          </h2>
        </div>

        <div className="max-w-2xl lg:pt-8">
          <p className="text-base leading-8 text-muted sm:text-lg">
            I&apos;m currently open to full-time software engineering
            opportunities, including roles involving interactive 3D, Unity/C#,
            and gameplay systems.
          </p>

          <ContactEmailCta
            link={contactLinks.email}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-action px-5 text-base font-semibold text-on-action outline-none interactive-transition hover:bg-action-hover active:bg-action focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span>Get in touch</span>
            <span
              aria-hidden="true"
              className="interactive-transition group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            >
              &#8599;
            </span>
          </ContactEmailCta>

          <ul className="mt-7 flex items-center gap-3">
            {socialContactLinks.map((link) => {
              const Icon = socialIcons[link.label];

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-foreground outline-none interactive-transition hover:bg-accent-subtle focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.68c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.09 10.09 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M6.94 8.98H3.75v10.27h3.19V8.98ZM5.35 4a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7Zm13.9 9.37c0-3.09-1.65-4.52-3.86-4.52a3.34 3.34 0 0 0-3.02 1.66h-.04V8.98H9.27v10.27h3.19v-5.08c0-1.34.25-2.64 1.92-2.64 1.64 0 1.66 1.54 1.66 2.72v5h3.2v-5.88Z" />
    </svg>
  );
}
