import './DateRange.css';

type IRange = {
   range: string
}

export default function DateRange({range}:IRange) {

   return (
      <div className='sub-nav'>
        <div className='date-range'>
          <nav className={`date-tab ${range==='0' ? 'opened' : ''}`}>
            <button>Сьогодні</button>
          </nav>
          <nav className={`date-tab ${range==='1' ? 'opened' : ''}`}>
            <button>Завтра</button>
          </nav>
          <nav className={`date-tab ${range==='2' ? 'opened' : ''}`}>
            <button>Тиждень</button>
          </nav>
          <nav className={`date-tab ${range==='3' ? 'opened' : ''}`}>
            <button>Місяць</button>
          </nav>
          <nav className={`date-tab ${range==='4' ? 'opened' : ''}`}>
            <button>Погодинно</button>
          </nav>
        </div>
      </div>
   )
}