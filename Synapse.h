/* 
 * File:   Synapse.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef SYNAPSE_H
#define	SYNAPSE_H
#include <cstdint>

class Synapse {
public:
    // attributes
    int source_id; ///< remote source neuron identification
    bool active; ///< FALSE when the synapse is deleted
    float strength; ///< Synapse strength in Coulombs/spike (def:7.5e-11, aprox (Qth-Qss)/2)
    char synapse_type; ///< 0=axodendritic/somatic, 1=axosynapstic (gated), 2 axoaxonic modulated str
                       ///, 3=axoaxonic cooperative, 4=extracellular, 5=axosecretory
    // short term plasticity 
    bool short_term_plasticity; ///< true = short term non-hebbian learning (presynaptic) 
    int stp_critical_period;    ///< period for spike counting in clock ticks (def: 20)
    int stp_recovery_period;    ///< clock ticks to return to baseline strength (def: 200)
    float stp_max_intensity;///< initial stp intensity, can be negative for st-depression (def: 0.5*strength )         
    int stp_depletion_rate;     ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int stp_remaining_recovery; ///<  remaining ticks to recovery
    float stp; ///< stp magnitude added to strength per tick 
    // long term plasticity 
    bool long_term_plasticity; ///< true = persistent hebbian learning (presynaptic) 
    int ltp_critical_period; ///<  period for presynaptic to postsynaptic spike phase calculus (100 ticks)    
    int ltp_recovery_period; ///< time to return to baseline strenth (def:  3600000)
    float ltp_max_intensity;  ///< initial ltp intensity as a fraction of str, can be negative for st-depression (def: 0.5* strength)         
    int ltp_depletion_rate; ///<  stp depletion in Coulombs/clock_tick = max_intensity/recovery_period
    int ltp_remaining_recovery=0; ///<  remaining ticks to recovery
    float ltp; ///< ltp magnitude added to strength per tick 
    // persistent long term plasticity
    bool persistent_plasticity; ///< a fraction of ltp is modified in baseline strength permanently if true
    float persistent_change_factor;  ///< fraction of ltp that becomes permanent change in strength (def: 0.001*ltp)
    // trveling wave parameters
    float length;   ///< synapse length in meters (def 0)
    int segment;    ///< remote axon´s 32bit segment of the synapse = floor (length/speed)
    char offset;    ///< remote axon's bit offset (autocalculated)
    uint32_t mask ;    ///< remote axon's bit mask (autocalculated)
    // epigenetics
    float prob_inheritable; ///< increases with fitness changes since the synaptogenesis/pruning event to the next event
    // constructors
    Synapse(
                // attributes
                int syn_id_, ///< identification number of the synapse
                int source_id_, ///< remote source neuron identification
                bool active_, ///< FALSE when the neuron is deleted
                float strength_, ///< Synapse strength in Coulombs/spike
                char synapse_type_, ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
                // short term plasticity 
                bool short_term_plasticity_, ///< true = short term non-hebbian learning (presynaptic) 
                int stp_critical_period_, ///< time to return to baseline strength
                int stp_recovery_period_, ///< period for spike counting (in ms)    
                float stp_max_intensity_,  ///< initial stp intensity as a fraction of str, can be negative for st-depression         
                // long term plasticity 
                bool long_term_plasticity_, ///< true = persistent hebbian learning (presynaptic) 
                int ltp_critical_period_, ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
                int ltp_recovery_period_, ///< time to return to baseline strenth
                float ltp_max_intensity_,  ///< initial ltp intensity as a fraction of str, can be negative for st-depression         
                float persistent_change_factor_, ///< fraction of ltp that becomes permanent change in strength
                // trveling wave parameters
                float length_, ///< synapse length, regulates phase
                float speed_ ///< synapse radius, regulates propagation speed
                
            );
    Synapse(const Synapse& orig);
    virtual ~Synapse();
private:
};

#endif	/* Synapses_H */

