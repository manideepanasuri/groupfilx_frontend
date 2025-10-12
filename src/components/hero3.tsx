import { ArrowDownRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
}

const Hero3 = ({
                 heading = "Turn Words Into Videos Effortlessly",
                 description = "Type your script, and instantly get a shareable video complete with voiceover, scenes, and subtitles. No editing skills needed.",
                 buttons = {
    primary: {
      text: "Sign Up",
      url: "/signup",
    },
    secondary: {
      text: "Get Started",
      url: "/login",
    },
  },
}: Hero3Props) => {
  return (
    <section id="Hero3">
      <div className=" px-3 grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

          <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>

            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowDownRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>


        <div className="flex">
          <video
            src="/bg-video-for-story-dumps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="max-h-[600px] w-full rounded-md object-cover object-center lg:max-h-[800px]"
          />

        </div>

      </div>
    </section>
  );
};

export { Hero3 };
