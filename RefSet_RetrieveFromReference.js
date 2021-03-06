// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
const getAllObjects = (entityName) => {
	return new Promise((resolve, reject) => {
		mx.data.getOffline(entityName, [], {},
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			})
	})
}
// END EXTRA CODE

/**
 * Retrieve a set of objects from the reference of a reference set
 * @param {MxObject} referenceObject - This object should be referenced (have the arrow) for the reference set
 * @param {string} referenceName - The name of the reference set, including the module. i.e. MyFirstModule.Person_Pets
 * @param {string} ownerEntity - The owner (dot) of the reference
 * @returns {Promise.<MxObject[]>}
 */
export async function RefSet_RetrieveFromReference(referenceObject, referenceName, ownerEntity) {
	// BEGIN USER CODE
	const meta = mx.meta.getEntity(ownerEntity);
	if (meta.isObjectReferenceSet(referenceName) && meta.getSelectorEntity(referenceName) === referenceObject.getEntity()) {
		const objects = await getAllObjects(ownerEntity);
		return objects.filter(obj => obj.getReferences(referenceName).indexOf(referenceObject.getGuid()) > -1)
	} else {
		throw new Error(`The reference set ${referenceName} was not found or does not point to ${referenceObject.getEntity()}.`)
	}

	// END USER CODE
}
