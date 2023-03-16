import Image from "next/image";
import Content from "./Content";

type FeatureProps = {
  btn: JSX.Element;
  heading: string;
  text: string;
  src: string;
};

function Feature({ btn, heading, text, src }: FeatureProps) {
  return (
    <section id={heading[0]} className="container-feature">
      <div className="img">
        <Image priority width="536" height="346" src={src} alt={heading} />
      </div>
      <Content>
        <h3>{heading}</h3>
        <p>{text}</p>
        {btn}
      </Content>
    </section>
  );
}

export default Feature;
