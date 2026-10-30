import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject, ProjectImageMedia } from "@/data/projects";
import {
  neonChaserHeroLabels,
  neonChaserLinks,
  neonChaserPowerUps,
  neonChaserSnapshot,
  persistentStateItems,
  powerUpArchitectureFacts,
  runtimeStateItems,
  saveLoadRecoverySteps,
  saveWriteSteps,
} from "@/data/neon-chaser-case-study";
import {
  AnchorCaseStudyLink,
  ComparisonColumn,
  ExternalCaseStudyLink,
  MetadataList,
  narrowCopy,
  PowerUpArchitectureDiagram,
  PowerUpGrid,
  RecoveryFlow,
  sectionSpacing,
  SectionHeading,
  TechnicalLabelList,
} from "./case-study/CaseStudyPrimitives";
import { LightweightYouTubeEmbed } from "./LightweightYouTubeEmbed";

interface NeonChaserCaseStudyProps {
  project: PortfolioProject;
}

function getProjectImage(project: PortfolioProject): ProjectImageMedia | null {
  const media = project.preview.media;

  return media?.kind === "image" ? media : null;
}

function CaseStudyHero({ project }: NeonChaserCaseStudyProps) {
  const image = getProjectImage(project);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:px-8 lg:px-12 lg:pb-20 lg:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center rounded-sm font-mono text-xs font-medium uppercase text-muted outline-none interactive-transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        &#8592; Back to projects
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase text-accent">
            GAME DEVELOPMENT
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-foreground/90">
            A neon-noir drift racer where physics-based driving meets high-speed
            chases and vehicle combat.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ExternalCaseStudyLink href={neonChaserLinks.steam}>
              View on Steam{" "}
              <span aria-hidden="true" className="ml-2">
                &#8599;
              </span>
            </ExternalCaseStudyLink>
            <AnchorCaseStudyLink href="#trailer">
              Watch Trailer{" "}
              <span aria-hidden="true" className="ml-2">
                &#9654;
              </span>
            </AnchorCaseStudyLink>
          </div>

          <div className="mt-8">
            <TechnicalLabelList labels={neonChaserHeroLabels} />
          </div>
        </div>

        {image ? (
          <div className="overflow-hidden rounded-lg border border-border/70 bg-surface">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 54vw, calc(100vw - 48px)"
              className="h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function NeonChaserCaseStudy({ project }: NeonChaserCaseStudyProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <CaseStudyHero project={project} />

        <section data-theme="light" className="mx-auto max-w-7xl rounded-2xl bg-background px-6 py-8 text-foreground sm:px-8 lg:px-12">
          <MetadataList items={neonChaserSnapshot} />
        </section>

        <section className={sectionSpacing} aria-labelledby="the-game-title">
          <SectionHeading id="the-game-title" title="The Game" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <p className={narrowCopy}>
              Neon Chaser is a neon-noir drift racing game built around
              physics-based driving, vehicle combat, and power-ups that can
              dramatically change the course of a race.
            </p>
            <p className={narrowCopy}>
              The gameplay combines vehicle handling and drifting with
              offensive, defensive, and disruptive abilities. A race can shift
              from a straight fight for position into a physics-driven encounter
              involving rockets, gunfire, oil-covered track surfaces, speed
              boosts, and stolen momentum.
            </p>
          </div>
        </section>

        <section
          id="trailer"
          className={sectionSpacing}
          aria-labelledby="trailer-title"
        >
          <SectionHeading
            id="trailer-title"
            title="See Neon Chaser in motion"
          />
          <div className="mt-8">
            <LightweightYouTubeEmbed
              title="Neon Chaser trailer"
              embedUrl={neonChaserLinks.trailerEmbed}
              externalUrl={neonChaserLinks.trailer}
            />
          </div>
        </section>

        <section
          className={sectionSpacing}
          aria-labelledby="contribution-title"
        >
          <SectionHeading id="contribution-title" title="My Contribution" />
          <div className="mt-8 max-w-4xl space-y-5">
            <p className={narrowCopy}>
              My work on Neon Chaser has focused heavily on gameplay systems and
              persistence. I developed and evolved the game&apos;s power-up
              architecture and its current set of five abilities, worked
              extensively on save/load functionality, contributed to full level
              implementation, calibrated vehicle behavior, and worked on runtime
              AI calibration that allows computer-controlled racers to respond
              to changes in vehicle capability.
            </p>
            <p className={narrowCopy}>
              The sections below focus on the engineering systems rather than
              providing a complete feature-by-feature development log.
            </p>
          </div>
        </section>

        <section className={sectionSpacing} aria-labelledby="powerups-title">
          <SectionHeading
            id="powerups-title"
            title="Five Power-Ups, One System"
          >
            <p className={narrowCopy}>
              Very different mechanics needed to behave like parts of the same
              game system.
            </p>
          </SectionHeading>
          <div className="mt-10">
            <PowerUpGrid powerUps={neonChaserPowerUps} />
          </div>
        </section>

        <section
          className={sectionSpacing}
          aria-labelledby="architecture-title"
        >
          <SectionHeading
            id="architecture-title"
            eyebrow="ENGINEERING DEEP DIVE 01"
            title="Five abilities, one gameplay architecture"
          >
            <p className={narrowCopy}>
              The challenge was not simply implementing five separate effects.
              Nitro modifies the player&apos;s own vehicle. The turret targets
              another racer and applies a temporary debuff. Rockets introduce
              projectiles and physics interaction. Oil creates hazards that
              remain on the track after deployment. OP Hack modifies both the
              user and another vehicle.
            </p>
            <p className={narrowCopy}>
              They still needed to participate in one consistent acquisition,
              activation, depletion, and removal system.
            </p>
          </SectionHeading>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <PowerUpArchitectureDiagram />
            <div>
              <h3 className="text-2xl font-semibold text-foreground">
                Architecture facts
              </h3>
              <ul className="mt-5 grid gap-3">
                {powerUpArchitectureFacts.map((fact) => (
                  <li key={fact} className="text-sm leading-6 text-muted">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 gap-8">
            <div className="space-y-8">
              <section aria-labelledby="vehicle-independent-title">
                <h3
                  id="vehicle-independent-title"
                  className="text-2xl font-semibold text-foreground"
                >
                  Keeping the vehicle independent of individual abilities
                </h3>
                <div className="mt-5 space-y-5">
                  <p className={narrowCopy}>
                    PowerupController works with the shared PowerupBehaviour
                    abstraction rather than containing a separate implementation
                    branch for Nitro, Oil Spill, Rocket Launcher, and every
                    other ability.
                  </p>
                  <p className={narrowCopy}>
                    That keeps acquisition, charge management, activation,
                    removal, and UI events separate from the mechanics of an
                    individual power-up.
                  </p>
                  <p className={narrowCopy}>
                    Stat-based effects use runtime modifiers that can be added
                    and removed by source, allowing vehicle systems to consume
                    the resulting values without needing to understand which
                    power-up produced them.
                  </p>
                  <p className={narrowCopy}>
                    This separation is deliberately practical rather than
                    absolute. Some systems still require weapon-specific
                    coordination, particularly when working with physical mounts
                    and effects that interact directly with rigidbodies or wheel
                    friction.
                  </p>
                </div>
              </section>

              <section aria-labelledby="cleanup-title">
                <h3
                  id="cleanup-title"
                  className="text-2xl font-semibold text-foreground"
                >
                  Shared lifecycle, effect-specific cleanup
                </h3>
                <div className="mt-5 space-y-5">
                  <p className={narrowCopy}>
                    One of the important design boundaries is cleanup.
                  </p>
                  <p className={narrowCopy}>
                    A shared controller can decide that a power-up has been lost
                    or exhausted, but it cannot know everything that a
                    particular effect changed.
                  </p>
                  <p className={narrowCopy}>
                    Nitro must remove its vehicle modifiers and stop its
                    effects. OP Hack must clean up modifications on both the
                    user and target. Weapon debuffs can expire independently.
                    Oil stops spawning when the ability ends, while slicks
                    already placed in the world continue through their own
                    lifetime. Projectiles remove themselves after impact or
                    expiry.
                  </p>
                  <p className={narrowCopy}>
                    The shared architecture therefore owns the power-up
                    lifecycle, while individual effects remain responsible for
                    cleaning up the resources and state they create.
                  </p>
                  <p className={narrowCopy}>
                    That balance keeps the common API useful without forcing
                    five fundamentally different mechanics into one oversized
                    implementation.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className={sectionSpacing} aria-labelledby="persistence-title">
          <SectionHeading
            id="persistence-title"
            eyebrow="ENGINEERING DEEP DIVE 02"
            title="Persist the progression, not the simulation"
          >
            <p className={narrowCopy}>
              A racing game contains a large amount of runtime state, but most
              of it should not survive after a race or application session ends.
            </p>
            <p className={narrowCopy}>
              Neon Chaser&apos;s persistence system focuses on the state that
              represents the player&apos;s longer-term progression and
              configuration.
            </p>
          </SectionHeading>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <ComparisonColumn
              title="Persist"
              items={persistentStateItems}
              accent
            />
            <ComparisonColumn title="Runtime" items={runtimeStateItems} />
          </div>
        </section>

        <section
          className={sectionSpacing}
          aria-labelledby="save-recovery-title"
        >
          <SectionHeading
            id="save-recovery-title"
            eyebrow="ENGINEERING DEEP DIVE 03"
            title="A save system designed to fail safely"
          >
            <p className={narrowCopy}>
              Saving progression creates a different engineering problem from
              saving it successfully once: what happens when something goes
              wrong during the write or the next time the game attempts to load?
            </p>
            <p className={narrowCopy}>
              Neon Chaser uses JSON files stored under Unity&apos;s persistent
              data path. The system maintains both a primary save and a backup
              and writes through a temporary file before moving the completed
              data into place.
            </p>
          </SectionHeading>

          <div className="mt-10">
            <RecoveryFlow
              writeSteps={saveWriteSteps}
              loadSteps={saveLoadRecoverySteps}
            />
          </div>
          <div className="mt-8 max-w-4xl space-y-5">
            <p className={narrowCopy}>
              If the primary file is missing, empty, or unreadable, the loader
              attempts the backup. A successful backup can be used to restore
              the main save. If neither can be loaded, the game continues using
              fresh-session defaults instead of preventing the player from
              starting.
            </p>
            <p className={narrowCopy}>
              Fallback behavior also handles cases such as missing vehicle
              builds or vehicle selections that no longer resolve cleanly
              against the available catalog.
            </p>
            <p className="text-xl font-semibold leading-8 text-foreground">
              Persistence is therefore treated as a recovery problem, not only a
              serialization problem.
            </p>
          </div>
        </section>

        <section className={sectionSpacing} aria-labelledby="reflection-title">
          <div className="max-w-4xl border-l border-accent pl-6 sm:pl-8">
            <p className="font-mono text-xs font-medium uppercase text-accent">
              ENGINEERING REFLECTION
            </p>
            <h2
              id="reflection-title"
              className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            >
              Where the persistence system can evolve next
            </h2>
            <div className="mt-6 space-y-5">
              <p className={narrowCopy}>
                The current save schema contains a version field, but it does
                not yet have a generalized migration pipeline for older save
                structures. Compatibility is currently handled through defaults,
                null checking, fallbacks, and targeted filtering.
              </p>
              <p className={narrowCopy}>
                As the game and its persistent data continue to evolve, explicit
                version-based migrations would provide a stronger path for
                handling structural changes such as renamed identifiers,
                changing progression data, or evolving customization schemas.
              </p>
              <p className={narrowCopy}>
                This is an area where the current implementation is
                intentionally practical, but where the needs of a longer-lived
                production game could justify additional infrastructure.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-6 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-28 lg:pt-20"
          aria-labelledby="final-cta-title"
        >
          <div className="border-t border-border/70 pt-10">
            <h2
              id="final-cta-title"
              className="max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              See Neon Chaser in action
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Neon Chaser continues to bring together physics-based racing,
              vehicle combat, gameplay systems, persistence, adaptive AI, and
              level development inside one evolving Unity project.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ExternalCaseStudyLink href={neonChaserLinks.steam}>
                View on Steam{" "}
                <span aria-hidden="true" className="ml-2">
                  &#8599;
                </span>
              </ExternalCaseStudyLink>
              <AnchorCaseStudyLink href="#trailer">
                Watch Trailer{" "}
                <span aria-hidden="true" className="ml-2">
                  &#9654;
                </span>
              </AnchorCaseStudyLink>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
