promesa1 = (boolean) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if (boolean) {
                resolve('Todo Ok');
            } else {
                return reject(new Error('Ups hubo un error'));
            }
        }, 1000);
    });
};

// promesa1(false).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

const getPromesa = async (boolean) => {
    const result = await promesa1(boolean);
    return result;
}

// getPromesa(true).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err);
// });;

var a = 60;
function varScope() {
    for (var a = 0; a < 5; a++) {
        console.log(a);
    }
};

const petList = [
    { type: 'cat', url:'http://mypets.dev/cat.png' },
    { type: 'dog', url:'http://mypets.dev/dog.png' },
];

const pets= ['cat','dog', 'turtle'];

 async function getPetImage(pet) {
    // will return a promise for the image
    let findPet = petList.find((p) => p.type === pet);
    if (findPet === undefined) {
        return '404';
        // throw new Error('404');
    }
    return findPet.url;
};

async function fetchMyPetImages(pets) {
    // get all the pet images as one promise that returns an array
    // turtle is going to return 404, the response should be
    // ['http://mypets.dev/cat.png','http://mypets.dev/dog.png']
    const queryList = pets.map((p) => {
        return getPetImage(p);
    });
    const result = await Promise.all(queryList)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
    return result; // resolve
};

// fetchMyPetImages(pets)
//     .then((res) => {
//         console.log('Todo ok');
//         console.log(res);
//     });
fetchMyPetImages(pets).then((res) => {
    console.log(res);
});
// (async function () {
//   console.log(await fetchMyPetImages(pets));
// })();

async function x() {
  if (Math.random() > 0.5) throw new Error("...");
  return Promise.resolve(10);
};

x().then((r) => console.log(r))
    .catch((err) => console.log(err));