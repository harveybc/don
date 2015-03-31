/* 
 * File:   Expert_SANN.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 06:30 PM
 */

#ifndef EXPERT_SANN_H
#define	EXPERT_SANN_H
#include "Expert.h"

class Expert_SANN:public Expert<double> {
public:
    Expert_SANN();
    Expert_SANN(const Expert_SANN& orig);
    virtual ~Expert_SANN();
private:

};

#endif	/* EXPERT_SANN_H */

