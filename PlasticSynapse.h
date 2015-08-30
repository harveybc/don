/** 
@file       PasticSynapse.h
@author     harveybc
@date       16 de agosto de 2015, 04:54 PM
@version    0.0.1 (pre-alpha)
@class      PlasticSynapse
@brief Chemical synapse with long/short-term plasticity. 

@details Synaptic plasticity modifies the strength of a synapse temporarily 
 depending on the activity of the neuron. 
 
 Short-term plasticity acts as a band-pass filter of the pre-synaptic activity
 while the long-term plasticity uses hebbian learning and it´s intensity depends
 on the phase shift of the post-synaptic activity respect to the pre-synaptic 
 activity.
 @endparblock
 */

#ifndef PLASTICSYNAPSE_H
#define	PLASTICSYNAPSE_H

class PlasticSynapse : Synapse{
public:
    // short term plasticity 
    int stp_critical_period; /// period for spike counting in clock ticks (def: 20)
    int stp_recovery_period; /// clock ticks to return to baseline strength (def: 200)
    float stp_max_intensity; /// initial stp intensity, can be negative for st-depression (def: 0.5*strength )         
    int stp_depletion_rate;  ///  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int stp_remaining_recovery; ///  remaining ticks to recovery
    float stp; ///< stp magnitude added to strength per tick 
    // long term plasticity 
    int ltp_critical_period; ///  period for presynaptic to postsynaptic spike phase calculus (100 ticks)    
    int ltp_recovery_period; /// time to return to baseline strenth (def:  3600000)
    float ltp_max_intensity; /// initial ltp intensity as a fraction of str, can be negative for st-depression (def: 0.5* strength)         
    int ltp_depletion_rate;  ///  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int ltp_remaining_recovery; ///  remaining ticks to recovery (def:0)
    float ltp; /// ltp magnitude added to strength per tick 
    // persistent long term plasticity
    float persistent_change_factor; /// fraction of ltp that becomes permanent change in strength (def: 0.001*ltp)
    // constructors
    PlasticSynapse();
    PlasticSynapse(const PlasticSynapse& orig);
    virtual ~PlasticSynapse();
private:
};

#endif	/* PLASTICSYNAPSE_H */

