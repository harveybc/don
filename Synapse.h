/* 
 * File:   Synapse.h
 * Author: harveybc
 *
 * Created on 3 de junio de 2015, 04:39 PM
 * COMPLETE
 */

#ifndef SYNAPSE_H
#define	SYNAPSE_H

class Synapse {
public:
    // attributes
    int syn_id; ///< identification number of the synapse
    int source_id; ///< remote source neuron identification
    int target_id; ///< local neuron identification
    bool active; ///< FALSE when the neuron is deleted
    float strength; ///< Synapse strength
    char synapse_type = 0; ///< 0=axodendritic, 1=axoaxonic, 2=axoextracellular, 3=axosecretory
    // short term plasticity 
    bool short_term_plasticity = true; ///< true = short term non-hebbian learning (presynaptic) 
    int stp_critical_period = 20; ///< time to return to baseline strength
    int stp_recovery_period = 200; ///< period for spike counting (in ms)    
    // long term plasticity 
    bool long_term_plasticity = true; ///< true = persistent hebbian learning (presynaptic) 
    int ltp_critical_period = 20; ///<  period for presynaptic to postsynaptic spike phase calculus (in ms)    
    int ltp_recovery_period = 3600000; ///< time to return to baseline strenth
    float persistent_change_factor = 0.001; ///< fraction of ltp that becomes permanent change in strength
    // trveling wave parameters
    float length; ///< synapse length, regulates phase
    float speed; ///< synapse radius, regulates propagation speed
    int segment; ///<  remote axon segment of the synapse 
    //methods
    void calculate_segment();
    int get_id();
    int get_source();
    int get_target();
    float get_length();
    int get_source_axon();
    void set_source_axon(int s_if);
    bool get_active();
    void get_conn(int &connid, int &source, int &target, int &s_if,
            float &len, bool &act);
    void set_conn(int connid, int source, int target, int s_if,
            float w, float len, float spd, bool act);
    void set_length(float len);
    void set_active(bool act);
    int get_weight();
    int get_speed();
    void set_weight(int w);
    void set_speed(int s);
    int get_segment();
    // constructors
    Synapse(int connid, int source, int target, int s_if,
            float len, float w, float s, bool act);
    Synapse(const Synapse& orig);
    virtual ~Synapse();
private:
};

#endif	/* Synapses_H */

