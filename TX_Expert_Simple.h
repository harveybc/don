/* 
 * File:   TX_Expert_Simple.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 05:54 PM
 */

#ifndef TX_EXPERT_SIMPLE_H
#define	TX_EXPERT_SIMPLE_H
#include "Taxonomy.h"
#include "Expert_Simple.h"

class TX_Expert_Simple: Taxonomy<Expert_Simple,double> {
public:
    TX_Expert_Simple();
    TX_Expert_Simple(const TX_Expert_Simple& orig);
    virtual ~TX_Expert_Simple();
private:

};

#endif	/* TX_EXPERT_SIMPLE_H */

