/* 
 * File:   Synapse.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include "Synapse.h"

Synapse::Synapse(
    // attributes
    int source_id_, ///< remote source neuron identification
    bool active_, ///< FALSE when the neuron is deleted
    float strength_, ///< Synapse strength in Coulombs/spike
    char synapse_type_, ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
    // short term plasticity 
    bool short_term_plasticity_, ///< true = short term non-hebbian learning (presynaptic) 
    int stp_critical_period_, ///< time to return to baseline strength
    int stp_recovery_period_, ///< period for spike counting (in ms)    
    float stp_max_intensity_,  ///< initial stp intensity as a fraction of str, can be negative for st-depression         
    int stp_depletion_rate_,     ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int stp_remaining_recovery_, ///<  remaining ticks to recovery
    float stp_, ///< stp magnitude added to strength per tick 
    // long term plasticity 
    bool long_term_plasticity_, ///< true = persistent hebbian learning (presynaptic) 
    int ltp_critical_period_, ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
    int ltp_recovery_period_, ///< time to return to baseline strenth
    float ltp_max_intensity_,  ///< initial ltp intensity as a fraction of str, can be negative for st-depression         
    int ltp_depletion_rate_, ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int ltp_remaining_recovery_, ///<  remaining ticks to recovery
    float ltp_, ///< ltp magnitude added to strength per tick 
    // persistent long term plasticity
    bool persistent_plasticity_, ///< a fraction of ltp is modified in baseline strength permanently if true
    float persistent_change_factor_, ///< fraction of ltp that becomes permanent change in strength
    // trveling wave parameters
    float length_, ///< synapse length, regulates phase
    float speed_ ///< synapse radius, regulates propagation speed
) {
    // attributes
    source_id=source_id_; ///< remote source neuron identification
    active=active_; ///< FALSE when the neuron is deleted
    strength=strength_; ///< Synapse strength in Coulombs/spike def: 7.5e-11
    synapse_type=synapse_type_; ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
    // short term plasticity 
    short_term_plasticity = short_term_plasticity_; ///< true = short term non-hebbian learning (presynaptic) 
    stp_critical_period = stp_critical_period_; ///< time to return to baseline strength
    stp_recovery_period = stp_recovery_period_; ///< period for spike counting (in ms)    
    stp_max_intensity=stp_max_intensity_;  ///< initial stp intensity as a fraction of str, can be negative for st-depression         
    stp_depletion_rate = stp_depletion_rate_;     ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    stp_remaining_recovery = stp_remaining_recovery_; ///<  remaining ticks to recovery
    stp = stp_; ///< stp magnitude added to strength per tick 
    // long term plasticity 
    long_term_plasticity = long_term_plasticity_; ///< true = persistent hebbian learning (presynaptic) 
    ltp_critical_period = ltp_critical_period_; ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
    ltp_recovery_period = ltp_recovery_period_; ///< time to return to baseline strenth
    ltp_max_intensity = ltp_max_intensity_;  ///< initial ltp intensity as a fraction of str, can be negative for st-depression         
    ltp_depletion_rate = ltp_depletion_rate_; ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    ltp_remaining_recovery = ltp_remaining_recovery_; ///<  remaining ticks to recovery
    ltp = ltp_; ///< ltp magnitude added to strength per tick 
    // persistent long term plasticity
    persistent_plasticity = persistent_plasticity_; ///< a fraction of ltp is modified in baseline strength permanently if true
    persistent_change_factor = persistent_change_factor_; ///< fraction of ltp that becomes permanent change in strength
    //traveling wave parameters
    length=length_; ///< synapse length, regulates phase
    speed=speed_; ///< synapse radius, regulates propagation speed
    //calculate segment and offset
    segment = 0; 
    offset = 0;
    // initializes ltp and stp decrease factors (charge/tick) = max_intensity/recovery_period
    if (stp_recovery_period<1){
        stp_recovery_period=1;
    }
    stp_depletion_rate = stp_max_intensity / stp_recovery_period;
    if (ltp_recovery_period<stp_recovery_period){
        ltp_recovery_period=stp_recovery_period+1;
    }
    ltp_depletion_rate = ltp_max_intensity / ltp_recovery_period;
    // initializes remaining recovery time for stp and ltp
    stp_remaining_recovery = 0;
    ltp_remaining_recovery = 0;
 }

Synapse::Synapse(){
    // attributes
    source_id = 0; ///< remote source neuron identification
    active = true; ///< FALSE when the synapse is deleted
    strength = 7.5e-11; ///< Synapse strength in Coulombs/spike (def: half of Qth-Qss)
    synapse_type = 0; ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
    // short term plasticity 
    short_term_plasticity = true; ///< true = short term non-hebbian learning (presynaptic) 
    stp_critical_period = 20; ///< period for spike counting in clock ticks (def: 20)
    stp_recovery_period = 200; ///< clock ticks to return to baseline strength (def: 200)
    stp_max_intensity = 0;  ///< initial stp intensity as a fraction of str, can be negative for st-depression         
    stp_depletion_rate = 0; ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    stp_remaining_recovery = 0; ///<  remaining ticks to recovery
    stp=0; ///< stp magnitude added to strength per tick 
    // long term plasticity 
    long_term_plasticity = true; ///< true = persistent hebbian learning (presynaptic) 
    ltp_critical_period = 100; ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
    ltp_recovery_period = 3600000; ///< time to return to baseline strenth
    ltp_max_intensity = 0;  ///< initial ltp intensity as a fraction of str, can be negative for st-depression         
    ltp_depletion_rate = 0; ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    ltp_remaining_recovery = 0; ///<  remaining ticks to recovery
    ltp = 0; ///< ltp magnitude added to strength per tick 
    // persistent long term plasticity
    persistent_plasticity = false; ///< a fraction of ltp is modified in baseline strength permanently if true
    persistent_change_factor = 0.001;  ///< fraction of ltp that becomes permanent change in strength (def: 0.001*ltp)
    // trveling wave parameters
    length = 0; ///< synapse length, regulates phase
    speed = 1; ///< synapse radius, regulates propagation speed (def: 1m/s)
    segment = 0; ///<  remote axon segment of the synapse = length/speed 
    offset = 0; 
    // initializes ltp and stp decrease factors (charge/tick) = max_intensity/recovery_period
    if (stp_recovery_period<1){
        stp_recovery_period=1;
    }
    stp_depletion_rate = stp_max_intensity / stp_recovery_period;
    if (ltp_recovery_period<stp_recovery_period){
        ltp_recovery_period=stp_recovery_period+1;
    }
    ltp_depletion_rate = ltp_max_intensity / ltp_recovery_period;
    // initializes remaining recovery time for stp and ltp
    stp_remaining_recovery = 0;
    ltp_remaining_recovery = 0;
}

Synapse::Synapse(const Synapse& orig) {
}

Synapse::~Synapse() {
}

