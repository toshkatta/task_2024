import './styles.scss';

const Performance = () => {
  return (
    <section className="performance">
      <div className="title">
        <h3 className='text-3xl'>Performance</h3>
        <span className="text-sm">Update September 13.21 7:27 PM GMT+2</span>
      </div>

      <ul className="performance-indicators">
        <li>
          <span className="text-sm">Past year</span>
        </li>

        <li>
          <span className="text-sm">Bitcoin</span>
          <span className="text-sm">+334%</span>
        </li>

        <li>
          <span className="text-sm">Market</span>
          <span className="text-sm">+476%</span>
        </li>
      </ul>
    </section>
  );
};

export default Performance;
