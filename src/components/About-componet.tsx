import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

const About = () => {
  return (
    <section className="w-full px-3 py-12" id="about-us">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          About GroupFlix
        </h1>
        <p className="text-sm text-muted-foreground md:text-base mb-3">
          <span className="font-semibold">GroupFlix</span> is a collaborative movie recommendation platform designed so groups of friends, families, and couples can effortlessly choose what to watch together—democratically and enjoyably.
        </p>
        <p className="text-sm text-muted-foreground md:text-base">
          Our system uses intelligent algorithms to blend everyone’s tastes, generate consensus-driven suggestions, and bring group movie nights to life. From real-time voting to mood-based picks and trending recommendations from your circles, GroupFlix redefines the group streaming experience.
        </p>

        <h2 className="font-semibold md:mb-2 md:text-xl mt-8 mb-2">
          Why GroupFlix?
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-1 text-sm text-muted-foreground md:text-base">
          <li>Aggregates preferences for group-centric recommendations</li>
          <li>Lets everyone vote and finalize what to watch</li>
          <li>Recommends movies that fit your group’s current mood</li>
          <li>Shows weekly trends and what’s popular in your circles</li>
          <li>Comment, chat, and plan movie nights together</li>
        </ul>

        <h2 className="font-semibold md:mb-2 md:text-xl mt-8 mb-2">
          Who’s Behind GroupFlix?
        </h2>
        <p className="mb-4 text-sm text-muted-foreground md:text-base">
          GroupFlix was built by <span className="font-semibold">Anasuri Manideep</span>, <span className="font-semibold">Saladi Dinesh</span>, and <span className="font-semibold">Pinniti Ruthvik</span>—a passionate team from NIT Warangal set on solving the challenge of group decision-making through innovative engineering and design.
        </p>

        <div className="flex space-x-4 mt-6">
          <Button variant="outline" asChild>
            <Link
              to="https://github.com/manideepanasuri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition"
            >
              <Github className="w-5 h-5" />
              Manideep Anasuri's GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              to="https://github.com/Dinesh-Saladi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition"
            >
              <Github className="w-5 h-5" />
              Dinesh Saladi's GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              to="https://github.com/ruthvik-2006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition"
            >
              <Github className="w-5 h-5" />
              Ruthvik Pinniti's GitHub
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default About;
