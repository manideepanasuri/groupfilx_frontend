import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TopAnimation } from "@/components/top-animaiton.tsx";

interface FaqItem {
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
  heading = "Frequently Asked Questions",
  items = [
    {
      question: "What is GroupFlix?",
      answer:
        "GroupFlix is a collaborative movie recommendation platform that helps friend groups, families, and couples easily agree on what to watch together using fair, consensus-driven recommendations.",
    },
    {
      question: "How does GroupFlix recommend movies for groups?",
      answer:
        "The app aggregates everyone’s preferences and group history using machine learning, then proposes movies based on a blend of all members’ tastes for truly democratic suggestions.",
    },
    {
      question: "Can I join or create multiple groups?",
      answer:
        "Yes. You can create or join as many viewing groups as you like, each with its own set of suggestions, trends, and chats.",
    },
    {
      question: "How do group members choose a movie?",
      answer:
        "After recommendations are generated, members vote in real time. The winner is locked in automatically, making decision easy and quick for everyone.",
    },
    {
      question: "Do I need to install anything?",
      answer:
        "No. GroupFlix is web-based and works in any modern browser, with mobile app support planned soon.",
    },
    {
      question: "Can I see what my friends and other groups are watching?",
      answer:
        "Yes. You can discover movies trending in your circles, see friend activity feeds, and get inspiration for your next watch party.",
    },
    {
      question: "Does GroupFlix support mood-based recommendations?",
      answer:
        "Absolutely. Simply set your group’s current mood before a session, and GroupFlix will suggest films that match the vibe.",
    },
    {
      question: "How do privacy and data work?",
      answer:
        "Your individual ratings and history are private unless you choose to share them in a group. GroupFlix follows strict privacy standards.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="py-12 px-3" id="FAQ's">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <TopAnimation>
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </TopAnimation>

          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq1 };
