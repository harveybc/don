/* 
 * File:   TX_Neuron_d.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 05:34 PM
 */

#ifndef TX_NEURON_D_H
#define	TX_NEURON_D_H
#include "Neuron_d.h"
#include "Taxonomy.h"

class TX_Neuron_d: public Taxonomy<Neuron_d,double> {
public:
    TX_Neuron_d();
    TX_Neuron_d(const TX_Neuron_d& orig);
    virtual ~TX_Neuron_d();
private:

};

#endif	/* TX_NEURON_D_H */

