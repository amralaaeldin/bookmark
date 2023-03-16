import { useState, useMemo, useCallback } from "react";
import Tag from "./Tag";
import Feature from "./Feature";

const features = [
  {
    id: 1,
    title: "simple bookmarking",
    heading: "bookmark in one click",
    src: "/assets/illustration-features-tab-1.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente reiciendis, quisquam sint minus id vitae maxime, quod esse modi animi ratione consequatur, magnam doloremque ad inventore molestias atque voluptatem.",
  },
  {
    id: 2,
    title: "speedy searching",
    heading: "intelligent search",
    src: "/assets/illustration-features-tab-2.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente reiciendis, quisquam sint minus id vitae maxime, quod esse modi animi ratione consequatur, magnam doloremque ad inventore molestias atque voluptatem.",
  },
  {
    id: 3,
    title: "easy sharing",
    heading: "share your bookmarks",
    src: "/assets/illustration-features-tab-3.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente reiciendis, quisquam sint minus id vitae maxime, quod esse modi animi ratione consequatur, magnam doloremque ad inventore molestias atque voluptatem.",
  },
];

function FeaturesContainer() {
  const [translate, setTranslate] = useState("0");
  const [active, setActive] = useState(features[0].id);
  const styles = { transform: `translateX(${translate}%)` };
  const activeStyles = { transform: `translateX(${-translate}%)` };

  const select = useCallback((index: number) => {
    setTranslate(`${index * -100}`);
    setActive(features[index].id);
  }, []);

  const btn = useMemo(() => {
    return <button className="btn btn-dark">more info</button>;
  }, []);

  return (
    <>
      <div className="links-container">
        {features.map(({ id, title }, index) => (
          <Tag
            onClick={select}
            key={id}
            activeId={active}
            id={id}
            index={index}
            title={title}
          />
        ))}
        <span style={activeStyles} className="underline-selected"></span>
      </div>

      <div style={styles} className="container-features">
        {features.map(({ id, heading, text, src }) => (
          <Feature btn={btn} key={id} heading={heading} text={text} src={src} />
        ))}
      </div>
    </>
  );
}

export default FeaturesContainer;
