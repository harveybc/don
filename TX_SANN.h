/* 
 * File:   TX_SANN.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 05:42 PM
 */

#ifndef TX_SANN_H
#define	TX_SANN_H
#include "Taxonomy.h"
#include "Expert_SANN.h"

class TX_SANN: public Taxonomy<Expert_SANN,double>{
public:
    TX_SANN();
    TX_SANN(const TX_SANN& orig);
    virtual ~TX_SANN();
private:

};

#endif	/* TX_SANN_H */

