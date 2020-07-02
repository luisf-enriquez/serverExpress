const admin = require('../services/firebase');
const dbFirestore = admin.firestore();

const createDocRandomId = (collection, data) => new Promise((resolve, reject) => {
    let batch = dbFirestore.batch();
    const dataRef = dbFirestore.collection(collection).doc();
    data['docId'] = dataRef.id;
    batch.set(dataRef, data);
    batch.commit()
      .then(response => resolve({ data: { docId: dataRef.id },
        status: 201, message: 'Documento creado exitosamente' }))
      .catch((err) => reject(new MyError({ message: 'Error creando el documento', status: 400 })));
});

module.exports = {
    createDocRandomId,
}