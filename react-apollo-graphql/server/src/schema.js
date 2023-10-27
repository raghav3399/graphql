import { find, remove } from 'lodash'

const people = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
]
  
let cars = [
    {
        id: '1',
        year: '2019',
        make: 'Toyota',
        model: 'Corolla',
        price: '40000',
        personId: '1'
    },
    {
        id: '2',
        year: '2018',
        make: 'Lexus',
        model: 'LX 600',
        price: '13000',
        personId: '1'
    },
    {
        id: '3',
        year: '2017',
        make: 'Honda',
        model: 'Civic',
        price: '20000',
        personId: '1'
    },
    {
        id: '4',
        year: '2019',
        make: 'Acura ',
        model: 'MDX',
        price: '60000',
        personId: '2'
    },
    {
        id: '5',
        year: '2018',
        make: 'Ford',
        model: 'Focus',
        price: '35000',
        personId: '2'
    },
    {
        id: '6',
        year: '2017',
        make: 'Honda',
        model: 'Pilot',
        price: '45000',
        personId: '2'
    },
    {
        id: '7',
        year: '2019',
        make: 'Volkswagen',
        model: 'Golf',
        price: '40000',
        personId: '3'
    },
    {
        id: '8',
        year: '2018',
        make: 'Kia',
        model: 'Sorento',
        price: '45000',
        personId: '3'
    },
    {
        id: '9',
        year: '2017',
        make: 'Volvo',
        model: 'XC40',
        price: '55000',
        personId: '3'
    }
]
  
const typeDefs = `
    type People {
        id: String!
        firstName: String
        lastName: String
    }

    type Cars {
        id: String!
        year: Int
        make: String
        model: String
        price: Float
        personId: String!
    }

    type PersonWithCars {
        person: People
        cars: [Cars]
    }    

    type Query {
        people: [People]
        cars: [Cars]
        person(id: String!): People
        car(id: String!): Cars
        personWithCars(id: String!): PersonWithCars
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): People
        updatePerson(id: String!, firstName: String!, lastName: String!): People
        removePerson(id: String!): People

        addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
        updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
        removeCar(id: String!): Cars
    }
`

const resolvers = {
    Query: {
        people: () => people,
        cars: () => cars,
        person: (parent, args) => people.find(person => person.id === args.id),
        car: (parent, args) => cars.find(car => car.id === args.id),
        personWithCars: (parent, args) => {
            const person = people.find(person => person.id === args.id);
            if (!person) {
                throw new Error(`Couldn't find person with id ${args.id}`);
            }
            const personCars = cars.filter(car => car.personId === args.id);
            return { person, cars: personCars };
        }
    },

    Mutation: {
        addPerson: (parent, args) => {
          const newPerson = {
            id: args.id,
            firstName: args.firstName,
            lastName: args.lastName,
          };
          people.push(newPerson);
          return newPerson;
        },
        updatePerson: (parent, args) => {
            const person = people.find(person => person.id === args.id);

            if(!person) {
                throw new Error(`Couldn't find contact with id ${args.id}`)
            }

            person.firstName = args.firstName
            person.lastName = args.lastName

            return person
        },
        removePerson: (parent, args) => {
            const removedPerson = people.find(person => person.id === args.id);
  
            if(!removedPerson) {
                throw new Error(`Couldn't find contact with id ${args.id}`)
            }

            cars = cars.filter((car) => car.personId !== args.id);
            if(cars.length > 0) {
                cars.filter((car) => car.personId !== args.id);
            }

            remove(people, p => {
                return p.id === removedPerson.id
            })

            return removedPerson
        },
        addCar: (parent, args) => {
            const newCar = {
              id: args.id,
              year: args.year,
              make: args.make,
              model: args.model,
              price: args.price,
              personId: args.personId,
            };
            cars.push(newCar);
            return newCar;
        },
        updateCar: (parent, args) => {
            const car = cars.find(car => car.id === args.id);

            if(!car) {
                throw new Error(`Couldn't find contact with id ${args.id}`)
            }

            car.year = args.year,
            car.make = args.make,
            car.model = args.model,
            car.price = args.price,
            car.personId = args.personId

            return car
        },
        removeCar: (parent, args) => {
            const removedCar = cars.find(car => car.id === args.id);
  
            if(!removedCar) {
                throw new Error(`Couldn't find car with id ${args.id}`)
            }

            remove(cars, c => {
                return c.id === removedCar.id
            })

            return removedCar
        }
    },
};

export { typeDefs, resolvers }
