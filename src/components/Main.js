import React from 'react';
import Review from "./Review.js";

function Main({ reviews }) {

    return(
        <main className="content">
            <section className="elements">
                {reviews.map((item) => {
                        return(
                            <Review
                                key={item.id}
                                review={item}
                            />
                        )
                    } 
                )}

            </section>
        </main>
    )
}
export default Main;