import { useCall } from '@usedapp/core';


const useGetMintersCounter = (nftMintContract) => {
    const response = useCall({
        contract: nftMintContract,
        method: 'getAllMinters',
        args: [] /* params */
    });

    console.log("useGetAllMinters", response);

    if (!response) {
        return undefined
    }

    const { error, value } = response;
    if (error) {
        return undefined
    }
    // remove duplicates from array
    value.filter((v, i, a) => a.indexOf(v) === i);
    return value.length;
};

export default useGetMintersCounter;