import './TextBanner.scss'

export default function TextBanner({ title, paragraph }) {
    return (
        <section className="description-app-section">
            <div className="description-container">
                <h1 className='title'>{title}</h1>
                <p className='paragraph'>{paragraph}</p>
            </div>
        </section> 
    )
}
