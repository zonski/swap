import {SearchThingRequest, Thing} from "@swap/common";
import {CreateThingRequest} from "@swap/common";

let nextId = 0;
const allThings: Thing[] = [];

for (let i = 0; i < 5; i++) {
  const id = nextId++;
  const index = id + 1;
  allThings.push({
    id,
    name: 'Test Thing ' + index,
    description: 'This is test thing #' + index
  })
}

export const listThings = async (): Promise<Thing[]> => {
  console.log(`Listing ${allThings.length} things`);
  return Promise.resolve(allThings);
}

export const searchThings = async (request: SearchThingRequest): Promise<Thing[]> => {
  const matches = allThings.filter(thing => {
    if (request.keywords) {
      const checks = [thing.name, thing.description]
        .filter(c => !!c)
        .map(c => c!.toLowerCase());

      if (request.keywords.split(' ')
        .map(w => w.toLowerCase())
        .filter(w => !checks.find(c => c.indexOf(w)) )
        .length > 0) {
        return
      }
    }
  });
  console.log(`Found ${matches.length} things matching search`, request);
  return Promise.resolve(matches);
}

export const getThing = async (id: number): Promise<Thing> => {
  const thing = allThings.find(t => t.id === id)
  if (!thing) {
    throw new Error('No thing found for ID: ' + id);
  }
  console.log(`Found thing for ID ${id}, name is ${thing.name}`);
  return Promise.resolve(thing);
}

export const createThing = async (request: CreateThingRequest): Promise<Thing> => {
  const thing: Thing = {
    id: nextId++,
    name: request.name,
    description: request.description
  }
  allThings.push(thing);
  console.log(`Created thing "${thing.name}" with ID ${thing.id}`);
  return Promise.resolve(thing);
}
