import { useCall } from '@usedapp/core';


const useTotalSupply = (nftMintContract) => {
    const response = useCall({
        contract: nftMintContract,
        method: 'totalSupply',
        args: [] /* params */
    });

    if (!response) {
        return undefined
    }

    const { error, value } = response;
    if (error) {
        return undefined
    }
    return value;
};

export default useTotalSupply;