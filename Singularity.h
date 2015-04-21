/* 
 * File:   Singularity.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 05:56 PM
 */

#ifndef SINGULARITY_H
#define	SINGULARITY_H
#include "taxon.h"

class Singularity: Taxon<double> {
public:
    Singularity();
    Singularity(const Singularity& orig);
    virtual ~Singularity();
private:

};

#endif	/* SINGULARITY_H */

