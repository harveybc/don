/* 
 * File:   Neuron.cpp
 * Author: harveybc
 * 
 * Created on 3 de junio de 2015, 04:39 PM
 */

#include <vector>

#include "Neuron.h"

void Neuron::push_message(bool msg){    ///< puts a message in a axon and deletes the oldest one
    // shift right the entire axon
    for (int i=axon.size()-1; i > 0 ; i--){
        //shifts right and insert last segment's LSB as the MSB of the actual segment
        axon[i] = (axon[i]>>1) | (axon[i-1]<<31);
    }
    // introduces the new message in the MSB of the first segment
    if (msg)
        axon[0] = (axon[0]>>1) | 0x80000000;
    else
        axon[0] >>= 1;
}

Neuron::Neuron(
    // general attributes
    int parent_id_,  ///< Parent neuron's identification number
    int recursive_,  ///< Number of times this neuron must be evaluated
    bool active_,    ///< FALSE when the neuron is deleted
    // neural network flags
    bool evaluated_, ///< TRUE if neuron has been evaluated
    char neuron_type_,  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random
    // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
    float Qm_,     ///< membrane charge (def: -70mv*10nF)
    float Cm_,      ///< membrane capacintance (def: 10nF)
    float Gm_,     ///< membrane conductance (def: 100nS)
    float Qth_,   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
    float Qss_,    ///< membrane steady state (resting) charge (def: -70mv*10nF)
    // intrinsic currents for pacemaker neurons (Beer, 1990) 
    float Q_min_, ///< membrane intrinsic current charge threshold (-54mV*10nF)
    float Ih_,        ///< intrinsic depolarizing current
    float Il_,       ///< intrinsic hyperpolarizing current
    float Th_,         ///< time Ih should remain active (def:100ms)
    float Mtl_,              ///< slope of line used to calculate Tl
    float Btl_,              ///< initial time used to calculate Tl
    // action potential timming
    int action_potential_period_,  ///< duration of action potential polarization and depolarization
    int remaining_action_potential_,   ///< remaining time of action potential
    int refractory_period_,        ///< refractory period in milliseconds
    int remaining_refractory_,     ///< rremaining refractory period in milliseconds
    // synaptogenesis and neurogenesis and prunning
    float prob_synaptogenesis_,    ///< increases with neural activity, if negative, is probability of synaptic prunnig
    float prob_neurogenesis_,      ///< increases with local complexity if negative, is probability of neural prunnig
    float prob_inheritable_,    ///< increases with increases with fitness changes related
                               ///< to pruning or neurogenesis. A change of fitness 
                               ///< between neurogenesis events causes all presynaptic  
                               ///< neurons to modify their prob_inheritable)
    // extracellular activity bit masks for up to 8 neurotransmitters(NT), receptors and modulators
    // for synapses: byte   0 = axosomatic/dendritic, 1=axoaxonic, 
    //                      2=axosynaptic, 3=axosecretory/extracellular 
    uint32_t neurotransmitter_mask_,  ///< def: 0x1111 hex (first NT enabled for each synapse type)
    uint32_t nt_receptor_mask_, ///< def: 0x1111 hex (first NT receptor enabled for each synapse type)
    // Extracellular medium Neurotransmitter concentration (g/liter?) for each NT
    std::array<float,8> ecm_neuro_transmitter_,    
    // Membrane's Extracellular medium interface
    // Whole membrane NT receptor charge factor (in: Coulombs/concentration) 
    // Using: Qth / GABA concentration: 1.23e-1 g/Liter  (from: http://www.sciencedirect.com/science/article/pii/S0925492700000755)
    std::array<float,8> ecm_nt_receptor_charge_factor_,
    // Local extracellular dissipation factor per tick (def: 0.99931 for 10 seconds to 0.1%)
    std::array<float,8> ecm_nt_dissipation_,        
    // axon
    float axon_speed_,    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    float axon_feedback_strength_, ///< strength of the feedback connection n Coulombs/spike (def:7.5e-11) 
    bool bidirectional_, //  def: true if axosomatic synapse length < 40um (def:true)
                        //  or axo-dendrític ( bidirectional if length < 300um)
                        //  axo-axonic - postsynapticOR (bidirectional if length < 300um)
    float bidir_max_length_ // length of the bidirectional section of the axon (def:500e-6 m)
) {
    // general attributes
    parent_id = parent_id_;  ///< Parent neuron's identification number
    recursive=recursive_;  ///< Number of times this neuron must be evaluated
    active=active_;    ///< FALSE when the neuron is deleted
    // neural network flags
    evaluated=evaluated_; ///< TRUE if neuron has been evaluated
    neuron_type=neuron_type_;  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random
    // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
    Qm = Qm_;     ///< membrane charge (def: -70mv*10nF)
    Cm  = Cm_;      ///< membrane capacintance (def: 10nF)
    Gm  = Gm_;     ///< membrane conductance (def: 100nS)
    Qleak = Gm_/Cm_; ///< leaking charge factor (Gm/Cm)
    Qth = Qth_;   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
    Qss = Qss_;     ///< membrane steady state (resting) charge (def: -70mv*10nF)
    // intrinsic currents for pacemaker neurons (Beer, 1990) 
    Q_min = Q_min_; ///< membrane intrinsic current charge threshold (-68mV*10nF)
    Ih = Ih_;        ///< intrinsic depolarizing current
    Il = Il_;       ///< intrinsic hyperpolarizing current
    Th = Th_;         ///< time Ih should remain active (def:100ms)
    Mtl = Mtl_;              ///< slope of line used to calculate Tl
    Btl = Btl_;              ///< initial time used to calculate Tl
    // action potential timming
    action_potential_period=action_potential_period_;  ///< duration of action potential polarization and depolarization
    remaining_action_potential=remaining_action_potential_;   ///< remaining time of action potential
    refractory_period=refractory_period_;        ///< refractory period in milliseconds
    remaining_refractory=remaining_refractory_;     ///< rremaining refractory period in milliseconds
    // synaptogenesis and neurogenesis and prunning
    prob_synaptogenesis=prob_synaptogenesis_;    ///< increases with neural activity, if negative, is probability of synaptic prunnig
    prob_neurogenesis=prob_neurogenesis_;      ///< increases with local complexity if negative, is probability of neural prunnig
    prob_inheritable = prob_inheritable_;    ///< increases with increases with fitness changes related
    // extracellular activity (neurotransmitters, receptors and modulators)
    // for synapses: byte   0 = axosomatic/dendritic, 1=axoaxonic, 
    //                      2=axosynaptic, 3=axosecretory/extracellular 
    neurotransmitter_mask = neurotransmitter_mask_; 
    nt_receptor_mask = nt_receptor_mask_;     
    // Extracellular medium Neurotransmitter concentration (g/liter?) for each NT
    ecm_neuro_transmitter = ecm_neuro_transmitter_;
    // Membrane's Extracellular medium interface
    // Whole membrane NT receptor charge factor (in: Coulombs/concentration) 
    // Using: Qth / GABA concentration: 1.23e-1 g/Liter  (from: http://www.sciencedirect.com/science/article/pii/S0925492700000755)
    ecm_nt_receptor_charge_factor = ecm_nt_receptor_charge_factor_;
    // Local extracellular dissipation factor per tick (def: 0.99931 for 10 seconds to 0.1%)
    ecm_nt_dissipation = ecm_nt_dissipation_;
    // axon
    axon_speed = axon_speed_;    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    axon_feedback_strength = axon_feedback_strength_; 
    bidirectional = bidirectional_; //  def: true if axosomatic synapse length < 40um 
                        //  or axo-dendrític ( bidirectional if length < 300um)
                        //  axo-axonic - postsynapticOR (bidirectional if length < 300um)
    bidir_max_length = bidir_max_length_; // length of the bidirectional section of the axon
    // initializes Tl
    Tl = Mtl*(Qm/Cm - Ih/Gm) + Btl;// def: 9500 ticks
}

