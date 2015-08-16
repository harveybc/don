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
    bool active; ///< FALSE when the synapse is deleted, also become recesive gene for NE (def:true)
    float strength; ///< Synapse strength in Coulombs/spike (def:7.5e-11, aprox (Qth-Qss)/2)
    // trveling wave parameters
    float length; ///< synapse length in meters (def 0)
    int segment; ///< remote axon´s 32bit segment of the synapse = floor (length/speed)
    char offset; ///< remote axon's bit offset (autocalculated)
    uint32_t mask; ///< remote axon's bit mask for reading single bits (autocalculated)
    // epigenetics
    float prob_inheritable; ///< increases with fitness changes since the synaptogenesis/pruning event to the next event
    // constructors
    Synapse(
            // attributes
            int source_id_, ///< remote source neuron identification
            bool active_, ///< FALSE when the neuron is deleted
            float strength_, ///< Synapse strengt--h in Coulombs/spike
            char synapse_type_, ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
            // short term plasticity 
            int stp_critical_period_, ///< time to return to baseline strength
            int stp_recovery_period_, ///< period for spike counting (in ms)    
            float stp_max_intensity_, ///< initial stp intensity as a fraction of str, can be negative for st-depression         
            // long term plasticity 
            int ltp_critical_period_, ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
            int ltp_recovery_period_, ///< time to return to baseline strenth
            float ltp_max_intensity_, ///< initial ltp intensity as a fraction of str, can be negative for st-depression         
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

