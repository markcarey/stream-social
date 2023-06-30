# Tokenbound Social

## Easily stream SMILE tokens -- or ETH or stablecoins -- directly to the ERC-6551 token-bound account of any Lens profile.

*Note:* While Lens profiles are currently supported, Farcaster, ENS, and others will be supported in future.

## What it does

While other solutions enable you to stream tokens to the _owner_ of a Lens profile, Tokenbound Social makes it easy to send real-time streams _to the Lens profile NFT itself_. With ERC-6551, all past and future NFTs have a token-bound account (TBA), a smart contract wallet with a deterministic address, that only the owner of the NFT can control. See link to the 6551 EIP below.

This is interesting because the streamed tokens -- and any other assets -- are tied to the social profile itself, rather than the current owner of that profile. If the profile is transferred to another own, all the assets go with it to new owner. In the case of SuperFluid streams, the streams continue without interruption, as the recipient address does not change. Not only does this save gas -- no need to stop the stream to previous owner and start a new stream to the new owner -- it also opens up new possibilities for social networks, when the social profiles themselves can own assets and interact with other smart contracts.

## The SMILE token

The SMILE token is a native/custom Super Token, which means it supports Superfluid streaming without the need to be wrapped first. When you first start a stream using Tokenbound Social, you get an airdrop of 1,000,000 SMILE tokens. This means that you can immediately start streaming SMILEs to your favorite Lens profiles. Instead of "one-time" emjoi reactions, you can think of this as a way to stream your support/reaction. The accumulation of incoming SMILE streams to a social profile then becomes a real-time reputation score, showing the current support for that social profile.

Also, I think airdropping a native/custom Super Token is an effective way of introducing new users to Superfluid streaming, since the token does not need to be wrapped and is already in their wallet. They just need to start streaming real-time SMILEs! :)

## Links

- Try it now. (streaming on Goerli as proof of concept): https://tokenbound.social
- EIP-6551: https://eips.ethereum.org/EIPS/eip-6551
- The SMILE token: https://goerli.etherscan.io/address/0x4632C3cF0da61db0e561DEAc37aCf93a9EBFe789
- Airdrop contract: https://goerli.etherscan.io/address/0x2AF30c9ec2Aa20f55fAa03DE5781F19213FC4aC4 