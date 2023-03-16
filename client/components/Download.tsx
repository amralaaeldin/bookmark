import { useMemo } from 'react';
import Content from './Content';
import BrowserCard from './BrowserCard';

const DownloadData = [
  {
    id: 1,
    main: "add to chrome",
    sub: "minimum version 62",
    src: "/assets/logo-chrome.svg",
    alt: "logo-chrome",
  },
  {
    id: 2,
    main: "add to firefox",
    sub: "minimum version 55",
    src: "/assets/logo-firefox.svg",
    alt: "logo-firefox",
  },
  {
    id: 3,
    main: "add to opera",
    sub: "minimum version 46",
    src: "/assets/logo-opera.svg",
    alt: "logo-opera",
  },
];

function Download() {
  const btn = useMemo(() => {
    return <button className='btn btn-dark'>add & install extension</button>
  }, [])

  return (
    <main className='container download-section'>
      <Content>
        <h2>download the extension</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur in, neque alias fugit sed distinctio aliquid animi perferendis laudantium?</p>
      </Content>
      <div className="container-cards">
        {DownloadData.map(({ id, main, sub, src, alt }) => (
          <BrowserCard id={String(id)} key={id} main={main} sub={sub} src={src} alt={alt} btn={btn} />
        ))}
      </div>
    </main>
  );
}

export default Download;
