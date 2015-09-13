/* 
 * File:   Neuron_Beer.h
 * Author: harveybc
 *
 * Created on 16 de agosto de 2015, 04:26 PM
 */

#ifndef PACEMAKERNEURON_H
#define	PACEMAKERNEURON_H

class PacemakerNeuron : SpikingNeuron{
public:
    // types of neurons from (Beer, 1990) using intrinsic currents 
    uint8_t neuron_type;  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random (def:0))
    // intrinsic currents for pacemaker and other types of neurons (Beer, 1990) 
    float Q_min; ///< membrane intrinsic current charge threshold (-68mV*10nF = -6.8e-10C)
    float Ih;    ///< intrinsic depolarizing current (def: 2e-9 A)
    float Il;    ///< intrinsic hyperpolarizing current (def: -2e-9 A)
    float Th;    ///< time Ih should remain active in clock ticks(def:100)
    float Tl;    ///< time Il should remain active (Tl = Mtl*(Qm/C - Ih/Gm) + Btl ) 
    float Mtl;   ///< slope of line used to calculate Tl (def:-1e5)
    float Btl;   ///< initial time used to calculate Tl in clock ticks(def: 500))
    // constructors
    PacemakerNeuron();
    PacemakerNeuron(const PacemakerNeuron& orig);
    virtual ~PacemakerNeuron();
private:

};

#endif	/* PACEMAKERNEURON_H */

