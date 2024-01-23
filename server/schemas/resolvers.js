// How do we get data back?

// test data
const pets = [{
    type: "cat",
},
{
    type: "dog",
},
{
    type: "bird",
}]

const resolvers = {
    Query: {
        pet() {
            console.log(pets);
            return pets;
        }
    }
}

module.exports = resolvers;