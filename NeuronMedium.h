/* 
 * File:   Neuron_Beer.h
 * Author: harveybc
 *
 * Created on 16 de agosto de 2015, 04:26 PM
 */

#ifndef NEURONMEDIUM_H
#define	NEURONMEDIUM_H

class NeuronMedium : Neuron{
public:
    // Extracellular medium Neurotransmitter concentration (g/liter?) for each NT
    std::array<float,8> ecm_neuro_transmitter;    
    // Membrane's Extracellular medium interface
    // Whole membrane NT receptor charge factor (in: Coulombs/concentration) 
    // Using: Qth / GABA concentration: 1.23e-1 g/Liter  (from: http://www.sciencedirect.com/science/article/pii/S0925492700000755)
    std::array<float,8> ecm_nt_receptor_charge_factor;
    // Local extracellular dissipation factor per tick (def: 0.99931 for 10 seconds to 0.1%)
    std::array<float,8> ecm_nt_dissipation;
    // intrinsic currents for pacemaker and other types of neurons (Beer, 1990) 
    char neuron_type;  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random (def:0))
    float Q_min; ///< membrane intrinsic current charge threshold (-68mV*10nF = -6.8e-10C)
    float Ih;    ///< intrinsic depolarizing current (def: 2e-9 A)
    float Il;    ///< intrinsic hyperpolarizing current (def: -2e-9 A)
    float Th;    ///< time Ih should remain active in clock ticks(def:100)
    float Tl;    ///< time Il should remain active (Tl = Mtl*(Qm/C - Ih/Gm) + Btl ) 
    float Mtl;   ///< slope of line used to calculate Tl (def:-1e5)
    float Btl;   ///< initial time used to calculate Tl in clock ticks(def: 500))
    // constructors
    NeuronMedium();
    NeuronMedium(const NeuronMedium& orig);
    virtual ~NeuronMedium();
private:

};

#endif	/* NEURON_BEER_H */

