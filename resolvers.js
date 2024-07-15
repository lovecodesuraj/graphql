import db from "./db.js";

export const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(parent, { id }) {
            return db.games.find(game => game.id === id)
        },
        reviews() {
            return db.reviews;
        },
        review(parent, { id }) {
            return db.reviews.find(review => review.id === id)
        },
        authors() {
            return db.authors;
        },
        author(parent, { id }) {
            return db.authors.find(a => a.id === id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(author => author.id === parent.author_id)
        },
        game(parent) {
            return db.games.find(g => g.id === parent.game_id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.author_id)
        }
    },
    Mutation:{
        deleteGame(_,args){
           db.games=db.games.filter(g=>g.id!=args.id)
           return db.games;
        },
        deleteAuthor(_,args){
           db.authors=db.authors.filter(a=>a.id!=args.id)
           return db.authors
        },
        deleteReview(_,args){
           db.reviews=db.reviews.filter(r=>r.id!=args.id)
           return db.reviews
        },

        addGame(_,args){
            let game={
                ...args.game,
                id:Math.floor(Math.random()*10000).toString()
            }
            db.games=db.games.push(game)
            return game;
        },
        updateGame(_,args){
            db.games.map(g=>{
                if(g.id===args.id){
                    return {...g,...args.edits}
                }
                return g;
            })
        }
    }

}