Neuron::Neuron() {
// initializes neuron parameters with default values
    parent_id = 0;  ///< Parent neuron's identification number
    recursive = false;  ///< Number of times this neuron must be evaluated
    active = true;    ///< FALSE when the neuron is deleted
    // neural network flags
    evaluated = false; ///< TRUE if neuron has been evaluated
    neuron_type = 0;  ///< 0=normal, 1=Tonic, 2=Bistable, 3=Pacemaker, 4=Random
    // membrane attributes for model with intrinsic currents from (Beer, 1990) not for voltage but charge (integrating model over time)
    Qm = -7e-10f;     ///< membrane charge (def: -70mv*10nF)
    Cm = 10e-9f;      ///< membrane capacintance (def: 10nF)
    Gm = 100e-9f;     ///< membrane conductance (def: 100nS)
    Qleak = Gm/Cm; ///< leaking charge factor (Gm/Cm)
    Qth = -5.5e-10f;   ///< membrane charge threshold (def:-55mV*10nF Coulombs))
    Qss = -7e-10f;     ///< membrane steady state (resting) charge (def: -70mv*10nF)
    // intrinsic currents for pacemaker neurons (Beer, 1990) 
    Q_min = -6.8e-10f; ///< membrane intrinsic current charge threshold (-54mV*10nF)
    Ih = 2e-9;        ///< intrinsic depolarizing current
    Il = -2e-9f;       ///< intrinsic hyperpolarizing current
    Th = 100f;         ///< time Ih should remain active (def:100ms)
    Mtl = -1e-5f;      ///< slope of line used to calculate Tl
    Btl = 500f;         ///< initial time used to calculate Tl
    // action potential timming
    action_potential_period = 1;  ///< duration of action potential polarization and depolarization
    remaining_action_potential = 0;   ///< remaining time of action potential in ticks
    refractory_period = 2;        ///< refractory period in milliseconds
    remaining_refractory = 0;     ///< rremaining refractory period in milliseconds
    // epigenetics, synaptogenesis and neurogenesis and prunning
    prob_synaptogenesis = 0.0f;    ///< increases with neural activity, if negative, is probability of synaptic prunnig
    prob_neurogenesis = 0.0f;      ///< increases with local complexity if negative, is probability of neural prunnig
    prob_inheritable = 0.0f;    ///< increases with increases with fitness changes related
    // Extracellular activity for up to 8 neurotransmitters(NT)and receptors(NR)  
    // using bit masks to be used during sunaptogenesis to choose compatible neurons.
    // for synapses: byte   0 = axosomatic/dendritic, 1=axoaxonic, 
    //                      2=axosynaptic, 3=axosecretory/extracellular 
    neurotransmitter_mask = 0x1111;  ///< def: 0x1111 hex (first NT enabled for each synapse type)
    nt_receptor_mask = 0x1111; ///< def: 0x1111 hex (first NT receptor enabled for each synapse type)
    // Local extracellular medium Neurotransmitter concentration (g/liter?) for each NT
    ecm_neuro_transmitter = { 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f };    
    // Membrane's Extracellular medium interface
    // Whole membrane NT receptor charge factor (in: Coulombs/concentration) 
    // Using: Qth / GABA concentration: 1.23e-1 g/Liter  (from: http://www.sciencedirect.com/science/article/pii/S0925492700000755)
    ecm_nt_receptor_charge_factor = { -4.5e-9f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f };
    // Local extracellular dissipation factor per tick (def: 0.99931 for 10 seconds to 0.1%)
    ecm_nt_dissipation = { 0.99931f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f };
    // axon
    float axon_speed = 100.0f;    ///< axon's propagation speed in m/s (def: 100), proportional 
                         ///< to radius wich is proportional to soma diameter wich 
                         ///< controls the optimum number of dendrites (dendritic synapses)
                         ///< for synaptic pruning(maduration), synaptogenesis(practice)
                         ///< and neuroevolution(training).
    float axon_feedback_strength = 7.5e-11f; 
    bool bidirectional = true; //  def: true if axosomatic synapse length < 40um 
                        //  or axo-dendrític ( bidirectional if length < 300um)
                        //  axo-axonic - postsynapticOR (bidirectional if length < 300um)
    float bidir_max_length = 500e-6f; // length of the bidirectional section of the axon
    // initializes Tl
    Tl = Mtl*(Qm/Cm - Ih/Gm) + Btl;// def: 9500 ticks
}

Neuron::Neuron(const Neuron& orig) {
}

Neuron::~Neuron() {
}

