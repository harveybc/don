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
#include <inttypes.h>

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
        uint32_t hash_previous_block; /// same as Bitcoin
		uint32_t hash_transaction_merkle_root; /// Transaction merkele tree root same as Bitcoin
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
		uint32_t hash_dataset_merkle_root; /// Root merkle tree hash for dataset verification (expert+dataset=efficiency)
		uint32_t hash_expert_merkle_root; /// Root merkle tree hash for expert verification (expert+dataset=efficiency)
    }
	struct TransactionInput { /// Modified from the Bitcoin block definition
		uint32_t previous_transaction_hash; /// same as Bitcoin
		unsigned int prev_transaction_tx_out_index; /// output index from previous tx to be usedas input
	}struct TransactionOutput { /// Modified from the Bitcoin block definition
		unsigned int version; /// same as Bitcoin
		unsigned int in_counter; /// same as Bitcoin
		std::queue<TransactionInput> input_queue; /// Transaction merkele tree root same as Bitcoin
		unsigned int out_counter; /// same as Bitcoin
		std::queue<TransactionOutput> output_queue; /// Transaction merkele tree root same as Bitcoin
		unsigned int lock_time; /// Timestamp (seconds since 1970-01-01) same as Bitcoin
	}
	struct Transaction { /// Modified from the Bitcoin block definition
		unsigned int version; /// same as Bitcoin
		unsigned int in_counter; /// same as Bitcoin
		std::queue<TransactionInput> input_queue; /// Transaction merkele tree root same as Bitcoin
		unsigned int out_counter; /// same as Bitcoin
		std::queue<TransactionOutput> output_queue; /// Transaction merkele tree root same as Bitcoin
		unsigned int lock_time; /// Timestamp (seconds since 1970-01-01) same as Bitcoin
	}
	struct Block { /// Modified from the Bitcoin block definition
		unsigned int version; /// same as Bitcoin
		unsigned int block_size; /// same as Bitcoin
		BlockHeader block_header; /// Transaction merkele tree root same as Bitcoin
		unsigned long int transaction counter; /// Timestamp (seconds since 1970-01-01) same as Bitcoin
		std::queue <Transaction> transactions;
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

