import './TextBanner.scss'

export default function TextBanner() {
    return (
        <section className="description-app-section">
            <div className="description-container">
                <h1 className='title'><span className='ani1'>M</span>Y<span className='ani2'>MOVIE NATION</span></h1>
                <div className='paragraph'>
                    <div className="text-top">
                        One app for more flexibility
                    </div>
                    <ul className="animation-process">
                        <li><i className="fas fa-check"></i> Choosing your today's favorite movie</li>
                        <li><i className="fas fa-check"></i> Adding it to your wishlist</li>
                        <li><i className="fas fa-check"></i> Or watching it later?</li>
                        <li><i className="fas fa-check"></i> What others think? no problem</li>
                        <li><i className="fas fa-check"></i> Add/ invite friends</li>
                        <li><i className="fas fa-check"></i> And get some inspirations now</li>
                    </ul>
                </div>
            </div>
        </section> 
    )
}