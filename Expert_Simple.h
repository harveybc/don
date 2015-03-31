/* 
 * File:   Expert_Simple.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 05:52 PM
 */

#ifndef EXPERT_SIMPLE_H
#define	EXPERT_SIMPLE_H
#include "Expert.h"

class Expert_Simple: public Expert<double> {
public:
    Expert_Simple();
    Expert_Simple(const Expert_Simple& orig);
    virtual ~Expert_Simple();
private:

};

#endif	/* EXPERT_SIMPLE_H */

