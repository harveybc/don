/* 
 * File:   SynapsePlasticity.h
 * Author: harveybc
 *
 * Created on 16 de agosto de 2015, 04:54 PM
 */

#ifndef SYNAPSEPLASTICITY_H
#define	SYNAPSEPLASTICITY_H

class SynapsePlasticity : Synapse{
public:
    // short term plasticity 
    int stp_critical_period; ///< period for spike counting in clock ticks (def: 20)
    int stp_recovery_period; ///< clock ticks to return to baseline strength (def: 200)
    float stp_max_intensity; ///< initial stp intensity, can be negative for st-depression (def: 0.5*strength )         
    int stp_depletion_rate; ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int stp_remaining_recovery; ///<  remaining ticks to recovery
    float stp; ///< stp magnitude added to strength per tick 
    // long term plasticity 
    int ltp_critical_period; ///<  period for presynaptic to postsynaptic spike phase calculus (100 ticks)    
    int ltp_recovery_period; ///< time to return to baseline strenth (def:  3600000)
    float ltp_max_intensity; ///< initial ltp intensity as a fraction of str, can be negative for st-depression (def: 0.5* strength)         
    int ltp_depletion_rate; ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int ltp_remaining_recovery; ///<  remaining ticks to recovery (def:0)
    float ltp; ///< ltp magnitude added to strength per tick 
    // persistent long term plasticity
    float persistent_change_factor; ///< fraction of ltp that becomes permanent change in strength (def: 0.001*ltp)
  
    SynapsePlasticity();
    SynapsePlasticity(const SynapsePlasticity& orig);
    virtual ~SynapsePlasticity();
private:

};

#endif	/* SYNAPSEPLASTICITY_H */

