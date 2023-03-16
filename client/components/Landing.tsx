import Image from "next/image";

function Landing() {
  return (
    <main className="container landing">
      <div className="content">
        <h1>a simple bookmark manager</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          sapiente reiciendis, quisquam sint minus id vitae maxime, quod esse
          modi animi ratione consequatur, magnam doloremque ad inventore
          molestias atque voluptatem.
        </p>
        <div className="btns">
          <button className="btn btn-dark">Get it on Chrome</button>
          <button className="btn btn-light">Get it on Firefox</button>
        </div>
      </div>
      <div className="img">
        <Image
          priority
          width="657"
          height="466"
          src="/assets/illustration-hero.svg"
          alt="landing-img"
        />
      </div>
      <div className="shape"></div>
    </main>
  );
}

export default Landing;
