import { useState, useCallback } from "react";
import Image from "next/image";
import Content from "./Content";

const FAQData = [
  {
    id: 1,
    q: "What is Bookmark?",
    a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eveniet incidunt architecto voluptas aut at.",
  },
  {
    id: 2,
    q: "How can I request a new browser?",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime voluptate minima nihil at, labore totam nobis. Odit voluptatem aliquid ratione itaque. Nesciunt nisi provident earum.",
  },
  {
    id: 3,
    q: "Is there a mobile app?",
    a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eveniet incidunt architecto voluptas aut at. Odit voluptatem aliquid ratione itaque.",
  },
  {
    id: 4,
    q: "What about other Chromium browsers?",
    a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est reiciendis consectetur amet voluptate earum provident nesciunt dicta tempora placeat quibusdam.",
  },
];

function FAQ() {
  let [active, setActive] = useState<string[]>([]);

  const toggleActive = useCallback(
    (e: React.MouseEvent) => {
      if (active.includes(e.currentTarget.id)) {
        let activeIds = [...active];
        activeIds.splice(activeIds.indexOf(e.currentTarget.id), 1);
        setActive(activeIds);
      } else {
        setActive([...active, e.currentTarget.id]);
      }
    },
    [active]
  );

  return (
    <main className="container faq-section">
      <Content>
        <h2>frequently asked questions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
          consectetur in, neque alias fugit sed distinctio aliquid animi
          perferendis laudantium?
        </p>
      </Content>
      <div className="wrapper">
        {FAQData.map(({ id, q, a }) => (
          <div
            key={id}
            id={String(id)}
            onClick={(e) => toggleActive(e)}
            className="item"
          >
            <div
              className={
                active.includes(String(id)) ? "qa-content active" : "qa-content"
              }
            >
              <h3>
                {q}
                <div
                  className={
                    active.includes(String(id)) ? "icon active" : "icon"
                  }
                >
                  {active.includes(String(id)) ? (
                    <Image
                      width="12"
                      height="8"
                      src="/assets/icon-arrow-active.svg"
                      alt="icon-arrow"
                    />
                  ) : (
                    <Image
                      width="12"
                      height="8"
                      src="/assets/icon-arrow.svg"
                      alt="icon-arrow"
                    />
                  )}
                </div>
              </h3>
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FAQ;
