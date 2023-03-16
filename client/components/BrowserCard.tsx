import Image from "next/image";

type BrowserCardProps = {
  src: string;
  main: string;
  sub: string;
  btn: JSX.Element;
  alt: string;
};

function BrowserCard({ src, main, sub, btn, alt }: BrowserCardProps) {
  return (
    <div className="card">
      <div className="browser-icon">
        <Image width="102" height="100" src={src} alt={alt} />
      </div>
      <h3>{main}</h3>
      <p>{sub}</p>
      <Image
        width="248"
        height="4"
        className="dotted-divider"
        src="/assets/bg-dots.svg"
        alt="dotted-divider"
      />
      {btn}
    </div>
  );
}

export default BrowserCard;
