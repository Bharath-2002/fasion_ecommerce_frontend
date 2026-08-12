import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'Handpicked',
    body: 'Every saree is chosen in person — held, unfolded, checked at the border and the pallu before it earns a place on the rack.',
  },
  {
    title: 'Every Budget',
    body: 'A ₹999 cotton gets the same attention as a ₹36,000 bridal silk. We would rather you found the right drape than the dearest one.',
  },
  {
    title: 'Honest Prices',
    body: 'One price, marked plainly, the same for everyone who walks in. No inflated tags waiting to be talked down.',
  },
];

const stats = [
  { value: '22', label: 'Sarees in stock' },
  { value: '6', label: 'Categories' },
  { value: '₹999', label: 'Starting price' },
  { value: '7', label: 'Day returns' },
];

export default function AboutPage() {
  return (
    <main className="ks-page">
      <div className="ks-eyebrow-row">
        <div className="ks-eyebrow">
          <span className="ks-eyebrow-rule" aria-hidden="true" />
          <h1 className="ks-eyebrow-text">About</h1>
        </div>
      </div>

      <section className="ks-about-lede">
        <h2 className="ks-about-title">
          A saree for <span style={{ color: 'var(--brown-deep)' }}>everyone</span> who walks in
        </h2>
        <p className="ks-about-intro">
          Baby Botique started from a simple frustration — that buying a saree usually means
          choosing between a shop that only stocks the expensive silks and one that only stocks
          the cheap prints. We wanted somewhere you could find both on the same rack, priced
          honestly, without anyone hovering over your shoulder.
        </p>
      </section>

      <div className="ks-about-figure">
        <img
          src="/collections/6.jpeg"
          alt="Mint green cotton saree draped over a carved wooden bench beside a brass lamp"
        />
      </div>

      <section className="ks-about-body">
        <p>
          We stock across six categories — everyday cotton, printed casuals, handloom and dyed
          pieces, pure silk, festive drapes and bridal. Some are woven on traditional looms, some
          are dyed by hand in small batches, and some are simply good, comfortable cotton meant to
          be worn on an ordinary Tuesday.
        </p>
        <p>
          New pieces arrive every week. What sells out rarely comes back in the same colour, which
          is either the best or the worst thing about buying from a small boutique, depending on
          how quickly you make up your mind.
        </p>
      </section>

      <section className="ks-pillars">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="ks-pillar">
            <h3 className="ks-pillar-title">{pillar.title}</h3>
            <p className="ks-pillar-body">{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="ks-statrow" aria-label="Baby Botique in numbers">
        {stats.map((stat) => (
          <div key={stat.label} className="ks-statcell">
            <p className="ks-statvalue">{stat.value}</p>
            <p className="ks-statlabel">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="ks-about-cta">
        <h2 className="ks-about-ctatitle">Come and have a look</h2>
        <p className="ks-about-ctabody">
          The full collection is online, and everything you see is in the shop too.
        </p>
        <Link to="/shop" className="ks-btn ks-btn--solid">
          Browse All Sarees
        </Link>
      </section>
    </main>
  );
}
