import { SkillsSphere } from "./SkillsSphere";
import { sphereSkills } from "./skills";

const focusItems = [
  "Web Applications",
  "Interactive 3D",
  "Unity / Gameplay Systems",
] as const;

const primaryStatement =
  "I build at the intersection of software, games, and creative technology.";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-7xl px-6 pb-20 pt-6 sm:px-8 lg:px-12 lg:pb-28 lg:pt-12"
    >
      <div className="overflow-hidden rounded-2xl border border-accent/40 bg-surface">
        <div className="grid gap-8 p-5 sm:p-7 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-center lg:gap-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase text-muted">
              ABOUT
            </p>
            <h2
              id="about-title"
              className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl"
            >
              {primaryStatement}
            </h2>

            <div className="mt-5 space-y-3 text-sm leading-7 text-muted sm:text-base">
              <p>
                My experience spans full-stack web applications, interactive 3D
                tools, and Unity/C# game systems. I enjoy working through
                technical problems and shaping the architecture that makes
                those systems useful, reliable, and maintainable.
              </p>
              <p>
                Anzhelika Lab is my space to explore new technologies, build
                experiments, and share projects and lessons along the way. That
                includes learning about AI through hands-on experiments,
                alongside my ongoing work in web, interactive 3D, and games.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <p className="font-mono text-xs font-medium uppercase text-positive">
                CURRENT FOCUS
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium text-foreground sm:text-base">
                {focusItems.map((item, index) => (
                  <li key={item} className="inline-flex items-center gap-3">
                    <span>{item}</span>
                    {index < focusItems.length - 1 ? (
                      <span aria-hidden="true" className="text-positive">
                        ·
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <SkillsSphere skills={sphereSkills} />
            <div className="sr-only">
              <h3 id="technical-skills-title">Technical skills</h3>
              <ul aria-labelledby="technical-skills-title">
                {sphereSkills.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
