const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
 GraphQLSchema,
 GraphQLObjectType,
 GraphQLString,
 GraphQLList,
 GraphQLNonNull,
 GraphQLInt
} = require('graphql')
const app = express()

const authors = [
 { id: 1, name: '九把刀'},
 { id: 2, name: '豆導'},
 { id: 3, name: '李安'},
]

const movies = [
 { id: 1, name: '殺手歐陽盆栽', authorId: 1 },
 { id: 2, name: '那些年，我們一起追的女孩', authorId: 1 },
 { id: 3, name: '第一個人咖啡', authorId: 1 },
 { id: 4, name: '艋舺', authorId: 2 },
 { id: 5, name: '軍中樂園', authorId: 2 },
 { id: 6, name: '綠巨人', authorId: 3 },
 { id: 7, name: '斷背山', authorId: 3 },
 { id: 8, name: '色戒', authorId: 3 },
]

const MovieType = new GraphQLObjectType({
  name: 'movie',
  description: 'this represents a movie by an author',
  fields: () => ({
   id: { type: GraphQLNonNull(GraphQLInt)},
   name: { type: GraphQLNonNull(GraphQLString)},
   authorId: { type: GraphQLNonNull(GraphQLInt)},
   author: {
    type: AuthorType,
    resolve: (movie) => {
     return authors.find(author => author.id === movie.authorId)
    }
   }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'author',
  description: 'this represents a author of movie',
  fields: () => ({
   id: { type: GraphQLNonNull(GraphQLInt)},
   name: { type: GraphQLNonNull(GraphQLString)},
   movie:{
    type: new GraphQLList(MovieType),
    resolve: (author) => {
     return movies.filter(movie => author.id === movie.authorId)
    }
   }
  })
})

const RootQueryType = new GraphQLObjectType({
 name: 'Query',
 description: 'Root Query',
 fields: () => ({
  movie: {
   type: MovieType,
   description: 'a single movie',
   args: {
    id: { type: GraphQLInt }
   },
   resolve:(parent, args) => movies.find( movie => movie.id === args.id)
  },
  movies: {
   type: GraphQLList(MovieType),
   description: 'list of all movies',
   resolve: () => movies
  },
  author: {
   type: AuthorType,
   description: 'a single author',
   args: { 
    id: { type: GraphQLInt }
   },
   resolve: (parent, args) => authors.find(author => author.id === args.id)
  },
  authors: {
   type: GraphQLList(AuthorType),
   description: 'list of all authors',
   resolve: () => authors
  }
 })
})

const RootMutationType = new GraphQLObjectType({
 name: 'Mutation',
 description: 'Root Mutation',
 fields: () => ({
  addMovie: {
   type: MovieType,
   description: 'Add a movie',
   args: {
    name: { type: GraphQLNonNull(GraphQLString)},
    authorId: {type: GraphQLNonNull(GraphQLInt)}
   },
   resolve: (parent, args) => {
    const movie = { id: movies.length + 1, name: args.name, authorId: args.authorId }
    movies.push(movie)
    return movie
   }
  },
  addAuthor: {
   type: MovieType,
   description: 'Add an author',
   args: {
    name: { type: GraphQLNonNull(GraphQLString)}
   },
   resolve:(parent, args) => {
    const author = {id: authors.length + 1,name: args.name }
    authors.push(author)
    return author
   }   
  }
 })
})

const schema = new GraphQLSchema({
 query: RootQueryType,
 mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
 schema: schema,
 graphiql: true
}))
app.listen(5000,()=>{console.log('server Running')})