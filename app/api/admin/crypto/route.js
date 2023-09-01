import createCrypto from "./createCrypto";
import updateCrypto from "./update-crypto";
import deleteCrypto from "./deleteCrypto";

export const revalidate = 0;

export { createCrypto as POST, updateCrypto as PUT, deleteCrypto as DELETE };
