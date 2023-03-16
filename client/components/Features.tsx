import Content from './Content'
import FeaturesContainer from './FeaturesContainer'

function Features() {
  return (
    <main className="container features">
      <article className="features">
        <Content >
          <h2>features</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sapiente reiciendis, quisquam sint minus id vitae maxime, quod esse modi animi ratione consequatur, magnam doloremque ad inventore molestias atque voluptatem.</p>
        </Content>
      </article>
      <div className="wrapper">
        <FeaturesContainer />
      </div>
      <div className="shape"></div>
    </main>
  )
}

export default Features
