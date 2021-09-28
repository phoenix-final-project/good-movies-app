import "./TextBanner.scss";

export default function TextBanner() {
    return (
        <section className="description-app-section">
            <div className="description-container">
                <div className="paragraph">
                    <div className="text-top">
                        The right place for all movie lovers
                    </div>
                    <ul className="animation-process">
                        <li>
                            <i className="fas fa-video"></i> Add movies to your
                            wishlist
                        </li>
                        <li>
                            <i className="fas fa-video"></i> Build community
                            with other people who also love movies
                        </li>
                        <li>
                            <i className="fas fa-video"></i> Invite a friend to
                            watch a movie that he or she will certainly enjoy
                        </li>
                        <li>
                            <i className="fas fa-video"></i> Discover new movies
                            and classics based on your preferences
                        </li>

                        <li>
                            <i className="fas fa-video"></i> Pick a random movie from your wishlist
                        </li>
                        <li>
                            <i className="fas fa-video"></i> And get some
                            inspirations now
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
