/* 
 * File:   Expert.h
 * Author: harveybc
 *
 * Created on 29 de marzo de 2015, 04:16 PM
 */

#ifndef EXPERT_H
#define	EXPERT_H
#include "Taxon.h"

template <class MessageClass> ///< La clase MessageClass es el tipo de mensaje que se envía a otro experto
class Expert: public Taxon<MessageClass> {
public:
    Expert();
    Expert(const Expert& orig);
    virtual ~Expert();
private:

};
template <class MessageClass> ///< para IA, MessageClass=double
Expert<MessageClass>::Expert() {
}

template <class MessageClass> ///< para IA, MessageClass=double
Expert<MessageClass>::Expert(const Expert& orig) {
}

template <class MessageClass> ///< para IA, MessageClass=double
Expert<MessageClass>::~Expert() {
}

template class Expert<double>; //TODO : Implementación de experto de Complex ANNs

#endif	/* EXPERT_H */


