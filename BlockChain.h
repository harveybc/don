/* 
 * File:   BlockChain.h
 * Author: harveybc
 *
 * Created on 26 de junio de 2014, 06:51 AM
 */

#ifndef BLOCKCHAIN_H
#define	BLOCKCHAIN_H
#include <queue>
#include <string>

class BlockChain {
public:
    int InsertBlock();
    int VerifyBlock();
    BlockChain();
    BlockChain(const BlockChain& orig);
    virtual ~BlockChain();
private:
    struct BlockHeader{ /// Modified from the Bitcoin block definition
        unsigned int version; /// same as Bitcoin
        std::string hash_previous_block; /// same as Bitcoin
        std::string hash_transaction_merkle_root; /// Transaction merkele tree root same as Bitcoin
        unsigned int time; /// Timestamp (seconds since 1970-01-01) same as Bitcoin
        //unsigned int bits; /// Packed difficulty (not used in Singularity))
        //unsigned int nonce; // Hash iteration counter, when overflows, increases 
                              // extraNonce in generation transaction(and hash_transaction_merkle_root)
        
        /// Added Section for Singularity:
        
        /// Singularity PoW not comparing if hash_previous_block  is less than
        /// the unpacked bits (packed difficulty), but instead, to validate a block
        /// previous expert efficiency is compared to the actual trained one (proof of work)
        /// using the same dataset (hashed using a merkle tree root hash)
        double previous_efficiency; /// Efficiency of the previous expert
        std::string hash_dataset_merkle_root; /// Root merkle tree hash for dataset verification (expert+dataset=efficiency)
        std::string hash_expert_merkle_root; /// Root merkle tree hash for expert verification (expert+dataset=efficiency)
    }
        
        
       
        //En bitcoin si el merkle_root es inferior al target(desempacado) se 
        //validan las transacciones del bloque y se inserta el bloque al blockchain
        
        // En Singularity si la eficiencia del experto con un dataset es superior a la actual
        // para ese dataset, se validan las transacciones del block y se insderta en blockchain
        // Se paga incremento en eficiencia * complejidad * tamaño del dataset * 
        //entropía del dataset
        
    std::queue <Block> block_chain;

}

#endif	/* BLOCKCHAIN_H */

