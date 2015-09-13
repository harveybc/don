/* 
 * File:   NonSpikingSynapse.h
 * Author: harveybc
 *
 * Created on 1 de septiembre de 2015, 03:40 AM
 */

#ifndef NONSPIKINGSYNAPSE_H
#define	NONSPIKINGSYNAPSE_H

class NonSpikingSynapse : Synapse{
public:
    // general attributes
    float Gm_syn; /// synaptic conductance
    float Gm_syn_max; /// max synaptic conductance (def: 10uS)
    // for electrical synapses
    float Gm_syn_min;/// minimum synapse conductance
    float V_syn_th; /// trigger synapse potential
    float V_syn_sat;/// saturation synapse potential
    // constructors
    NonSpikingSynapse();
    NonSpikingSynapse(const NonSpikingSynapse& orig);
    virtual ~NonSpikingSynapse();
private:

};

#endif	/* NONSPIKINGSYNAPSE_H */

