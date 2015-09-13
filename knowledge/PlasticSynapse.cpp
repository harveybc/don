/* 
 * File:   PlasticSynapse.cpp
 * Author: harveybc
 * 
 * Created on 16 de agosto de 2015, 04:54 PM
 */

#include "PlasticSynapse.h"

PlasticSynapse::PlasticSynapse() {
    
    // short term plasticity 
    stp_critical_period = 20; // period for spike counting in clock ticks (def: 20)
    stp_recovery_period = 200; // clock ticks to return to baseline strength (def: 200)
    stp_max_intensity = 0.0f; // initial stp intensity as a fraction of str, can be negative for st-depression         
    stp_depletion_rate = 0; //  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    stp_remaining_recovery = 0; //  remaining ticks to recovery
    stp = 0.0f; // stp magnitude added to strength per tick 
    // long term plasticity 
    ltp_critical_period = 100; //  period for presynaptic to postsynaptic spike phase calculus (in ms)    
    ltp_recovery_period = 3600000; // time to return to baseline strenth
    ltp_max_intensity = 0.0f; // initial ltp intensity as a fraction of str, can be negative for st-depression         
    ltp_depletion_rate = 0; //  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    ltp_remaining_recovery = 0; //  remaining ticks to recovery
    ltp = 0.0f; // ltp magnitude added to strength per tick 
    // epigenetics: persistent long term plasticity
    epigenetic_strength_change=0.0f; // increases proportionally to stp + ltp on positive variations of prob_inheritable 
    // initializes ltp and stp decrease factors (charge/tick) = max_intensity/recovery_period
    if (stp_recovery_period < 1) {
        stp_recovery_period = 1;
    }
    stp_depletion_rate = stp_max_intensity / stp_recovery_period;
    if (ltp_recovery_period < stp_recovery_period) {
        ltp_recovery_period = stp_recovery_period + 1;
    }
    ltp_depletion_rate = ltp_max_intensity / ltp_recovery_period;
    // initializes remaining recovery time for stp and ltp
    stp_remaining_recovery = 0;
    ltp_remaining_recovery = 0;
}

PlasticSynapse::PlasticSynapse(const PlasticSynapse& orig) {
}

PlasticSynapse::~PlasticSynapse() {
}

